import { 
  SET_GRID_PADDING,
  TOGGLE_COLOR,
  REGISTER_BOXES,
  SHAKE_BOXES,
  FADE_BOXES
} from '../actions';

export function setGridPadding(padding) {
  return { type: SET_GRID_PADDING, padding };
} 

export function toggleColor(color) {
  return { type: TOGGLE_COLOR, color };
}

export function registerBoxes(boxes) {
  return { type: REGISTER_BOXES, boxes };
}

function animation(type, property, timeout) {
  return () => {
    return dispatch => {
      dispatch({ type, [property]: true });
      if (timeout) {
        setTimeout(() => {
          dispatch({ type, [property]: false });
        }, timeout);
      }
    }
  }
}

export const shakeBoxes = animation(SHAKE_BOXES, 'shake', 500);

export const fadeBoxes = animation(FADE_BOXES, 'fade');