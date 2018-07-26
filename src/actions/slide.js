import { 
  SET_SLIDE_NULL,
  RESET_SLIDE
} from '../actions';

import {
  addAllClassAnimation,
  deleteAllClassAnimation
} from './animations';

import {
  loadNextLevel
} from './app';

import { createAction } from '../ActionQueue';


export function reset() {
  return { type: RESET_SLIDE };
}

export function setNullPosition(row, col) {
  return { type: SET_SLIDE_NULL, row, col };
};

export function transition(timeoutSelect, timeoutUnselect, timeoutFade, queue) {
  return (dispatch) => {
    dispatch(reset());
    addAllClassAnimation('selected', undefined, timeoutSelect, queue)(dispatch);
    deleteAllClassAnimation('selected', undefined, timeoutUnselect, queue)(dispatch);
    addAllClassAnimation('fade', undefined, timeoutFade, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}
