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

  var changeStatus = function (filters, forms) {
    filters.toggleAttribute('disabled');
    for (var i = 0; i < forms.length; i++) {
      forms[i].toggleAttribute('disabled');
    }
  };

  changeStatus(filterFeatures, filterMap);
  changeStatus(formMain, formElements);

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function () {
    mainForm.reset();
    closePage();
  });

  var closeCard = function () {
    var mainCard = document.querySelector('.map__card.popup');
    if (mainCard) {
      mainCard.remove();
    }
  };

  var removePins = function () {
    var buttons = pinList.querySelectorAll('button');
    var currentPins = buttons.querySelectorAll('[data-id]');
    for (var j = 0; j < currentPins.length; j++) {
      currentPins[j].remove();
    }
  };

  var mainPin = document.querySelector('.map__pin--main');
  var price = document.querySelector('#price');

  var closePage = function () {
    closeCard();
    removePins();
    mainPin.style.left = window.main.START_X + 'px';
    mainPin.style.top = window.main.START_Y + 'px';
    mainMap.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    changeStatus(filterFeatures, filterMap);
    changeStatus(formMain, formElements);
    window.main.isOneTimeActivated = false;
    window.main.isMapActivated = false;
    price.setAttribute('min', window.main.COST_ZERO);
    price.placeholder = window.main.COST_FIVE_THOUSAND;
    mainForm.reset();
    document.removeEventListener('keydown', window.card.keyDownHendler);
  };

  var createTemplate = function (nameId, nameClass) {
    var messageTemplate = document.querySelector(nameId).content.querySelector(nameClass);
    var element = messageTemplate.cloneNode(true);
    mainMap.appendChild(element);
  };

  var closeBanner = function () {
    var message = document.querySelector('.success');
    message.remove();

    document.removeEventListener('click', bannerClickHendler);
    document.removeEventListener('keydown', bannerKeyDownHendler);
  };

  var bannerClickHendler = function () {
    closeBanner();
  };

  var bannerKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      closeBanner();
    }
  };

  var showMessage = function () {
    createTemplate('#success', '.success');

    document.addEventListener('click', bannerClickHendler);
    document.addEventListener('keydown', bannerKeyDownHendler);
  };

  var closeBannerError = function () {
    var message = document.querySelector('.error');
    message.remove();

    document.removeEventListener('click', bannerErrorClickHendler);
    document.removeEventListener('keydown', bannerErrorKeyDownHendler);
  };

  var bannerErrorClickHendler = function () {
    closeBannerError();
  };

  var bannerErrorKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      closeBannerError();
    }
  };

  var bannerErrorPushButtonHendler = function (evt) {
    var errorButton = document.querySelector('.error__button');
    if (evt.key === 'Enter') {
      closeBannerError();
      errorButton.removeEventListener('keydown', bannerErrorPushButtonHendler);
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

    openPage: function () {
      mainMap.classList.remove('map--faded');
      mainForm.classList.remove('ad-form--disabled');
      changeStatus(filterFeatures, filterMap);
      changeStatus(formMain, formElements);
    },

    showErrorMessage: function () {
      createTemplate('#error', '.error');

      document.addEventListener('click', bannerErrorClickHendler);
      document.addEventListener('keydown', bannerErrorKeyDownHendler);

      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('keydown', bannerErrorPushButtonHendler);
    }
  };

})();
