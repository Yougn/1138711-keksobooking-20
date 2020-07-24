'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreviewBlock = document.querySelector('.ad-form-header__preview img');
  var housePhotoChooser = document.querySelector('#images');
  var housePhotoPreviewBlock = document.querySelector('.ad-form__photo');

  var loadFile = function (evt, image) {
    var file = evt.target.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        if (image === window.main.AVATAR) {
          avatarPreviewBlock.src = reader.result;
        } else {
          createImgElement(reader.result);
        }
      });
      reader.readAsDataURL(file);
    }
  };

  avatarChooser.addEventListener('change', function (evt) {
    loadFile(evt, window.main.AVATAR);
  });

  housePhotoChooser.addEventListener('change', function (evt) {
    loadFile(evt, window.main.HOUSE);
  });

  var createImgElement = function (src) {
    var newImg = document.createElement('img');
    newImg.width = window.main.AVA_WIDTH;
    newImg.height = window.main.AVA_HEIGHT;
    newImg.src = src;
    housePhotoPreviewBlock.appendChild(newImg);
  };

  var defaultAvatarSrc = avatarPreviewBlock.src;

  window.avatar = {
    resetPhotoInputs: function () {
      avatarPreviewBlock.src = defaultAvatarSrc;
      housePhotoPreviewBlock.innerHTML = '';
    }
  };

})();
