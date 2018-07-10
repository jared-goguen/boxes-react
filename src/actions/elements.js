import { Set } from 'immutable';

import { 
  SET_GRID_PADDING,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  REMOVE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_ALL_CLASS,
  REMOVE_ALL_CLASS,
  TOGGLE_ALL_CLASS
} from '../actions';

import { generateActionCreator } from '../ActionQueue';

const enqueueAction = generateActionCreator('elements');

export function setGridPadding(padding) {
  return { type: SET_GRID_PADDING, padding };
} 

export function registerBoxes(boxes) {
  const boxClasses = boxes.map(row => row.map(box => new Set()));
  return { type: REGISTER_BOXES, boxes, boxClasses };
}

export function addBoxClass(row, col, name) {
  return { type: ADD_BOX_CLASS, row, col, name };
}

export function removeBoxClass(row, col, name) {
  return { type: REMOVE_BOX_CLASS, row, col, name };
}

export function toggleBoxClass(row, col, name) {
  return { type: TOGGLE_BOX_CLASS, row, col, name };
}

export function addAllClass(name, condition) {
  return { type: ADD_ALL_CLASS, name, condition };
}

export function removeAllClass(name, condition) {
  return { type: REMOVE_ALL_CLASS, name, condition };
}

export function toggleAllClass(name, condition) {
  return { type: TOGGLE_ALL_CLASS, name, condition };
}

function createAnimation(actionStart, timeoutStart, actionStop, timeoutStop) {
  return (dispatch) => {
    enqueueAction(dispatch, actionStart, timeoutStart);
    if (actionStop !== undefined && timeoutStop !== undefined) {
      enqueueAction(dispatch, actionStop, timeoutStop);
    }
  }
}

const selected = (row, col, classNames) => {
  return classNames.has('selected');
};

const unselected = (row, col, classNames) => {
  return !classNames.has('selected');
};

const startShakeUnselected = addAllClass('shake', unselected);
const stopShakeUnselected = removeAllClass('shake', unselected);
export const shakeUnselected = createAnimation(
  startShakeUnselected, 1000, 
  stopShakeUnselected, 100
);

const startFadeUnselected = addAllClass('fade', unselected);
export const fadeUnselected = createAnimation(
  startFadeUnselected, 250
);

const startUnfadeUnselected = removeAllClass('fade', unselected);
export const unfadeUnselected = createAnimation(
  startUnfadeUnselected, 250
);

const startZoomRightSelected = addAllClass('zoom-right', selected);
export const zoomRightSelected = createAnimation(
  startZoomRightSelected, 1000
);

export function unloadMain(dispatch) {
  fadeUnselected(dispatch);
  zoomRightSelected(dispatch);
}