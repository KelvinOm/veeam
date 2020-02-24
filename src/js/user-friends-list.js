import * as $ from 'jquery';
import { getUserInfo } from './api-service';
import { NOT_FOUND, FRIENDS_LIST_URL } from './constants';

let currentFriends;

function appendFriends(friends) {
  appendFriendsPagination(friends.total_pages);
  appendFriendsList(friends.data);
}

export function appendFriendsList(friends) {
  let template = '';
  let friendsListElem = $('.friends__list');

  friendsListElem.empty();

  if (!Array.isArray(friends) || !friends) {
    template = `
            <li class="friends__item not-found">
                ${NOT_FOUND}
            </li>
        `;
  } else {
    currentFriends = [...friends];

    friends.forEach(friend => {
      template += `
                <li class="friends__item">
                    <div class="friends__no-avatar"></div>
                    <div class="friends__info">
                        <div>
                            ${friend.first_name}
                        </div>
                        <div>
                            ${friend.last_name}
                        </div>
                        <div>
                            email:
                            <a href="mailto:${friend.email}">
                                ${friend.email}
                            </a>
                        </div>
                    </div>
                </li>
            `;
    });
  }

  friendsListElem.append($(template));
}

function appendFriendsPagination(totalPages) {
  let template = '';
  let friendsListElem = $('.friends__pagination');

  if (
    !totalPages
        || totalPages === 0
        || friendsListElem.children().length > 0
  ) return;

  for (let i = 1; i <= totalPages; i++) {
    template += `
            <li class="pagination__item">
                <a href="#" data-page="${i}">${i}</a>
            </li>
        `;
  }

  friendsListElem.append($(template));
}

let timerId;
$('.filter-friends').on('change paste keyup', event => {
  clearTimeout(timerId);
  timerId = setTimeout(() => {
    let fileterValue =  event.target.value;
    let filteredFrends = currentFriends.filter(friend => {
      return friend.first_name.includes(fileterValue)
                || friend.last_name.includes(fileterValue)
                || friend.email.includes(fileterValue);
    });
    appendFriendsList(filteredFrends);
  }, 300);
});

getUserInfo(FRIENDS_LIST_URL, {}, appendFriends);