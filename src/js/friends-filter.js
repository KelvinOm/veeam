import * as $ from 'jquery';
import { appendFriends, appendFriendsList } from './friends-list';
import { getUserInfo } from './api-service';
import { FRIENDS_LIST_URL } from './constants';
import { get } from 'lodash';

let timerId;
let allFriends = [];
let filterValue;

$('.friends__input').on('change paste keyup', event => {
  let debounceTime = 300;
  clearTimeout(timerId);

  timerId = setTimeout(() => {
    filterValue =  event.target.value;
    getFriends();
  }, debounceTime);
});

function getFriends(friends = null) {
  if (Array.isArray(get(friends, 'data')) && get(friends, 'data.length') !== 0) {
    allFriends = [...allFriends, ...friends.data];
  }

  if (friends === null || get(friends, 'page') < get(friends, 'total_pages')) {
    let firstPage = 1;
    let currentPage = get(friends, 'page') ? ++friends.page : firstPage;
    let queryParams = {
      page: currentPage
    };

    getUserInfo(FRIENDS_LIST_URL, queryParams, getFriends);
  } else {
    friendsFilter(allFriends, filterValue);
  }
}

function friendsFilter(friends, filterValue) {
  if (!filterValue) {
    getUserInfo(FRIENDS_LIST_URL, {}, appendFriends);
  }

  let filteredFriends = friends.filter(friend => {
    return friend.first_name.includes(filterValue)
           || friend.last_name.includes(filterValue)
           || friend.email.includes(filterValue);
  });

  allFriends = [];
  $('.pagination-list__item').remove();
  appendFriendsList(filteredFriends);
}
