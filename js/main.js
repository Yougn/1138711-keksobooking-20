'use strict';

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

var getRandomInteger = function (min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
};

var getRandomElement = function (elements) {
  var index = getRandomInteger(0, elements.length - 1);
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
      type: getRandomElement(TYPES),
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

var apartmentName = {
  flat: 'квартира',
  bungalo: 'бунгало',
  house: 'дом',
  palace: 'дворец'
};

var userMap = document.querySelector('.map');
// userMap.classList.remove('map--faded');

var pinTemplate = document.querySelector('#pin').content.querySelector('.map__pin');

var renderPin = function (advert, count) {
  var pin = pinTemplate.cloneNode(true);
  pin.style.left = advert.location.x + 'px';
  pin.style.top = advert.location.y + 'px';
  pin.querySelector('img').src = advert.author.avatar;
  pin.querySelector('img').alt = advert.offer.title;

  pin.querySelector('img').dataset.id = count;
  pin.dataset.id = count;

  return pin;
};

var renderAdverts = function (adverts) {
  var fragment = document.createDocumentFragment();
  for (var i = 0; i < adverts.length; i++) {
    if (adverts[i].offer) {
      fragment.appendChild(renderPin(adverts[i], i));
    }
  }
  return fragment;
};

var adverts = getObjectsBlocks(NUMBER);

var mainMap = document.querySelector('.map');
var cardTemplate = document.querySelector('#card').content.querySelector('.map__card');

var renderCard = function (advert) {
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
      newImg.style.width = CARD_IMAGE_WIDTH;
      newImg.style.height = CARD_IMAGE_HEIGHT;
      newImg.alt = 'Фотография жилья';
      cardPhotos.appendChild(newImg);
    }
  } else {
    cardPhotos.classList.add('hidden');
  }

  card.querySelector('img').src = advert.author.avatar;

  card.querySelector('.popup__close').addEventListener('click', function () {
    card.remove();
    deleteCard();
  });

  deleteCard();

  return card;
};

var deleteCard = function () {
  document.removeEventListener('keydown', keyDownHendler);
};

var keyDownHendler = function (evt) {
  if (evt.key === 'Escape') {
    document.querySelector('.map__card.popup').remove();
    deleteCard();
  }
};

var pinList = document.querySelector('.map__pins');

pinList.addEventListener('click', function (evt) {

  var id = evt.target.dataset.id;
  if (!id) {
    return;
  }

  var oldCar = document.querySelector('.map__card.popup');
  if (oldCar) {
    oldCar.remove();
  }

  mainMap.appendChild(renderCard(adverts[id]));
});


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

var openPage = function () {
  userMap.classList.remove('map--faded');
  changeStatus(filterFeatures, filterMap);
  changeStatus(formMain, formElements);
};

var mainPin = document.querySelector('.map__pin--main');

var getPinPosition = function () {
  var x = mainPin.offsetLeft + PIN_WIDTH / 2;
  var y = mainPin.offsetTop + PIN_HEIGHT + PIN_LEG;
  return x + ', ' + y;
};

var address = document.querySelector('input[name="address"]');

mainPin.addEventListener('mousedown', function (evt) {

  if (evt.which === 1) {
    address.value = getPinPosition();
    openPage();
    getValidMessage();
    getValidPrise();
    changePlaceholder();
    getValidTimeIn();
    getValidTimeOut();
    pinList.appendChild(renderAdverts(adverts));
  }
});

mainPin.addEventListener('keydown', function (evt) {
  if (evt.key === 'Enter') {
    address.value = getPinPosition();
    openPage();
    getValidMessage();
    getValidPrise();
    changePlaceholder();
    getValidTimeIn();
    getValidTimeOut();
    pinList.appendChild(renderAdverts(adverts));
  }
});

// mainPin.addEventListener('mousemove', function (evt) {
//   if (evt.which === 1) {
//     address.value = getPinPosition();
//   }
// });

var roomsNumber = document.querySelector('#room_number');
var guestsNumber = document.querySelector('#capacity');

var getValidMessage = function () {
  var rooms = roomsNumber.value;
  var guests = guestsNumber.value;
  var validationMessage = '';

  if (rooms < guests) {
    validationMessage = 'Ошибка!Количество гостей не должно превышать количество комнат!';
  }

  if (rooms === '100' && guests !== '0') {
    validationMessage = 'Ошибка! Данные категории недоступны!';
  }

  if (guests === '0' && rooms !== '100') {
    validationMessage = 'Ошибка! Данные категории недоступны!';
  }

  roomsNumber.setCustomValidity(validationMessage);
};

roomsNumber.addEventListener('change', function () {
  getValidMessage();
});

guestsNumber.addEventListener('change', function () {
  getValidMessage();
});

var titleAdvert = document.querySelector('#title');

titleAdvert.addEventListener('invalid', function () {
  if (titleAdvert.validity.valueMissing) {
    titleAdvert.setCustomValidity('Обязательное поле!');
  } else {
    titleAdvert.setCustomValidity('');
  }
});

titleAdvert.addEventListener('input', function () {
  var valueLength = titleAdvert.value.length;

  if (valueLength < MIN_TITLE_LENGTH) {
    titleAdvert.setCustomValidity('Ещё ' + (MIN_TITLE_LENGTH - valueLength) + ' симв.');
  } else if (valueLength > MAX_TITLE_LENGTH) {
    titleAdvert.setCustomValidity('Удалите лишние ' + (valueLength - MAX_TITLE_LENGTH) + ' симв.');
  } else {
    titleAdvert.setCustomValidity('');
  }
});

var typeApartment = document.querySelector('#type');
var priceApartment = document.querySelector('#price');

var getValidPrise = function () {
  var type = typeApartment.value;

  if (type === 'bungalo') {
    priceApartment.value = '0';
    priceApartment.setAttribute('min', '0');
  } else if (type === 'flat') {
    priceApartment.value = '1000';
    priceApartment.setAttribute('min', '1000');
  } else if (type === 'house') {
    priceApartment.value = '5000';
    priceApartment.setAttribute('min', '5000');
  } else if (type === 'palace') {
    priceApartment.value = '10000';
    priceApartment.setAttribute('min', '100000');
  }
};

typeApartment.addEventListener('change', function () {
  getValidPrise();
  changePlaceholder();
});

var changePlaceholder = function () {
  priceApartment.setAttribute('placeholder', getValidPrise());
};

var timeInList = document.querySelector('#timein');
var timeOutList = document.querySelector('#timeout');

var getValidTimeIn = function () {
  var timeIn = timeInList.value;

  if (timeIn === '12:00') {
    timeOutList.value = '12:00';
  }

  if (timeIn === '13:00') {
    timeOutList.value = '13:00';
  }

  if (timeIn === '14:00') {
    timeOutList.value = '14:00';
  }
};

var getValidTimeOut = function () {
  var timeOut = timeOutList.value;

  if (timeOut === '12:00') {
    timeInList.value = '12:00';
  }

  if (timeOut === '13:00') {
    timeInList.value = '13:00';
  }

  if (timeOut === '14:00') {
    timeInList.value = '14:00';
  }
};

timeInList.addEventListener('change', function () {
  getValidTimeIn();
});

timeOutList.addEventListener('change', function () {
  getValidTimeOut();
});
