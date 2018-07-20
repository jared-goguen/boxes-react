import { 
  RESET_SIMON,
  ADD_SIMON_CORRECT,
  INCREMENT_SIMON_TRIES,
  UPDATE_SIMON_USER
} from '../actions';

import {
  toggleBoxClassesAnimation,
  unselectSelected,
  hideAll
} from './elements';

import { createAction } from '../ActionQueue';


export function reset() {
  return { type: RESET_SIMON };
}

export function addCorrect(row, col) {
  return { type: ADD_SIMON_CORRECT, row, col}
}

export function enqueueReset(timeout, queue) {
  return (dispatch) => {
    createAction(dispatch, reset(), timeout, queue);
  };
}

export function resetAnimation(timeout, queue) {
  return (dispatch) => {
    unselectSelected(timeout, undefined, queue)(dispatch);
    hideAll(0, undefined, queue)(dispatch);
    dispatch(updateUser([]));
  };
}

export function addCorrectAnimation(row, col, timeout, queue) {
  return (dispatch) => {
    toggleBoxClassesAnimation(row, col, ['selected', 'hidden'], timeout, queue)(dispatch);
    createAction(dispatch, addCorrect(row, col), 0, queue);
  };
}

export function redisplayCorrect(correct, timeout, queue) {
  return (dispatch) => {
    for (let { row, col } of correct) {
      toggleBoxClassesAnimation(row, col, ['selected', 'hidden'], timeout, queue)(dispatch);
    }
    unselectSelected(timeout, undefined, queue)(dispatch);
    hideAll(timeout, undefined, queue)(dispatch);
  }
}

export function incrementTries() {
  return { type: INCREMENT_SIMON_TRIES };
}

export function updateUser(user) {
  return { type: UPDATE_SIMON_USER, user };
}