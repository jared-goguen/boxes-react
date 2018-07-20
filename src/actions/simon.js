import { 
  RESET_SIMON,
  ADD_SIMON_CORRECT,
  INCREMENT_SIMON_TRIES,
  UPDATE_SIMON_USER,
  SET_SIMON_MAX
} from '../actions';

import {
  toggleBoxClassesAnimation,
  unselectSelected,
  hideAll,
  burnoutAll,
  pause
} from './elements';

import {
  loadNextLevel
} from './app';

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
    unselectSelected(0, undefined, queue)(dispatch);
    hideAll(timeout, undefined, queue)(dispatch);
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
    unselectSelected(0, undefined, queue)(dispatch);
    hideAll(timeout, undefined, queue)(dispatch);
  }
}

export function incrementTries() {
  return { type: INCREMENT_SIMON_TRIES };
}

export function updateUser(user) {
  return { type: UPDATE_SIMON_USER, user };
}

export function transition(timeoutReset, timeoutBurnoutStart, timeoutBurnoutStop, queue) {
  return (dispatch) => {
    dispatch(reset());
    unselectSelected(0, undefined, queue)(dispatch);
    hideAll(timeoutReset, undefined, queue)(dispatch);
    burnoutAll(timeoutBurnoutStart, timeoutBurnoutStop, queue)(dispatch);
    loadNextLevel(100)(dispatch);
  }
}

export function setMax(maxTries) {
  return { type: SET_SIMON_MAX, maxTries };
}