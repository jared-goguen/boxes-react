import React from 'react';

import { 
  SET_WINDOW_SIZE,
  LOAD_NEXT_SCREEN
} from '../actions';

import Main from '../screens/Main';
import Simon from '../screens/Simon';

import { 
  createReducer,
  forwardAction
} from './utils';

const initialState = {
  width: undefined,
  height: undefined,
  instantiated: false,
  index: 0,
  screens: [<Main />, <Simon />]
};

const handlers = {
  [SET_WINDOW_SIZE]: forwardAction,
  [LOAD_NEXT_SCREEN]: (state, action) => {
    let index = (state.index + 1) % state.screens.length;
    return { index };
  }
};

export default createReducer(initialState, handlers);
