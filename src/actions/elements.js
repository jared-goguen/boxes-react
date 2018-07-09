import { 
  SET_GRID_PADDING,
  TOGGLE_COLOR,
  REGISTER_BOXES,
  SHAKE_BOXES,
  FADE_BOXES,
  TRANSITION_TO_SIMON
} from '../actions';

import { generateActionCreator } from '../ActionQueue';

const enqueueAction = generateActionCreator('elements');

export function setGridPadding(padding) {
  return { type: SET_GRID_PADDING, padding };
} 

export function toggleColor(color) {
  return { type: TOGGLE_COLOR, color };
}

export function registerBoxes(boxes) {
  return { type: REGISTER_BOXES, boxes };
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