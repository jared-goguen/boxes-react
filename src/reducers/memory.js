import { Set, Map } from 'immutable';

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
  createReducer,
  forwardAction
} from './utils';

let initialState = {
  tries: 0,
  maxTries: 3,
  user: new Set(),
  cleared: new Set()
};

let testState = {

}

initialState = Object.assign(initialState, testState || {});

const handlers = {
  [SET_MEMORY_MAX]: forwardAction,
  [TOGGLE_MEMORY_USER]: (state, action) => {
    let { row, col, color } = action;
    let box = Map({ row, col, color });
    let user;

    if (state.user.has(box)) {
      user = state.user.delete(box);
    } else {
      user = state.user.add(box);
    }
    return { user };
  },
  [CLEAR_MEMORY_USER]: (state, action) => {
    let color = state.user.toJS()[0].color;
    let cleared = state.cleared.add(color);
    let user = new Set();
    return { user, cleared };
  },
  [RESET_MEMORY_USER]: (state, action) => {
    return { user: new Set() };
  },
  [RESET_MEMORY_CLEARED]: (state, action) => {
    return { cleared: new Set() };
  },
  [INCREMENT_MEMORY_TRIES]: (state, action) => {
    let tries = state.tries + 1;
    return { tries };
  },
  [RESET_MEMORY_TRIES]: (state, action) => {
    return { tries: 0 };
  },
  [RESET_MEMORY]: (state, action) => {
    return { tries: 0, user: new Set(), cleared: new Set() };
  }
};

export default createReducer(initialState, handlers);
