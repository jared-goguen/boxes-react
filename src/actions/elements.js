import { 
  SET_GRID_PADDING,
  TOGGLE_COLOR,
  REGISTER_BOXES,
  SHAKE_BOXES
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

export function shakeBoxes() {
  return dispatch => {
    dispatch({ type: SHAKE_BOXES, shake: true });
    setTimeout(() => {
      dispatch({ type: SHAKE_BOXES, shake: false });
    }, 500);
  }
}