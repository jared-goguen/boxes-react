import {
  SET_GRID_PADDING,
  TOGGLE_COLOR,
  REGISTER_BOXES,
  SHAKE_BOXES
} from '../actions';

import { 
  createReducer,
  forwardAction
} from './utils';



const initialState = {
  boxes: [],
  colors: {
    '#b31237': false,
    '#f03813': false,
    '#ff8826': false,
    '#ffb914': false,
    '#3be2a8': false,
    '#2c9fa3': false,
    '#913f92': false
  },
  selected: [],
  padding: {
    left: 0,
    top: 0
  },
  shake: false
};

const handlers = {
  [SET_GRID_PADDING]: forwardAction,
  [TOGGLE_COLOR]: (state, action) => {
    const { color } = action;
    const colors = Object.assign({}, state.colors);
    colors[color] = !colors[color];
    return { colors };
  },
  [REGISTER_BOXES]: forwardAction,
  [SHAKE_BOXES]: forwardAction
};

export default createReducer(initialState, handlers);
