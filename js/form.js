'use strict';

(function () {

  var mainPin = document.querySelector('.map__pin--main');
  var pinList = document.querySelector('.map__pins');
  var adverts = window.getObjectsBlocks(window.main.NUMBER);

  var getPinPosition = function () {
    var x = mainPin.offsetLeft + window.main.PIN_WIDTH / 2;
    var y = mainPin.offsetTop + window.main.PIN_HEIGHT + window.main.PIN_LEG;
    return x + ', ' + y;
  };

  var address = document.querySelector('input[name="address"]');

  var getValidAddress = function () {
    address.value = getPinPosition();
  };

  var getAllResult = function () {
    getValidAddress();
    window.openPage();
    getValidMessage();
    getValidPrise();
    setValidTimeIn();
    setValidTimeOut();
    pinList.appendChild(window.renderAdverts(adverts));
  };

  mainPin.addEventListener('mousedown', function (evt) {
    if (evt.which === 1) {
      getAllResult();
    }
  });

  mainPin.addEventListener('keydown', function (evt) {
    if (evt.key === 'Enter') {
      getAllResult();
    }
  });

  // mainPin.addEventListener('mousemove', function (evt) {
  //   if (evt.which === 1) {
  //     address.value = getPinPosition();
  //   }
  // });

  var roomsNumber = document.querySelector('#room_number');
  var guestsNumber = document.querySelector('#capacity');

  var getValidMessage = function () {
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
    getValidMessage();
  });

  guestsNumber.addEventListener('change', function () {
    getValidMessage();
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

  var getValidPrise = function () {
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
    getValidPrise();
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
