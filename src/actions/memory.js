import { 
  SET_MEMORY_MAX,
  TOGGLE_MEMORY_USER,
  CLEAR_MEMORY_USER,
  RESET_MEMORY_USER,
  RESET_MEMORY_CLEARED,
  INCREMENT_MEMORY_TRIES,
  RESET_MEMORY_TRIES,
  RESET_MEMORY
} from '../actions';

import {
  fadeSelected,
  shakeUnselected,
  unselectSelected,
  hideAll,
  unfadeFaded, 
  pause
} from './animations';

import {
  loadNextLevel
} from './app';

import { createAction } from '../ActionQueue';

export function setMax(maxTries) {
  return { type: SET_MEMORY_MAX, maxTries };
}

export function toggleUser(row, col, color) {
  return { type: TOGGLE_MEMORY_USER, row, col, color };
}

export function clearUser() {
  return { type: CLEAR_MEMORY_USER };
}

export function resetUser() {
  return { type: RESET_MEMORY_USER };
}

export function resetCleared() {
  return { type: RESET_MEMORY_CLEARED };
}

export function clearUserAnimation(timeout, queue) {
  return (dispatch) => {
    fadeSelected(timeout, undefined, queue)(dispatch);
    dispatch(clearUser());
  }
}

export function resetUserAnimation(timeoutStart, timeoutShakeStop, timeoutReset, queue) {
  return (dispatch) => {
    shakeUnselected(timeoutStart, timeoutShakeStop, queue)(dispatch);  
    unselectSelected(0, undefined, 'temp1')(dispatch);
    hideAll(timeoutStart, undefined, 'temp1')(dispatch);
    dispatch(resetUser());
  }
}

export function resetClearedAnimation(timeout, faded=true, queue) {
  return (dispatch) => {
    if (faded) { 
      unfadeFaded(timeout, undefined, queue)(dispatch);  
    }
    dispatch(resetCleared());
  }
}

export function incrementTries() {
  return { type: INCREMENT_MEMORY_TRIES };
}

export function resetTries() {
  return { type: RESET_MEMORY_TRIES };  
}

export function reset() {
  return { type: RESET_MEMORY };
}

export function transition(timeout, queue) {
  return (dispatch) => {
    dispatch(reset());
    pause(timeout)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}
