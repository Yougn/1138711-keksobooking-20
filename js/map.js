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

})();
