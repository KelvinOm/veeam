import * as $ from 'jquery';
import { FRIENDS_LIST_URL, POSTS_URL, TABS } from './constants';
import { appendFriends } from './friends-list';
import { appendPostsList } from './posts';
import { getUserInfo } from './api-service';

$('.tabs').on('click', event => {
  let isLinkClicked = $(event.target).hasClass('tabs__btn');

  if (isLinkClicked) {
    event.preventDefault();
    tabsInit($(event.target).data('tab'));
  }
});

function tabsInit(currentTab = null) {
  let currentTabElem;

  switch (true) {
    case currentTab === TABS.FRIENDS:
      currentTabElem = $(`[data-tab=${TABS.FRIENDS}]`);
      $('.user-tabs').removeClass('user-tabs--posts-content');
      getUserInfo(FRIENDS_LIST_URL, {}, appendFriends);
      break;
    case currentTab === TABS.POSTS:
      currentTabElem = $(`[data-tab=${TABS.POSTS}]`);
      $('.user-tabs').addClass('user-tabs--posts-content');
      getUserInfo(POSTS_URL, {}, appendPostsList);
      break;
    default:
      currentTab = TABS.FRIENDS;
      currentTabElem = $(`[data-tab=${TABS.FRIENDS}]`);
      getUserInfo(FRIENDS_LIST_URL, {}, appendFriends);
  }


  $('.tabs__btn--active').removeClass('tabs__btn--active');
  $('.tabs__content--active').removeClass('tabs__content--active');
  $(currentTabElem).addClass('tabs__btn--active');

  $('.tabs__content').get().forEach(tabContentElem => {
    if ($(tabContentElem).data('tab-content') === currentTab) {
      $(tabContentElem).addClass('tabs__content--active');
    }
  });
}

tabsInit();