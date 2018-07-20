import { Grid, Box } from './grid';

import {
  RESET_SIMON,
  ADD_SIMON_CORRECT,
  INCREMENT_SIMON_TRIES,
  UPDATE_SIMON_USER
} from '../actions';

import { 
  createReducer,
  forwardAction,
  partialArrayMatch
} from './utils';

let initialState = {
  correct: [],
  user: [],
  tries: 0,
  maxTries: 3
};

const handlers = {
  [RESET_SIMON]: (state, action) => {
    return Object.assign({}, initialState);
  },
  [ADD_SIMON_CORRECT]: (state, action) => {
    let { row, col } = action;
    let correct = state.correct;
    correct.push({ row, col });
    return { correct };
  },
  [INCREMENT_SIMON_TRIES]: (state, action) => {
    let tries = state.tries + 1;
    return { tries };
  },
  [UPDATE_SIMON_USER]: forwardAction
};

export default createReducer(initialState, handlers);
