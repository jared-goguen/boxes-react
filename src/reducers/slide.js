import {
  SET_SLIDE_NULL,
  RESET_SLIDE
} from '../actions';

import { 
  createReducer,
  forwardAction,
  combineStates
} from './utils';


let initialState = {
  nullPosition: {
    row: undefined,
    col: undefined
  }
};

let testState = {

}

initialState = combineStates(initialState, testState);

const handlers = {
  [SET_SLIDE_NULL]: (state, action) => {
    let { row, col } = action;
    return { nullPosition: { row, col } };
  },
  [RESET_SLIDE]: (state, action) => {
    return { nullPosition: { row: undefined, col: undefined } }
  }
};

export default createReducer(initialState, handlers);
