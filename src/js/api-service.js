import * as $ from 'jquery';

export function getUserInfo(url, queryParams, callbackFn) {
  $.get(url, queryParams, result => callbackFn(result))
    .fail(error => {
      callbackFn(null);
      // eslint-disable-next-line no-console
      console.warn(error);
    });
}