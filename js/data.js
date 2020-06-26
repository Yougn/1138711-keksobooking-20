'use strict';

(function () {

  var getRandomElement = function (elements) {
    var index = window.main.getRandomInteger(0, elements.length - 1);
    return elements[index];
  };

  var getRandomList = function (items) {
    var j;
    var temp;
    for (var i = items.length - 1; i > 0; i--) {
      j = window.main.getRandomInteger(0, items.length - 1);
      temp = items[j];
      items[j] = items[i];
      items[i] = temp;
    }
    var maxNumber = items.length - 1;
    return items.slice(0, window.main.getRandomInteger(1, maxNumber));
  };

  var getObject = function (number) {
    var x = window.main.getRandomInteger(window.main.MIN_X, window.main.MAX_X);
    var y = window.main.getRandomInteger(window.main.MIN_Y, window.main.MAX_Y);
    var price = window.main.getRandomInteger(window.main.MIN_PRICE, window.main.MAX_PRICE);
    return {
      author: {avatar: 'img/avatars/user0' + number + '.png'},
      offer: {
        title: getRandomElement(window.main.TITLES),
        address: x + ',' + y,
        price: price,
        type: getRandomElement(window.main.TYPES),
        rooms: window.main.getRandomInteger(window.main.MIN_ROOMS, window.main.MAX_ROOMS),
        guests: window.main.getRandomInteger(window.main.MIN_GUESTS, window.main.MAX_GUESTS),
        checkin: getRandomElement(window.main.CHECKINS),
        checkout: getRandomElement(window.main.CHECKOUTS),
        features: getRandomList(window.main.FEATURES),
        description: getRandomElement(window.main.DESCRIPTIONS),
        photos: getRandomList(window.main.PHOTOS)
      },
      location: {
        x: x,
        y: y
      }
    };
  };

  window.getObjectsBlocks = function (number) {
    var blocks = [];
    for (var i = 0; i < number; i++) {
      blocks.push(getObject(i + 1));
    }
    return blocks;
  };

})();

