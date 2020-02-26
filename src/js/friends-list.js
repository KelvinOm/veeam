import * as $ from 'jquery';
import { NOT_FOUND } from './constants';

export function appendFriends(friends) {
  appendFriendsPagination(friends.total_pages);
  appendFriendsList(friends.data);
}

export function appendFriendsList(friends) {
  let template = '';
  let friendsListElem = $('.friends__list');

  $('.friends__item').remove();

  friendsListElem.empty();

  if (!Array.isArray(friends) || !friends) {
    template = `
            <li class="friends__item not-found">
                ${NOT_FOUND}
            </li>
        `;
  } else {
    friends.forEach(friend => {
      template += `
                <li class="friends__item">
                    <img class="friends__avatar"
                         src="${friend.avatar}"
                         width="125"
                         height="125"
                         alt="${friend.first_name} ${friend.last_name}">
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

export function appendFriendsPagination(totalPages) {
  let template = '';
  let friendsListElem = $('.friends__pagination');

  if (
    !totalPages
    || totalPages === 0
    || friendsListElem.children().length > 0
  ) return;

  for (let i = 1; i <= totalPages; i++) {
    let paginationLinkClass = i === 1
                              ? 'pagination-list__btn pagination-list__btn--active'
                              : 'pagination-list__btn';

    template += `
            <li class="pagination-list__item">
                <button type="button"
                   class="${paginationLinkClass}"
                   data-page="${i}">${i}
                </button>
            </li>
        `;
  }

  friendsListElem.append($(template));
}