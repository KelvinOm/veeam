import * as $ from 'jquery';
import {DEFAULT_DEBOUNCE_TIME} from './constants';

let timerId;
let isTimerRemoved;

export function addLoader() {
  isTimerRemoved = false;

  let loaderTemplate = `
                     <div class="loader">
                        <img class="loader__gif"
                             src="img/loader.gif"
                             width="64"
                             height="64"
                             alt="loader">
                      </div>
        `;

  timerId = setTimeout(() => {
    if (!isTimerRemoved) {
      $('body').append($(loaderTemplate));
      isTimerRemoved = false;
    }
  }, DEFAULT_DEBOUNCE_TIME);
}

export function removeLoader() {
  isTimerRemoved = true;
  clearTimeout(timerId);
  $('.loader').remove();
}