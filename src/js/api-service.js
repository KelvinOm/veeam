import * as $ from 'jquery';
import { addLoader, removeLoader } from './loader-service';

export function getUserInfo(url, queryParams, callbackFn) {
  addLoader();

  $.get(url, queryParams, result => callbackFn(result))
    .fail(error => {
      callbackFn(null);
      // eslint-disable-next-line no-console
      console.warn(error);
    }).always(function() {
      removeLoader();
    });
}