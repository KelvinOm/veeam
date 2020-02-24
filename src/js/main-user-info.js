import * as $ from 'jquery';
import { getUserInfo } from './api-service';
import { NOT_FOUND, USER_INFO_URL } from './constants';
import { get } from 'lodash';

function appendUserInfo(data) {
  let userInfo = get(data, 'results[0]');

  appendUserAvatar(userInfo);
  appendMainUserInfo(userInfo);
}

function appendUserAvatar(userInfo) {
  let avatarTemplate = ``;
  let avatarElem = $('.avatar');

  if (!userInfo) {
    avatarTemplate = `
            <img class="avatar__image"
                 src="img/default-avatar.png"
                 width="300"
                 height="300"
                 alt="Default user avatar">
        `;
    avatarElem.addClass('avatar--default');
  } else {
    avatarTemplate = `
            <img class="avatar__image"
                 src="${get(userInfo, 'picture.large')}"
                 width="300"
                 height="300"
                 alt="User avatar">
        `;
  }

  avatarElem.append($(avatarTemplate));
}

function appendMainUserInfo(userInfo) {
  let contactInfoTemplate = ``;
  let contactInfoElem = $('.contact-information');

  if (!userInfo) {
    contactInfoTemplate = `
            <div class="not-found">
                ${NOT_FOUND}
            </div>
        `;
  } else {
    contactInfoTemplate = `
            <div>${get(userInfo, 'name.title')} ${get(userInfo, 'name.first')} ${get(userInfo, 'name.last')}</div>
            <div>email: ${userInfo.email}</div>
            <div>phone: ${userInfo.phone}</div>
            <div> ${get(userInfo, 'location.postcode')} ${get(userInfo, 'location.country')} ${get(userInfo, 'location.state')} ${get(userInfo, 'location.city')}</div>
        `;
  }

  contactInfoElem.append($(contactInfoTemplate));
}

getUserInfo(USER_INFO_URL, {}, appendUserInfo);
