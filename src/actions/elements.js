import { Set } from 'immutable';

import { 
  SET_GRID_PADDING,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  REMOVE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  SHAKE_BOXES,
  FADE_BOXES,
  TRANSITION_TO_SIMON
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
  return { type: ADD_BOX_CLASS, row, col, name }
}

export function removeBoxClass(row, col, name) {
  return { type: REMOVE_BOX_CLASS, row, col, name }
}

export function toggleBoxClass(row, col, name) {
  return { type: TOGGLE_BOX_CLASS, row, col, name }
}

function createAnimation(type, property, timeoutStart, timeoutStop) {
  return () => {
    return (dispatch) => {
      const actionStart = { type, [property]: true };
      enqueueAction(dispatch, actionStart, timeoutStart);
      if (timeoutStop !== undefined) {
        const actionStop = { type, [property]: false };
        enqueueAction(dispatch, actionStop, timeoutStop);
      }
    }
  }
}

export const shakeBoxes = createAnimation(SHAKE_BOXES, 'shake', 1000, 100);

export const fadeBoxes = createAnimation(FADE_BOXES, 'fade', 1000);

const unselectedFade = shakeBoxes;
const selectedZoom = shakeBoxes;
const loadSimon = shakeBoxes;

export function transitionToSimon() {
    return (dispatch) => {
      unselectedFade()(dispatch);
      selectedZoom()(dispatch);
      loadSimon()(dispatch);
    }
}