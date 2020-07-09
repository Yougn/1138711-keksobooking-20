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

    mainMap.appendChild(window.card.renderCard(window.adverts[id]));
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
    document.querySelector('#price').setAttribute('min', window.main.COST_ZERO);
    document.querySelector('#price').placeholder = window.main.COST_FIVE_THOUSAND;
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
  };

  var bannerKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      bannerDeleteHendler();
    }
  };

  var bannerDeleteHendler = function () {
    closeBanner();
    document.removeEventListener('keydown', bannerKeyDownHendler);
  };

  var showMessage = function () {
    createTemplate('#success', '.success');

    var successPopup = document.querySelector('.success');
    successPopup.addEventListener('click', closeBanner);
    document.addEventListener('keydown', bannerKeyDownHendler);
  };

  var closeBannerError = function () {
    var message = document.querySelector('.error');
    message.remove();
  };

  var bannerErrorKeyDownHendler = function (evt) {
    if (evt.key === 'Escape') {
      bannerErorDeleteHendler();
    }
  };

  var bannerErorDeleteHendler = function () {
    closeBannerError();
    document.removeEventListener('keydown', bannerErrorKeyDownHendler);
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

      var errorPopup = document.querySelector('.error');
      errorPopup.addEventListener('click', closeBannerError);
      document.addEventListener('keydown', bannerErrorKeyDownHendler);

      var errorButton = document.querySelector('.error__button');
      errorButton.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          errorPopup.remove();
        }
      });
    }
  };

})();
