'use strict';

var TITLES = ['Можно лучше!', 'У нас курят!', 'Моё уважение!'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Прекрасные апартаменты!'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 0;
var MAX_X = 1200;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 2;
var MAX_ROOMS = 4;
var MIN_GUESTS = 2;
var MAX_GUESTS = 4;
var NUMBER = 8;

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (elements) {
  var index = getRandomInteger(0, elements.length);
  return elements[index];
};

var getRandomList = function (items) {
  var j;
  var temp;
  for (var i = items.length - 1; i > 0; i--) {
    j = getRandomInteger(0, items.length - 1);
    temp = items[j];
    items[j] = items[i];
    items[i] = temp;
  }
  var maxNumber = items.length - 1;
  return items.slice(0, getRandomInteger(1, maxNumber));
};

var getObject = function (number) {
  var x = getRandomInteger(MIN_X, MAX_X);
  var y = getRandomInteger(MIN_Y, MAX_Y);
  var price = getRandomInteger(MIN_PRICE, MAX_PRICE);
  return {
    author: {avatar: 'img/avatars/user0' + number + '.png'},
    offer: {
      title: getRandomElement(TITLES),
      address: x + ',' + y,
      price: price,
      type: getApartment(getRandomElement(TYPES)),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomList(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomList(PHOTOS)
    },
    location: {
      x: x,
      y: y
    }
  };
};

var getObjectsBlocks = function (number) {
  var blocks = [];
  for (var i = 0; i < number; i++) {
    blocks.push(getObject(i + 1));
  }
  return blocks;
};

var getObjectsOfApartment = {
  flat: 'квартира',
  bungalo: 'бунгало',
  house: 'дом',
  palace: 'дворец'
};

var getApartment = function () {
  return getObjectsOfApartment[getRandomElement(TYPES)];
};

var userMap = document.querySelector('.map');
userMap.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (advert) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = advert.location.x + 'px';
  pin.style.top = advert.location.y + 'px';
  pin.querySelector('img').src = advert.author.avatar;
  pin.querySelector('img').alt = advert.offer.title;

  return pin;
};

var renderAdverts = function (advert) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(advert[i]));
  }
  return fragment;
};

var adverts = getObjectsBlocks(NUMBER);

pinList.appendChild(renderAdverts(adverts));

var mainMap = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var card = cardTemplate.cloneNode(true);

card.querySelector('.popup__title').textContent = adverts[0].offer.title;
card.querySelector('.popup__text--address').textContent = adverts[0].offer.address;
card.querySelector('.popup__text--price').textContent = adverts[0].offer.price + ' ₽/ночь';
card.querySelector('.popup__type').textContent = adverts[0].offer.type;
card.querySelector('.popup__text--capacity').textContent = adverts[0].offer.rooms + ' комнаты для ' + adverts[0].offer.guests + ' гостей';
card.querySelector('.popup__text--time').textContent = 'Заезд после ' + adverts[0].offer.checkin + ',' + ' выезд до ' + adverts[0].offer.checkout;
card.querySelector('.popup__features').textContent = adverts[0].offer.features;
card.querySelector('.popup__description').textContent = adverts[0].offer.description;
card.querySelector('.popup__photos img').src = adverts[0].offer.photos;
card.querySelector('img').src = adverts[0].author.avatar;

mainMap.appendChild(card);

