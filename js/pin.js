'use strict';

(function () {

  var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

  var renderPin = function (advert) {
    var pin = pinTemplate.cloneNode(true);
    pin.style.left = advert.location.x + 'px';
    pin.style.top = advert.location.y + 'px';
    pin.querySelector('img').src = advert.author.avatar;
    pin.querySelector('img').alt = advert.offer.title;

    pin.querySelector('img').dataset.id = advert.id;
    pin.dataset.id = advert.id;

    return pin;
  };

  window.renderAdverts = function (adverts) {
    var fragment = document.createDocumentFragment();
    for (var i = 0; i < adverts.length; i++) {
      if (adverts[i].offer) {
        fragment.appendChild(renderPin(adverts[i]));
      }
    }
    return fragment;
  };

})();
