import * as $ from 'jquery';
import { getUserInfo } from './api-service';
import { FRIENDS_LIST_URL } from './constants';
import { appendFriends } from './friends-list';

$('.friends__pagination').on( 'click', event => {
  let isLinkClicked = $(event.target).hasClass('pagination-list__btn');

  if (isLinkClicked) {
    event.preventDefault();

    $('.pagination-list__btn--active').removeClass('pagination-list__btn--active');
    $(event.target).addClass('pagination-list__btn--active');

    let queryParams = {
      page: $(event.target).data('page')
    };

    getUserInfo(FRIENDS_LIST_URL, queryParams, appendFriends);
  }
});