import {
  RESET_LIGHT,
  INITIALIZE_LIGHT,
  SET_TRACKER
} from '../actions';

import { 
  createReducer,
  forwardAction,
  combineStates
} from './utils';


let initialState = {
  tracker: undefined
};

let testState = {

}

initialState = combineStates(initialState, testState);

const handlers = {
  [RESET_LIGHT]: (state, action) => {
    return { tracker: undefined }
  },
  [INITIALIZE_LIGHT]: (state, action) => {
    let { index, N } = action; 

    let tracker = [];
    for (let row = 0; row < N; row++) {
      let newRow = [];
      tracker.push(newRow);
      for (let col = 0; col < N; col++) {
        newRow.push(index);
      }
    }

    console.log(index, N);
    console.log(tracker)
    return { tracker };
  },
  [SET_TRACKER]: forwardAction
};

export default createReducer(initialState, handlers);
