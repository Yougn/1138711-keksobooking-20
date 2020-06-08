'use strict';

var AVATAR_NUMBER = [1, 2, 3, 4, 5, 6, 7, 8];
var TITLE = ['Можно лучше!', 'У нас курят!'];
var ADDRESS = ['600, 350'];
var PRICE = [1000, 3000, 5000];
var TYPE = ['palace', 'flat', 'house', 'bungalo'];
var ROOMS = [1, 2, 3];
var GUESTS = [1, 2, 3, 4, 5];
var CHECKIN = ['12:00', '13:00', '14:00'];
var CHECKOUT = ['12:00', '13:00', '14:00'];
var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
var DESCRIPTION = ['Прекрасные апартаменты!'];
var FHOTOS = ['http://o0.github.io/assets/images/tokyo/hotel1.jpg', 'http://o0.github.io/assets/images/tokyo/hotel2.jpg', 'http://o0.github.io/assets/images/tokyo/hotel3.jpg'];
var X = [min, max];
var Y = [min, max];
var min = 130;
var max = 630;
var number = 8;

var getElementAndDelete = function (arr) {
  var element = arr[0];
  arr.shift();
  return element;
};

var getRandomIndex = function (elements) {
  var index = Math.floor(Math.random() * elements.length);
  return elements[index];
};

var getRandomElement = function () {
  var rand = min + Math.random() * (max - min);
  return Math.floor(rand);
};

var getObject = function () {
  return {
    'author': {avatar: 'img/avatars/user0' + getElementAndDelete(AVATAR_NUMBER) + '.png'},
    'offer': {
      title: getRandomIndex(TITLE),
      address: getRandomIndex(ADDRESS),
      price: getRandomIndex(PRICE),
      type: getRandomIndex(TYPE),
      rooms: getRandomIndex(ROOMS),
      guests: getRandomIndex(GUESTS),
      checkin: getRandomIndex(CHECKIN),
      checkout: getRandomIndex(CHECKOUT),
      features: getRandomIndex(FEATURES),
      description: getRandomIndex(DESCRIPTION),
      fhotos: getRandomIndex(FHOTOS)
    },
    'location': {
      x: getRandomElement(X),
      y: getRandomElement(Y)
    }
  };
};

var getObjectsList = function () {
  var list = [];
  for (var i = 0; i < number; i++) {
    list.push(getObject());
  }
  return list;
};

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

var adverts = getObjectsList(number);

var createFragment = function () {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    fragment.appendChild(renderPin(adverts[i]));
  }
  return fragment;
};

pinList.appendChild(createFragment(adverts));
