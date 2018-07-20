import React from 'react';

import { 
  SET_WINDOW_SIZE,
  LOAD_NEXT_LEVEL
} from '../actions';

import Main from '../levels/Main';
import Simon from '../levels/Simon';
import Memory from '../levels/Memory';

import { 
  createReducer,
  forwardAction
} from './utils';

let initialState = {
  width: undefined,
  height: undefined,
  instantiated: false,
  index: 0,
  levels: [<Main />, <Simon />, <Memory />]
};

const testState = {
  index: 0
}

initialState = Object.assign(initialState, testState || {});

const handlers = {
  [SET_WINDOW_SIZE]: forwardAction,
  [LOAD_NEXT_LEVEL]: (state, action) => {
    let index = (state.index + 1) % state.levels.length;
    return { index };
  }
};

export default createReducer(initialState, handlers);
