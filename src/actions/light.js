import { 
  RESET_LIGHT,
  INITIALIZE_LIGHT,
  SET_TRACKER
} from '../actions';

import {
  setBoxColor
} from './elements';

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

export function boxClickAnimation(boxInfos, timeout, queue) {
  return (dispatch) => {
    let lastInfo = boxInfos.pop();
    let row, col, color;
    for (let boxInfo of boxInfos) {
      let { row, col, color } = boxInfo;
      createAction(dispatch, setBoxColor(row, col, color), 0, queue);
    }
    row = lastInfo.row;
    col = lastInfo.col;
    color = lastInfo.color;
    createAction(dispatch, setBoxColor(row, col, color), timeout, queue);
  };
}

export function transition(boxes, timeoutHide, timeoutFade, queue) {
  return (dispatch) => {
    dispatch(reset());
    addRandomClass(boxes, 'hidden', timeoutHide / boxes.length ** 2, queue)(dispatch);
    addRandomClass(boxes, 'fade', timeoutFade / boxes.length ** 2, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}
