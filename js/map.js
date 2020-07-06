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

  var closePage = function () {
    var closeCard = document.querySelector('.map__card');
    closeCard.classList.add('hidden');
    var closePin = pinList.querySelectorAll('[data-id]');
    for (var i = 0; i < closePin.length; i++) {
      closePin[i].remove();
    }
    var mainPin = document.querySelector('.map__pin--main');
    mainPin.style.left = 570 + 'px';
    mainPin.style.top = 375 + 'px';
    mainMap.classList.add('map--faded');
    mainForm.classList.add('ad-form--disabled');
    changeStatus(filterFeatures, filterMap);
    changeStatus(formMain, formElements);
    mainForm.reset();
  };

  var closeBannerPressButton = function (evt) {
    if (evt.key === 'Escape') {
      closeBanner();
    }
  };

  var closeBanner = function () {
    var message = document.querySelector('.success');
    message.remove();
    mainMap.removeEventListener('click', closeBanner);
    document.removeEventListener('keydown', closeBannerPressButton);
  };

  var showMessage = function () {
    var messageTemplate = document.querySelector('#success').content.querySelector('.success');
    var element = messageTemplate.cloneNode(true);
    mainMap.appendChild(element);

    mainMap.addEventListener('click', closeBanner);
    document.addEventListener('keydown', closeBannerPressButton);
  };

  var closeBannerPressButtonOne = function (evt) {
    if (evt.key === 'Escape') {
      closeBannerOne();
    }
  };

  var closeBannerOne = function () {
    var message = document.querySelector('.error');
    message.remove();
    mainMap.removeEventListener('click', closeBannerOne);
    document.removeEventListener('keydown', closeBannerPressButtonOne);
  };

  var showErrorMessage = function () {
    var messageTemplate = document.querySelector('#error').content.querySelector('.error');
    var element = messageTemplate.cloneNode(true);
    mainMap.appendChild(element);

    mainMap.addEventListener('click', closeBannerOne);
    document.addEventListener('keydown', closeBannerPressButtonOne);
  };

  mainForm.addEventListener('submit', function (evt) {
    window.backend.save(new FormData(mainForm), function () {
      closePage();
      showMessage();
    }, showErrorMessage);
    evt.preventDefault();
  });

})();
