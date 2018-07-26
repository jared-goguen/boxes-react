import { 
  RESET_LIGHT,
  INITIALIZE_LIGHT,
  SET_TRACKER
} from '../actions';

import {
  addRandomClass
} from './animations';

import {
  loadNextLevel
} from './app';

import { createAction } from '../ActionQueue';


export function reset() {
  return { type: RESET_LIGHT };
}

export function initializeLight(index, N) {
  return { type: INITIALIZE_LIGHT, index, N };
};

export function setTracker(tracker) {
  return { type: SET_TRACKER, tracker };
}

export function transition(boxes, timeoutHide, timeoutFade, queue) {
  return (dispatch) => {
    dispatch(reset());
    addRandomClass(boxes, 'hidden', timeoutHide / boxes.length ** 2, queue)(dispatch);
    addRandomClass(boxes, 'fade', timeoutFade / boxes.length ** 2, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}
