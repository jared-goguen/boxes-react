import {
  SET_GRID_PADDING,
  TOGGLE_COLOR
} from '../actions';

import { 
  createReducer,
  forwardAction
} from './utils';

const initialState = {
  boxes: [],
  colors: {
    '#eaff7b': false,
    '#00ffab': false,
    '#29bdc1': false,
    '#d84242': false,
    '#913f92': false
  },
  padding: {
    left: 0,
    top: 0
  }
};

const handlers = {
  [SET_GRID_PADDING]: forwardAction,
  [TOGGLE_COLOR]: (state, action) => {
    const { color } = action;
    const colors = Object.assign({}, state.colors);
    colors[color] = !colors[color];
    return { colors };
  }
};

export default createReducer(initialState, handlers);
