'use strict';

(function () {

  var statusCode = {
    OK: 200
  };

  var createRequest = function (onLoad, onError) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'json';

    xhr.addEventListener('load', function () {
      if (xhr.status === statusCode.OK) {
        onLoad(xhr.response);
      } else {
        onError('Cтатус ответа: ' + xhr.status + ' ' + xhr.statusText);
      }
    });

    xhr.addEventListener('error', function () {
      onError('Произошла ошибка соединения');
    });
    return xhr;
  };

  window.load = function (onLoad, onError) {
    var xhr = createRequest(onLoad, onError);

    xhr.open('GET', 'https://javascript.pages.academy/keksobooking/data');
    xhr.send();
  };

})();
