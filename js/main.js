'use strict';

(function () {

  var TITLES = ['Можно лучше!', 'У нас курят!', 'Моё уважение!'];
  var TYPES = ['palace', 'flat', 'house', 'bungalo'];
  var CHECKINS = ['12:00', '13:00', '14:00'];
  var CHECKOUTS = ['12:00', '13:00', '14:00'];
  var FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
  var DESCRIPTIONS = ['Прекрасные апартаменты!', 'Все как дома!'];
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
  var CARD_IMAGE_WIDTH = '45px';
  var CARD_IMAGE_HEIGHT = '40px';
  var PIN_WIDTH = 62;
  var PIN_HEIGHT = 62;
  var PIN_LEG = 22;
  var MIN_TITLE_LENGTH = 30;
  var MAX_TITLE_LENGTH = 100;
  var COST_ZERO = 0;
  var COST_THOUSAND = 1000;
  var COST_FIVE_THOUSAND = 5000;
  var COST_TEN_THOUSAND = 10000;
  var START_X = 570;
  var START_Y = 375;
  var MAX_PIN_NUMBER = 5;
  var ANY_HOUSE = 'any';
  var PRIСE_LOW = 'low';
  var PRIСE_MIDDLE = 'middle';
  var PRIСE_HIGH = 'high';
  var PRIСE_TEN_THOUSAND = 10000;
  var PRIСE_FIFTY_THOUSAND = 50000;
  var AVA_WIDTH = 40;
  var AVA_HEIGHT = 44;
  var AVATAR = true;
  var HOUSE = false;
  var ENTER_BTN = 'Enter';
  var ESCAPE_BTN = 'Escape';
  var isOneTimeActivated = false;
  var isMapActivated = false;


  window.main = {
    TITLES: TITLES,
    TYPES: TYPES,
    CHECKINS: CHECKINS,
    CHECKOUTS: CHECKOUTS,
    FEATURES: FEATURES,
    DESCRIPTIONS: DESCRIPTIONS,
    PHOTOS: PHOTOS,
    MIN_X: MIN_X,
    MAX_X: MAX_X,
    MIN_Y: MIN_Y,
    MAX_Y: MAX_Y,
    MIN_PRICE: MIN_PRICE,
    MAX_PRICE: MAX_PRICE,
    MIN_ROOMS: MIN_ROOMS,
    MAX_ROOMS: MAX_ROOMS,
    MIN_GUESTS: MIN_GUESTS,
    MAX_GUESTS: MAX_GUESTS,
    NUMBER: NUMBER,
    CARD_IMAGE_WIDTH: CARD_IMAGE_WIDTH,
    CARD_IMAGE_HEIGHT: CARD_IMAGE_HEIGHT,
    PIN_WIDTH: PIN_WIDTH,
    PIN_HEIGHT: PIN_HEIGHT,
    PIN_LEG: PIN_LEG,
    MIN_TITLE_LENGTH: MIN_TITLE_LENGTH,
    MAX_TITLE_LENGTH: MAX_TITLE_LENGTH,
    COST_ZERO: COST_ZERO,
    COST_THOUSAND: COST_THOUSAND,
    COST_FIVE_THOUSAND: COST_FIVE_THOUSAND,
    COST_TEN_THOUSAND: COST_TEN_THOUSAND,
    START_X: START_X,
    START_Y: START_Y,
    MAX_PIN_NUMBER: MAX_PIN_NUMBER,
    ANY_HOUSE: ANY_HOUSE,
    PRIСE_LOW: PRIСE_LOW,
    PRIСE_MIDDLE: PRIСE_MIDDLE,
    PRIСE_HIGH: PRIСE_HIGH,
    PRIСE_TEN_THOUSAND: PRIСE_TEN_THOUSAND,
    PRIСE_FIFTY_THOUSAND: PRIСE_FIFTY_THOUSAND,
    AVA_WIDTH: AVA_WIDTH,
    AVA_HEIGHT: AVA_HEIGHT,
    AVATAR: AVATAR,
    HOUSE: HOUSE,
    ENTER_BTN: ENTER_BTN,
    ESCAPE_BTN: ESCAPE_BTN,
    isOneTimeActivated: isOneTimeActivated,
    isMapActivated: isMapActivated,

    getRandomInteger: function (min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    }
  };

})();
