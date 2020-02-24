import * as $ from 'jquery';
import {getUserInfo} from './api-service';
import {FRIENDS_LIST_URL} from './constants';
import {appendFriendsList} from './user-friends-list';

export function tabsInit(selector, callBackFn) {
  $(selector).on( 'click', event => {
    event.preventDefault();

    let queryParams = {
            page: $(event.target).data('page')
    };

    getUserInfo(FRIENDS_LIST_URL, queryParams, callBackFn);
  });
}

$('.tabs').on( 'click', event => {
  event.preventDefault();


  // let queryParams = {
  //     page: $(event.target).data('page')
  // };
  //
  // getUserInfo(FRIENDS_LIST_URL, queryParams, appendFriendsList);
});