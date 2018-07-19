import { createAction } from '../ActionQueue';

import { 
  SET_WINDOW_SIZE,
  LOAD_NEXT_LEVEL
} from '../actions';


export function setWindowSize(width, height) {
  return { type: SET_WINDOW_SIZE, instantiated: true, width, height };
}

export function loadNextLevel(timeout) {
  return (dispatch) => {
    createAction(dispatch, { type: LOAD_NEXT_LEVEL }, timeout);
  };
}
