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
    }

    mainMap.appendChild(window.renderCard(window.adverts[id]));
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

  window.openPage = function () {
    mainMap.classList.remove('map--faded');
    mainForm.classList.remove('ad-form--disabled');
    changeStatus(filterFeatures, filterMap);
    changeStatus(formMain, formElements);
  };

  var buttonReset = document.querySelector('.ad-form__reset');
  buttonReset.addEventListener('click', function () {
    mainForm.reset();
  });

  var closeCard = function () {
    var mainCard = document.querySelectorAll('.map__card');
    for (var i = 0; i < mainCard.length; i++) {
      mainCard[i].remove();
    }
  };

  var closePins = function () {
    var currentPins = pinList.querySelectorAll('[data-id]');
    for (var j = 0; j < currentPins.length; j++) {
      currentPins[j].remove();
    }
  };

  var closePage = function () {
    closeCard();
    closePins();
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = window.main.START_X + 'px';
    mainPin.style.top = window.main.START_Y + 'px';
    mainMap.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    changeStatus(filterFeatures, filterMap);
    changeStatus(formMain, formElements);
    window.main.isOneTimeActivated = false;
    window.main.isMapActivated = false;
    document.querySelector('#price').placeholder = window.main.COST_FIVE_THOUSAND;
    mainForm.reset();
    document.removeEventListener('keydown', window.keyDownHendler);
  };

  var searchTemplate = function (nameOne, nameTwo) {
    var messageTemplate = document.querySelector(nameOne).content.querySelector(nameTwo);
    var element = messageTemplate.cloneNode(true);
    mainMap.appendChild(element);
  };

  var closeBannerPressButton = function (evt) {
    if (evt.key === 'Escape') {
      closeBanner();
    }
  };

  var bannerCloseHendler = function () {
    document.removeEventListener('keydown', closeBannerPressButton);
    mainMap.removeEventListener('click', closeBanner);
  };

  var closeBanner = function () {
    var message = document.querySelector('.success');
    message.remove();
    bannerCloseHendler();
  };

  var showMessage = function () {
    searchTemplate('#success', '.success');

    mainMap.addEventListener('click', closeBanner);
    document.addEventListener('keydown', closeBannerPressButton);
  };

  var closeBannerErrorPressButton = function (evt) {
    if (evt.key === 'Escape') {
      closeBannerError();
    }
  };

  var bannerErrorCloseHendler = function () {
    mainMap.removeEventListener('click', closeBannerError);
    document.removeEventListener('keydown', closeBannerErrorPressButton);
  };

  var closeBannerError = function () {
    var message = document.querySelector('.error');
    message.remove();
    bannerErrorCloseHendler();
  };

  var showErrorMessage = function () {
    searchTemplate('#error', '.error');

    mainMap.addEventListener('click', closeBannerError);
    document.addEventListener('keydown', closeBannerErrorPressButton);

    var errorButton = document.querySelector('.error');
    errorButton.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        errorButton.classList.add('hidden');
      }
    });
  };

  mainForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(mainForm), function () {
      closePage();
      showMessage();
    }, showErrorMessage);
    evt.preventDefault();
  });

})();
