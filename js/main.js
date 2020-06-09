'use strict';

var AVATAR_NUMBERS = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLES = ['Можно лучше!', 'У нас курят!'];
var ADDRESSES = ['location.x, location.y'];
var PRICES = [MIN_PRISE, MAX_PRISE];
var TYPES = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3, 4, 5];
var CHECKINS = ['12:00', '13:00', '14:00'];
var CHECKOUTS = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTIONS = ['Прекрасные апартаменты!'];
var FHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X = [];
var Y = [];
var MIN_PRISE = 1000;
var MAX_PRISE = 30000;
var min = 130;
var max = 630;

var getRandomNumber = function (numbers) {
  var index = Math.floor(Math.random() * numbers.length);
  return number[index];
};

var randomInteger = function () {
  var rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
};

var getRandom = function (array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
  }
  var maxNumber = array.length - 1;
  var list = array.slice(0, randomInteger(1, maxNumber));
  return list;
};

var getObject = function () {
  return {
    author: {avatar: 'img/avatars/user0' + AVATAR_NUMBERS.shift() + '.png'},
    offer: {
      title: getRandomNumber(TITLES),
      address: getRandomNumber(ADDRESSES),
      price: randomInteger(PRICES),
      type: getRandomNumber(TYPES),
      rooms: randomInteger(ROOMS),
      guests: randomInteger(GUESTS),
      checkin: getRandomNumber(CHECKINS),
      checkout: getRandomNumber(CHECKOUTS),
      features: getRandom(FEATURES),
      description: getRandomNumber(DESCRIPTIONS),
      fhotos: getRandom(FHOTOS)
    },
    location: {
      x: randomInteger(X),
      y: randomInteger(Y)
    }
  };
};

var getObjectsList = function (number) {
  var lists = [];
  for (var i = 0; i < number; i++) {
    lists.push(getObject());
  }
  return lists;
};
var number = 8;

var userMap = document.querySelector('.map');
userMap.classList.remove('map--faded');

var pinList = document.querySelector('.map__pins');
var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (adverts) {
  var pin = pinTemplate.cloneNode(true);

  pin.style.left = adverts.location.x + 'px';
  pin.style.top = adverts.location.y + 'px';
  pin.querySelector('img').src = adverts.author.avatar;
  pin.querySelector('img').alt = adverts.offer.title;

  return pin;
};

var createFragment = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  return fragment;
};

var adverts = getObjectsList(number);

pinList.appendChild(createFragment(adverts));
