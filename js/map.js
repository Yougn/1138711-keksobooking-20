'use strict';

(function () {

  var pinList = document.querySelector('.map__pins');
  var mainMap = document.querySelector('.map');
  // var adverts = window.getObjectsBlocks(window.main.NUMBER);

  pinList.addEventListener('click', function (evt) {

    var id = evt.target.dataset.id;

    if (!id) {
      return;
    }

    var oldCard = document.querySelector('.map__card.popup');
    if (oldCard) {
      oldCard.remove();
      window.card.deleteMark();
    }

    if (evt.target.tagName === 'BUTTON') {
      evt.target.classList.add('map__pin--active');
    } else if (evt.target.tagName === 'IMG') {
      evt.target.parentElement.classList.add('map__pin--active');
    }

    mainMap.appendChild(window.card.render(window.adverts[id]));
  });

  var mainForm = document.querySelector('.ad-form');
  mainForm.classList.add('ad-form--disabled');

  var filterFeatures = document.querySelector('.map__features');
  var filterMap = document.querySelectorAll('.map__filter');
  var formMain = document.querySelector('.ad-form-header');
  var formElements = document.querySelectorAll('.ad-form__element');

  window.changeStatus = function (filters, forms) {
    filters.toggleAttribute('disabled');
    for (var i = 0; i < forms.length; i++) {
      forms[i].toggleAttribute('disabled');
    }
  };

  window.changeStatus(filterFeatures, filterMap);
  window.changeStatus(formMain, formElements);

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function () {
    resetData();
    window.avatar.resetPhotoInputs();
    closePage();
  });

  var mainFilter = document.querySelector('.map__filters');

  var resetData = function () {
    mainForm.reset();
    mainFilter.reset();
    window.avatar.resetPhotoInputs();
  };

  var closeCurrentCard = function () {
    var mainCard = document.querySelector('.map__card.popup');
    if (mainCard) {
      mainCard.remove();
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var price = document.querySelector('#price');

  var closePage = function () {
    closeCurrentCard();
    window.map.removePins();
    mainPin.style.left = window.main.START_X + 'px';
    mainPin.style.top = window.main.START_Y + 'px';
    mainMap.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    window.changeStatus(filterFeatures, filterMap);
    window.changeStatus(formMain, formElements);
    window.main.isOneTimeActivated = false;
    window.main.isMapActivated = false;
    price.setAttribute('min', window.main.COST_ZERO);
    price.placeholder = window.main.COST_FIVE_THOUSAND;
    resetData();
    document.removeEventListener('keydown', window.card.keyDownHandler);
  };

  var createTemplate = function (nameId, nameClass) {
    var messageTemplate = document.querySelector(nameId).content.querySelector(nameClass);
    var element = messageTemplate.cloneNode(true);
    mainMap.appendChild(element);
  };

  var closeBanner = function () {
    var message = document.querySelector('.success');
    message.remove();

    document.removeEventListener('click', bannerClickHandler);
    document.removeEventListener('keydown', bannerKeyDownHandler);
  };

  var bannerClickHandler = function () {
    closeBanner();
  };

  var bannerKeyDownHandler = function (evt) {
    if (evt.key === window.main.ESCAPE_BTN) {
      closeBanner();
    }
  };

  var showMessage = function () {
    createTemplate('#success', '.success');

    document.addEventListener('click', bannerClickHandler);
    document.addEventListener('keydown', bannerKeyDownHandler);
  };

  var closeBannerError = function () {
    var message = document.querySelector('.error');
    message.remove();

    document.removeEventListener('click', bannerErrorClickHandler);
    document.removeEventListener('keydown', bannerErrorKeyDownHandler);
  };

  var bannerErrorClickHandler = function () {
    closeBannerError();
  };

  var bannerErrorKeyDownHandler = function (evt) {
    if (evt.key === window.main.ESCAPE_BTN) {
      closeBannerError();
    }
  };

  var bannerErrorPushButtonHandler = function (evt) {
    // var errorButton = document.querySelector('.error__button');
    if (evt.key === window.main.ENTER_BTN) {
      closeBannerError();
      // errorButton.removeEventListener('keydown', bannerErrorPushButtonHandler);
    }
  };

  mainForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(mainForm), function () {
      closePage();
      showMessage();
    }, window.map.showErrorMessage);
    evt.preventDefault();
  });

  window.map = {

    removePins: function () {
      var currentPins = pinList.querySelectorAll('.map__pin');
      for (var j = 1; j < currentPins.length; j++) {
        currentPins[j].remove();
      }
    },

    openPage: function () {
      mainMap.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      window.changeStatus(formMain, formElements);
    },

    showErrorMessage: function () {
      createTemplate('#error', '.error');

      document.addEventListener('click', bannerErrorClickHandler);
      document.addEventListener('keydown', bannerErrorKeyDownHandler);

      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('keydown', bannerErrorPushButtonHandler);
    }
  };

})();
