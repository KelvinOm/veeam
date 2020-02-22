'use strict';

import * as $ from 'jquery';

const userInfoUrl = 'https://randomuser.me/api/';
const friendsListUrl = 'https://reqres.in/api/users';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts';
const notFound = 'Not found';

function getUserInfo(url, queryParams, appendFn) {
    $.get(url, queryParams, (result) => {
        appendFn(result);
    }).fail((error) => {
        console.warn(error)
    })
}

function appendMainUserInfo({results}) {
    // TODO: разделить на 2 функции, изображение и данные юзера
    let userInfo = results[0];
    let contactInfoTemplate = '';
    let contactInfoElem = $('.contact-information');
    let avatarTemplate = '';
    let avatarElem = $('.avatar');

    if (!userInfo) {
        contactInfoTemplate =`
            <div class="not-found">
                ${notFound}
            </div>
        `;
    } else {
        avatarTemplate = `
            <img class="avatar__image"
                 src="${userInfo.picture.large}"
                 width="300"
                 height="300"
                 alt="User Avatar">
        `;
        contactInfoTemplate = `
            <div>${userInfo.name.title} ${userInfo.name.first} ${userInfo.name.last}</div>
            <div>email: ${userInfo.email}</div>
            <div>phone: ${userInfo.phone}</div>
            <div>${userInfo.location.postcode} ${userInfo.location.country} ${userInfo.location.state} ${userInfo.location.city}</div>
        `;
    }

    avatarElem.append($(avatarTemplate));
    contactInfoElem.append($(contactInfoTemplate));
}

function appendFriendsList(friends) {
    let template = '';
    let friendsListElem = $('.friends__list');

    appendFriendsPagination(friends.total_pages);
    friendsListElem.empty();

    if (!Array.isArray(friends.data) || !friends) {
        template =`
            <li class="friends__item not-found">
                ${notFound}
            </li>
        `
    } else {
        friends.data.forEach(friend => {
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

function appendPostsList(posts) {
    let template = '';
    let postsListElem = $('.posts__list');

    if (!Array.isArray(posts) || !posts) {
        template =`
            <li class="posts__item not-found">
                ${notFound}
            </li>
        `
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

getUserInfo(userInfoUrl, {}, appendMainUserInfo);
getUserInfo(friendsListUrl, {}, appendFriendsList);
getUserInfo(postsUrl, {}, appendPostsList);

$(".friends__pagination").on( "click", event => {
    event.preventDefault();

    let queryParams = {
        page: $(event.target).data('page')
    };

    getUserInfo(friendsListUrl, queryParams, appendFriendsList);
});

$(".tabs").on( "click", event => {
    event.preventDefault();

    let queryParams = {
        page: $(event.target).data('page')
    };

    getUserInfo(friendsListUrl, queryParams, appendFriendsList);
});

$(".avatar__input-field").change((event) => setAvatarImage(event.target));

function setAvatarImage(input) {
    if (input.files && input.files[0]) {
        let reader = new FileReader();

        reader.onload = event => {
            $('.avatar__image').attr('src', event.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}

// TODO: параметры в URL
function getURLParameter(param) {
    let url = window.location.search.substring(1);
    let urlVariables = url.split('&');

    urlVariables.forEach(variable => {
        let parameterName = variable.split('=');

        if (parameterName[0] === param) {
            return parameterName[1];
        }
    });
}
// getURLParameter('friendsPage');