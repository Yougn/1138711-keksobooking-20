'use strict';

(function () {

  var apartmentName = {
    flat: 'квартира',
    bungalo: 'бунгало',
    house: 'дом',
    palace: 'дворец'
  };

  var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');
  var pinList = document.querySelector('.map__pins');

  window.card = {

    render: function (advert) {
      var card = cardTemplate.cloneNode(true);

      card.querySelector('.popup__title').textContent = advert.offer.title;
      card.querySelector('.popup__text--address').textContent = advert.offer.address;
      card.querySelector('.popup__text--price').textContent = advert.offer.price + ' ₽/ночь';
      card.querySelector('.popup__type').textContent = apartmentName[advert.offer.type];
      card.querySelector('.popup__text--capacity').textContent = advert.offer.rooms + ' комнаты для ' + advert.offer.guests + ' гостей';
      card.querySelector('.popup__text--time').textContent = 'Заезд после ' + advert.offer.checkin + ',' + ' выезд до ' + advert.offer.checkout;

      var cardFeatures = card.querySelector('.popup__features');

      if (advert.offer.features.length > 0) {
        for (var i = 0; i < advert.offer.features.length; i++) {
          var newElement = document.createElement('li');
          newElement.classList.add('popup__feature', 'popup__feature--' + advert.offer.features[i]);
          cardFeatures.appendChild(newElement);
        }
      } else {
        cardFeatures.classList.add('hidden');
      }

      card.querySelector('.popup__description').textContent = advert.offer.description;

      var cardPhotos = card.querySelector('.popup__photos');

      if (advert.offer.photos.length > 0) {
        for (var j = 0; j < advert.offer.photos.length; j++) {
          var newImg = document.createElement('img');
          newImg.src = advert.offer.photos[j];
          newImg.style.width = window.main.CARD_IMAGE_WIDTH;
          newImg.style.height = window.main.CARD_IMAGE_HEIGHT;
          newImg.alt = 'Фотография жилья';
          cardPhotos.appendChild(newImg);
        }
      } else {
        cardPhotos.classList.add('hidden');
      }

      card.querySelector('img').src = advert.author.avatar;

      card.querySelector('.popup__close').addEventListener('click', function () {
        window.card. closeCard();
      });

      document.addEventListener('keydown', window.card.keyDownHendler);

      return card;
    },

    closeCard: function () {
      document.querySelector('.map__card.popup').remove();
      window.card.deleteHendler();
      window.card.deleteMark();
    },

    deleteHendler: function () {
      document.removeEventListener('keydown', window.card.keyDownHendler);
    },

    deleteMark: function () {
      var buttonMark = pinList.querySelector('.map__pin--active');
      buttonMark.classList.remove('map__pin--active');
    },

    keyDownHendler: function (evt) {
      if (evt.key === 'Escape') {
        window.card.closeCard();
      }
    }
  };

})();
