'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var pinList = document.querySelector('.map__pins');
  // var adverts = window.getObjectsBlocks(window.main.NUMBER);

  var getPinPosition = function () {
    var x = mainPin.offsetLeft + window.main.PIN_WIDTH / 2;
    var y = mainPin.offsetTop + window.main.PIN_HEIGHT + window.main.PIN_LEG;
    return x + ', ' + y;
  };

  var address = document.querySelector('input[name="address"]');
  var setValidAddress = function () {
    address.value = getPinPosition();
  };

  var getAllResult = function () {
    if (!window.main.isOneTimeActivated) {
      window.main.isOneTimeActivated = true;
      window.map.openPage();
    }
    setValidMessage();
    setValidPrise();
    setValidTimeIn();
    setValidTimeOut();

    var selectTypeOfHouse = document.querySelector('#housing-type');

    var checkTypeOfHouse = function (advert) {
      var typeOfHouse = selectTypeOfHouse.value;
      return typeOfHouse === window.main.ANY_HOUSE || typeOfHouse === advert.offer.type;
    };

    var selectNumberOfRooms = document.querySelector('#housing-rooms');

    var checkNumberOfRooms = function (advert) {
      var numberOfRooms = selectNumberOfRooms.value;
      return numberOfRooms === window.main.ANY_HOUSE || parseInt(numberOfRooms, 10) === advert.offer.rooms;
    };

    var selectNumberOfGuests = document.querySelector('#housing-guests');

    var checkNumberOfGuests = function (advert) {
      var numberOfGuests = selectNumberOfGuests.value;
      return numberOfGuests === window.main.ANY_HOUSE || parseInt(numberOfGuests, 10) === advert.offer.rooms;
    };

    var selectPrice = document.querySelector('#housing-price');

    var checkPrice = function (advert) {
      var priceOfHouse = selectPrice.value;

      if (priceOfHouse === window.main.PRIСE_LOW) {
        return advert.offer.price < window.main.PRIСE_TEN_THOUSAND;
      }

      if (priceOfHouse === window.main.PRIСE_MIDDLE) {
        return advert.offer.price >= window.main.PRIСE_TEN_THOUSAND && advert.offer.price <= window.main.PRIСE_FIFTY_THOUSAND;
      }
      if (priceOfHouse === window.main.PRIСE_HIGH) {
        return advert.offer.price > window.main.PRIСE_FIFTY_THOUSAND;
      }
      return true;
    };

    var checkFeatures = function (advert) {
      var chosenFeatures = mainFilter.querySelectorAll('input:checked');
      for (var x = 0; x < chosenFeatures.length; x++) {
        if (!advert.offer.features.includes(chosenFeatures[x].value)) {
          return false;
        }
      }
      return true;
    };

    var filterOffers = function (adverts) {
      var filterAdverts = [];
      for (var i = 0; i < adverts.length; i++) {
        var advert = adverts[i];
        if (checkTypeOfHouse(advert)
          && checkNumberOfRooms(advert)
          && checkNumberOfGuests(advert)
          && checkPrice(advert)
          && checkFeatures(advert)) {
          advert.id = i;
          filterAdverts.push(advert);
        }
        if (filterAdverts.length >= window.main.MAX_PIN_NUMBER) {
          break;
        }
      }
      return filterAdverts;
    };

    var drawAdverts = window.debounce(function (adverts) {
      var filterBlocks = filterOffers(adverts);
      pinList.appendChild(window.renderAdverts(filterBlocks));
    });

    var mainFilter = document.querySelector('.map__filters');

    mainFilter.addEventListener('change', function () {
      var card = document.querySelector('.map__card.popup');
      if (card) {
        window.card.closeCard();
      }
      window.map.removePins();
      drawAdverts(window.adverts);
    });

    var filterFeatures = document.querySelector('.map__features');
    var filterMap = document.querySelectorAll('.map__filter');

    window.backend.load(function (adverts) {
      drawAdverts(adverts);
      window.adverts = adverts;
      window.changeStatus(filterFeatures, filterMap);
    }, window.map.showErrorMessage);

  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      evt.preventDefault();
      if (!window.main.isMapActivated) {
        window.main.isMapActivated = true;
        getAllResult();
      }
      var startCoords = {
        x: evt.clientX,
        y: evt.clientY
      };

      var onMouseMove = function (moveEvt) {
        moveEvt.preventDefault();
        var shift = {
          x: startCoords.x - moveEvt.clientX,
          y: startCoords.y - moveEvt.clientY
        };

        startCoords = {
          x: moveEvt.clientX,
          y: moveEvt.clientY
        };

        if (mainPin.offsetTop - shift.y > window.main.MAX_Y - window.main.PIN_HEIGHT - window.main.PIN_LEG) {
          mainPin.style.top = window.main.MAX_Y - window.main.PIN_HEIGHT - window.main.PIN_LEG + 'px';
        } else if (mainPin.offsetTop - shift.y < window.main.MIN_Y - window.main.PIN_HEIGHT - window.main.PIN_LEG) {
          mainPin.style.top = window.main.MIN_Y - window.main.PIN_HEIGHT - window.main.PIN_LEG + 'px';
        } else {
          mainPin.style.top = (mainPin.offsetTop - shift.y) + 'px';
        }

        if (mainPin.offsetLeft - shift.x > window.main.MAX_X - window.main.PIN_WIDTH / 2) {
          mainPin.style.left = window.main.MAX_X - window.main.PIN_WIDTH / 2 + 'px';
        } else if (mainPin.offsetLeft - shift.x < window.main.MIN_X - window.main.PIN_WIDTH / 2) {
          mainPin.style.left = window.main.MIN_X - window.main.PIN_WIDTH / 2 + 'px';
        } else {
          mainPin.style.left = (mainPin.offsetLeft - shift.x) + 'px';
        }
      };

      var onMouseUp = function (upEvt) {
        upEvt.preventDefault();
        setValidAddress();
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      };

      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
    }
  });

  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');

  var setValidMessage = function () {
    var rooms = roomsNumber.value;
    var guests = guestsNumber.value;
    var validationMessage = '';

    if (rooms < guests) {
      validationMessage = 'Ошибка!Количество гостей не должно превышать количество комнат!';
    }

    if (rooms === '100' && guests !== '0') {
      validationMessage = 'Ошибка! Данные категории недоступны!';
    }

    if (guests === '0' && rooms !== '100') {
      validationMessage = 'Ошибка! Данные категории недоступны!';
    }

    roomsNumber.setCustomValidity(validationMessage);
  };

  roomsNumber.addEventListener('change', function () {
    setValidMessage();
  });

  guestsNumber.addEventListener('change', function () {
    setValidMessage();
  });

  var titleAdvert = document.querySelector('#title');

  titleAdvert.addEventListener('invalid', function () {
    if (titleAdvert.validity.valueMissing) {
      titleAdvert.setCustomValidity('Обязательное поле!');
    }
  });

  titleAdvert.addEventListener('input', function () {
    var valueLength = titleAdvert.value.length;

    if (valueLength < window.main.MIN_TITLE_LENGTH) {
      titleAdvert.setCustomValidity('Ещё ' + (window.main.MIN_TITLE_LENGTH - valueLength) + ' симв.');
    } else if (valueLength > window.main.MAX_TITLE_LENGTH) {
      titleAdvert.setCustomValidity('Удалите лишние ' + (valueLength - window.main.MAX_TITLE_LENGTH) + ' симв.');
    } else {
      titleAdvert.setCustomValidity('');
    }
  });

  var typeApartment = document.querySelector('#type');
  var priceApartment = document.querySelector('#price');

  var setValidPrise = function () {
    var type = typeApartment.value;

    var getCost = function (cost) {
      priceApartment.placeholder = cost;
      priceApartment.setAttribute('min', cost);
    };

    if (type === 'bungalo') {
      getCost(window.main.COST_ZERO);
    } else if (type === 'flat') {
      getCost(window.main.COST_THOUSAND);
    } else if (type === 'house') {
      getCost(window.main.COST_FIVE_THOUSAND);
    } else if (type === 'palace') {
      getCost(window.main.COST_TEN_THOUSAND);
    }
  };

  typeApartment.addEventListener('change', function () {
    setValidPrise();
  });

  var timeInList = document.querySelector('#timein');
  var timeOutList = document.querySelector('#timeout');

  var setValidTimeIn = function () {
    timeOutList.value = timeInList.value;
  };

  var setValidTimeOut = function () {
    timeInList.value = timeOutList.value;
  };

  timeInList.addEventListener('change', function () {
    setValidTimeIn();
  });

  timeOutList.addEventListener('change', function () {
    setValidTimeOut();
  });

})();

