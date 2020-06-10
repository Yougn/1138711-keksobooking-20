'use strict';

var AVA_NUNBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Можно лучше!', 'У нас курят!', 'Моё уважение!'];
var ADDRESSES = ['getRandomInteger(MIN_X, MAX_X), getRandomInteger(MIN_Y, MAX_Y)'];
var PRICES = [1000, 5000, 10000, 15000, 30000];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Прекрасные апартаменты!'];
var PHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var MIN_X = 130;
var MAX_X = 930;
var MIN_Y = 130;
var MAX_Y = 630;
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

var getRandomList = function (group) {
  var j;
  var temp;
  for (var i = group.length - 1; i > 0; i--) {
    j = Math.floor(Math.random() * (i + 1));
    temp = group[j];
    group[j] = group[i];
    group[i] = temp;
  }
  var maxNumber = group.length - 1;
  return group.slice(0, getRandomInteger(1, maxNumber));
};

var getObject = function () {
  return {
    author: {avatar: 'img/avatars/user0' + AVA_NUNBERS.shift() + '.png'},
    offer: {
      title: getRandomElement(TITLES),
      address: getRandomElement(ADDRESSES),
      price: getRandomElement(PRICES),
      type: getRandomElement(TYPES),
      rooms: getRandomInteger(MIN_ROOMS, MAX_ROOMS),
      guests: getRandomInteger(MIN_GUESTS, MAX_GUESTS),
      checkin: getRandomElement(CHECKINS),
      checkout: getRandomElement(CHECKOUTS),
      features: getRandomList(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      fhotos: getRandomList(PHOTOS)
    },
    location: {
      x: getRandomInteger(MIN_X, MAX_X),
      y: getRandomInteger(MIN_Y, MAX_Y)
    }
  };
};

var getObjectsBlock = function (number) {
  var group = [];
  for (var i = 0; i < number; i++) {
    group.push(getObject());
  }
  return group;
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

var advert = getObjectsBlock(NUMBER);

pinList.appendChild(createFragment(advert));
