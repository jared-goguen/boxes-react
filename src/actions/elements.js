import { Set } from 'immutable';

import { 
  SET_GRID_DIMENSIONS,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  DELETE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_ALL_CLASS,
  DELETE_ALL_CLASS,
  TOGGLE_ALL_CLASS,
  SET_SELECTED,
  SHUFFLE_GRID,
  BLANK_ACTION,
  UPDATE_GRID
} from '../actions';

import {
  shuffle
} from './utils';

import {
  loadNextLevel
} from './app';

import { generateActionCreator } from '../ActionQueue';

const enqueueAction = generateActionCreator('elements');

export function setGridDimensions(dimensions) {
  return { type: SET_GRID_DIMENSIONS, ...dimensions };
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

function createAnimation(actionStart, actionStop) {
  return (timeoutStart, timeoutStop) => {
    return (dispatch) => {
      enqueueAction(dispatch, actionStart, timeoutStart);
      if (actionStop !== undefined && timeoutStop !== undefined) {
        enqueueAction(dispatch, actionStop, timeoutStop);
      }
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
export const shakeUnselected = createAnimation(startShakeUnselected, stopShakeUnselected);

const startFadeUnselected = addAllClass('fade', unselected);
export const fadeUnselected = createAnimation(startFadeUnselected);

const startUnfadeUnselected = deleteAllClass('fade', unselected);
export const unfadeUnselected = createAnimation(startUnfadeUnselected);

const startZoomUpSelected = addAllClass('zoom-up', selected);
export const zoomUpSelected = createAnimation(startZoomUpSelected);

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

export function shuffleGrid(timeout) {
  return (dispatch) => {
    enqueueAction(dispatch, {type: SHUFFLE_GRID }, timeout);
  };
}

export function pause(timeout) {
  return (dispatch) => {
    enqueueAction(dispatch, { type: BLANK_ACTION }, timeout);
  }
}

export function transitionMain(timeoutFade, timeoutZoom) {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED })
    fadeUnselected(timeoutFade)(dispatch);
    zoomUpSelected(timeoutZoom)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}

export function updateGrid(grid) {
  return { type: UPDATE_GRID, grid }
}