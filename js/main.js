'use strict';

var TITLES = ['Можно лучше!', 'У нас курят!', 'Моё уважение!'];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Прекрасные апартаменты!'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 50;
var MAX_X = 1150;
var MIN_Y = 130;
var MAX_Y = 630;
var MIN_PRICE = 1000;
var MAX_PRICE = 1000000;
var MIN_ROOMS = 1;
var MAX_ROOMS = 6;
var MIN_GUESTS = 1;
var MAX_GUESTS = 6;
var NUMBER = 8;

var getRandomElement = function (elements) {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};

var getRandomInteger = function (min, max) {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandomLists = function (items) {
  var j;
  var temp;
  for (var i = items.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
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
  var prices = getRandomInteger(MIN_PRICE, MAX_PRICE);
  return {
    author: {avatar: 'img/avatars/user0' + number + '.png'},
    offer: {
      title: getRandomElement(TITLES),
      address: x + ',' + y,
      prices: prices,
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomLists(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomLists(PHOTOS)
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

var createFragment = function (advert) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < advert.length; i++) {
    fragment.appendChild(renderPin(advert[i]));
  }
  return fragment;
};

var advert = getObjectsBlocks(NUMBER);

pinList.appendChild(createFragment(advert));
