import { createAction } from '../ActionQueue';

import { 
  SET_WINDOW_SIZE,
  LOAD_NEXT_LEVEL
} from '../actions';

import {
  setSelected
} from './elements';

import {
  fadeUnselected,
  zoomUpSelected
} from './animations';


export function setWindowSize(width, height) {
  return { type: SET_WINDOW_SIZE, instantiated: true, width, height };
}

export function loadNextLevel(timeout) {
  return (dispatch) => {
    createAction(dispatch, { type: LOAD_NEXT_LEVEL }, timeout);
  };
}

export function transitionMain(timeoutFade, timeoutZoom, queue) {
  return (dispatch) => {
    dispatch(setSelected());
    fadeUnselected(timeoutFade, undefined, queue)(dispatch);
    zoomUpSelected(timeoutZoom, undefined, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}