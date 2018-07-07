import { 
  SET_WINDOW_SIZE 
} from '../actions';

export function setWindowSize(width, height) {
  return { type: SET_WINDOW_SIZE, instantiated: true, width, height };
} 