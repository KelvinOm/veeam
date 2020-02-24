import * as $ from 'jquery';
import { getUserInfo } from './api-service';
import { NOT_FOUND, POSTS_URL } from './constants';

function appendPostsList(posts) {
  let template = '';
  let postsListElem = $('.posts__list');

  if (!Array.isArray(posts) || !posts) {
    template = `
            <li class="posts__item not-found">
                ${NOT_FOUND}
            </li>
        `;
  } else {
    posts.forEach(post => {
      template += `
                <li class="posts__item">
                    <div class="posts__title">${post.title}</div>
                    <div class="posts__description">${post.body}</div>
                </li>
            `;
    });
  }

  postsListElem.append($(template));
}

getUserInfo(POSTS_URL, {}, appendPostsList);
