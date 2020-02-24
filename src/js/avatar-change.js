import * as $ from 'jquery';

$('.avatar__input-field').on('change', event => setAvatarImage(event.target));

function setAvatarImage(input) {
  if (input.files && input.files[0]) {
    let reader = new FileReader();

    reader.onload = event => {
      $('.avatar__image').attr('src', event.target.result);
    };

    reader.readAsDataURL(input.files[0]);

    $('.avatar').removeClass('avatar--default');
  }
}

