import { generateActionCreator } from '../ActionQueue';

import { 
  SET_WINDOW_SIZE,
  LOAD_NEXT_SCREEN
} from '../actions';

const enqueueAction = generateActionCreator('elements');

export function setWindowSize(width, height) {
  return { type: SET_WINDOW_SIZE, instantiated: true, width, height };
}

export function loadNextScreen(dispatch) {
  enqueueAction(dispatch, { type: LOAD_NEXT_SCREEN }, 100);  
}
