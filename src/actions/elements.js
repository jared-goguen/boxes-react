import { Set } from 'immutable';

import { 
  SET_GRID_PADDING,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  DELETE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_ALL_CLASS,
  DELETE_ALL_CLASS,
  TOGGLE_ALL_CLASS,
  SET_SELECTED
} from '../actions';

import {
  shuffle
} from './util';

import { generateActionCreator } from '../ActionQueue';

const enqueueAction = generateActionCreator('elements');

export function setGridPadding(padding) {
  return { type: SET_GRID_PADDING, padding };
} 

export function registerBoxes(boxes) {
  return { type: REGISTER_BOXES, boxes };
}

export function addBoxClass(row, col, name) {
  return { type: ADD_BOX_CLASS, row, col, name };
}

export function deleteBoxClass(row, col, name) {
  return { type: DELETE_BOX_CLASS, row, col, name };
}

export function toggleBoxClass(row, col, name) {
  return { type: TOGGLE_BOX_CLASS, row, col, name };
}

export function addAllClass(name, condition) {
  return { type: ADD_ALL_CLASS, name, condition };
}

export function deleteAllClass(name, condition) {
  return { type: DELETE_ALL_CLASS, name, condition };
}

export function toggleAllClass(name, condition) {
  return { type: TOGGLE_ALL_CLASS, name, condition };
}

export function setSelected() {
  return { type: SET_SELECTED };
}

function createAnimation(actionStart, timeoutStart, actionStop, timeoutStop) {
  return (dispatch) => {
    enqueueAction(dispatch, actionStart, timeoutStart);
    if (actionStop !== undefined && timeoutStop !== undefined) {
      enqueueAction(dispatch, actionStop, timeoutStop);
    }
  }
}

const selected = (box) => {
  return box.classNames.has('selected');
};

const unselected = (box) => {
  return !box.classNames.has('selected');
};

const startShakeUnselected = addAllClass('shake', unselected);
const stopShakeUnselected = deleteAllClass('shake', unselected);
export const shakeUnselected = createAnimation(
  startShakeUnselected, 1000, 
  stopShakeUnselected, 100
);

const startFadeUnselected = addAllClass('fade', unselected);
export const fadeUnselected = createAnimation(
  startFadeUnselected, 250
);

const startUnfadeUnselected = deleteAllClass('fade', unselected);
export const unfadeUnselected = createAnimation(
  startUnfadeUnselected, 250
);

const startZoomRightSelected = addAllClass('zoom-right', selected);
export const zoomRightSelected = createAnimation(
  startZoomRightSelected, 1000
);

function randomClassChange(func, boxes, name, timeout) {
  return (dispatch) => {
    let flatBoxes = [].concat.apply([], boxes);
    shuffle(flatBoxes);
    for (let box of flatBoxes) {
      let action = func(box.row, box.col, name);
      enqueueAction(dispatch, action, timeout)
    }
  }
}

export function addRandomClass(boxes, name, timeout) {
  return randomClassChange(addBoxClass, boxes, name, timeout);
}

export function deleteRandomClass(boxes, name, timeout) {
  return randomClassChange(deleteBoxClass, boxes, name, timeout);
}

export function toggleRandomClass(boxes, name, timeout) {
  return randomClassChange(toggleBoxClass, boxes, name, timeout);
}

export function unloadMain(dispatch) {
  dispatch({ type: SET_SELECTED })
  fadeUnselected(dispatch);
  zoomRightSelected(dispatch);
}