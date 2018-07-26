import { Set } from 'immutable';

import { 
  SET_GRID_DIMENSIONS,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  DELETE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_BOX_CLASSES,
  DELETE_BOX_CLASSES,
  TOGGLE_BOX_CLASSES,
  ADD_ALL_CLASS,
  DELETE_ALL_CLASS,
  TOGGLE_ALL_CLASS,
  ADD_ALL_CLASSES,
  DELETE_ALL_CLASSES,
  TOGGLE_ALL_CLASSES,
  SET_SELECTED,
  SHUFFLE_GRID,
  BLANK_ACTION,
  UPDATE_GRID,
  APPLY_BOX,
  NULLIFY_BOX,
  SWAP_BOXES
} from '../actions';

import {
  shuffle
} from './utils';

import {
  loadNextLevel
} from './app';

import { createAction } from '../ActionQueue';

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

export function addBoxClasses(row, col, names) {
  return { type: ADD_BOX_CLASSES, row, col, names };
}

export function deleteBoxClasses(row, col, names) {
  return { type: DELETE_BOX_CLASSES, row, col, names };
}

export function toggleBoxClasses(row, col, names) {
  return { type: TOGGLE_BOX_CLASSES, row, col, names };
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

export function addAllClasses(names, condition) {
  return { type: ADD_ALL_CLASSES, names, condition };
}

export function deleteAllClasses(names, condition) {
  return { type: DELETE_ALL_CLASSES, names, condition };
}

export function toggleAllClasses(names, condition) {
  return { type: TOGGLE_ALL_CLASSES, names, condition };
}

export function nullifyBox(row, col) {
  return { type: NULLIFY_BOX, row, col };
}

export function swapBoxes(pos1, pos2) {
  return { type: SWAP_BOXES, pos1, pos2 };
}

export function setSelected() {
  return { type: SET_SELECTED };
}

function createAnimation(actionStart, actionStop) {
  return (timeoutStart, timeoutStop, queue) => {
    return (dispatch) => {
      createAction(dispatch, actionStart, timeoutStart, queue);
      if (actionStop !== undefined && timeoutStop !== undefined) {
        createAction(dispatch, actionStop, timeoutStop, queue);
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

const faded = (box) => {
  return box.classNames.has('fade');
};

const startShakeUnselected = addAllClass('shake', unselected);
const stopShakeUnselected = deleteAllClass('shake', unselected);
export const shakeUnselected = createAnimation(startShakeUnselected, stopShakeUnselected);

const startFadeUnselected = addAllClass('fade', unselected);
export const fadeUnselected = createAnimation(startFadeUnselected);

const startFadeSelected = addAllClass('fade', selected);
export const fadeSelected = createAnimation(startFadeSelected);

const startUnfadeUnselected = deleteAllClass('fade', unselected);
export const unfadeUnselected = createAnimation(startUnfadeUnselected);

const startZoomUpSelected = addAllClass('zoom-up', selected);
export const zoomUpSelected = createAnimation(startZoomUpSelected);

const startUnselectSelected = deleteAllClass('selected', selected);
export const unselectSelected = createAnimation(startUnselectSelected);

const startHideSelected = addAllClass('hidden', selected);
export const hideSelected = createAnimation(startHideSelected);

const startHideAll = addAllClass('hidden');
export const hideAll = createAnimation(startHideAll);

const startBurnoutAll = addAllClass('burnout');
const stopBurnoutAll = toggleAllClasses(['fade', 'burnout']);
export const burnoutAll = createAnimation(startBurnoutAll, stopBurnoutAll);

const startUnfadeFaded = deleteAllClass('fade', faded);
export const unfadeFaded = createAnimation(startUnfadeFaded);

export function addBoxClassAnimation(row, col, name, timeout, queue) {
  return (dispatch) => {
    let action = addBoxClass(row, col, name);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function deleteBoxClassAnimation(row, col, name, timeout, queue) {
  return (dispatch) => {
    let action = deleteBoxClass(row, col, name);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function toggleBoxClassAnimation(row, col, name, timeout, queue) {
  return (dispatch) => {
    let action = toggleBoxClass(row, col, name);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function addAllClassAnimation(name, condition, timeout, queue) {
  return (dispatch) => {
    let action = addAllClass(name, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function deleteAllClassAnimation(name, condition, timeout, queue) {
  return (dispatch) => {
    let action = deleteAllClass(name, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function toggleAllClassAnimation(name, condition, timeout, queue) {
  return (dispatch) => {
    let action = toggleAllClass(name, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function addAllClassesAnimation(names, condition, timeout, queue) {
  return (dispatch) => {
    let action = addAllClasses(names, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function deleteAllClassesAnimation(names, condition, timeout, queue) {
  return (dispatch) => {
    let action = deleteAllClasses(names, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function toggleAllClassesAnimation(names, condition, timeout, queue) {
  return (dispatch) => {
    let action = toggleAllClasses(names, condition);  
    createAction(dispatch, action, timeout, queue);
  };
}


export function addBoxClassesAnimation(row, col, names, timeout, queue) {
  return (dispatch) => {
    let action = addBoxClasses(row, col, names);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function deleteBoxClassesAnimation(row, col, names, timeout, queue) {
  return (dispatch) => {
    let action = deleteBoxClasses(row, col, names);  
    createAction(dispatch, action, timeout, queue);
  };
}

export function toggleBoxClassesAnimation(row, col, names, timeout, queue) {
  return (dispatch) => {
    let action = toggleBoxClasses(row, col, names);  
    createAction(dispatch, action, timeout, queue);
  };
}

function randomClassChange(func, boxes, name, timeout, queue) {
  return (dispatch) => {
    let flatBoxes = [].concat.apply([], boxes);
    shuffle(flatBoxes);
    for (let box of flatBoxes) {
      let action = func(box.row, box.col, name);
      createAction(dispatch, action, timeout, queue)
    }
  }
}

export function addRandomClass(boxes, name, timeout, queue) {
  return randomClassChange(addBoxClass, boxes, name, timeout, queue);
}

export function deleteRandomClass(boxes, name, timeout, queue) {
  return randomClassChange(deleteBoxClass, boxes, name, timeout, queue);
}

export function toggleRandomClass(boxes, name, timeout, queue) {
  return randomClassChange(toggleBoxClass, boxes, name, timeout, queue);
}

export function shuffleGrid(timeout, queue) {
  return (dispatch) => {
    createAction(dispatch, {type: SHUFFLE_GRID }, timeout, queue);
  };
}

export function pause(timeout, queue) {
  return (dispatch) => {
    createAction(dispatch, { type: BLANK_ACTION }, timeout, queue);
  }
}

export function transitionMain(timeoutFade, timeoutZoom, queue) {
  return (dispatch) => {
    dispatch({ type: SET_SELECTED })
    fadeUnselected(timeoutFade, undefined, queue)(dispatch);
    zoomUpSelected(timeoutZoom, undefined, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}

export function updateGrid(grid) {
  return { type: UPDATE_GRID, grid }
}

export function applyBox(row, col, func) {
  return { type: APPLY_BOX, row, col, func };
}

export function applyBoxAnimation(row, col, func, timeout, queue) {
  return (dispatch) => {
    createAction(dispatch, applyBox(row, col, func), timeout, queue);
  };
}

export function nullifyBoxAnimation(row, col, timeout, queue) {
  return (dispatch) => {
    addBoxClassAnimation(row, col, 'fade', timeout, queue)(dispatch);
    createAction(dispatch, nullifyBox(row, col), 0, queue);
  }
}

export function swapBoxesAnimation(pos1, pos2, timeout, queue) {
  return (dispatch) => {
    let action = swapBoxes(pos1, pos2);
    addBoxClassAnimation(pos1.row, pos1.col, 'selected', timeout, 'temp1')(dispatch);
    createAction(dispatch, action, timeout, queue);
    deleteBoxClassAnimation(pos2.row, pos2.col, 'selected', 0, queue)(dispatch);
  };
}