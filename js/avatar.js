'use strict';

(function () {

  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

  var avatarChooser = document.querySelector('#avatar');
  var avatarPreviewBlock = document.querySelector('.ad-form-header__preview img');
  var defaultAvatarSrc = avatarPreviewBlock.src;

  avatarChooser.addEventListener('change', function () {
    var file = avatarChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        avatarPreviewBlock.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

  var housePhotoChooser = document.querySelector('#images');
  var housePhotoPreviewBlock = document.querySelector('.ad-form__photo');

  var createImgElement = function (src) {
    var newImg = document.createElement('img');
    newImg.width = window.main.AVA_WIDTH;
    newImg.height = window.main.AVA_HEIGHT;
    newImg.src = src;
    housePhotoPreviewBlock.appendChild(newImg);
  };

  housePhotoChooser.addEventListener('change', function () {
    var file = housePhotoChooser.files[0];
    var fileName = file.name.toLowerCase();

    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', function () {
        housePhotoPreviewBlock.src = createImgElement(reader.result);
      });

      reader.readAsDataURL(file);
    }
  });

  window.avatar = {

    resetPhotoInputs: function () {
      avatarPreviewBlock.src = defaultAvatarSrc;
      housePhotoPreviewBlock.innerHTML = '';
    }
  };

})();
