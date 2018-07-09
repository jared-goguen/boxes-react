import {
  SET_GRID_PADDING,
  TOGGLE_COLOR,
  REGISTER_BOXES,
  SHAKE_BOXES,
  FADE_BOXES
} from '../actions';

import { 
  createReducer,
  forwardAction,
} from './utils';

import { ActionQueue } from '../ActionQueue';


const allColors = [
  '#b31237',
  '#f03813',
  '#ff8826',
  '#ffb914',
  '#3be2a8',
  '#2c9fa3',
  '#913f92',
];


const initialState = {
  boxes: [],
  colors: allColors.reduce((o, c) => {o[c] = false; return o;}, {}),
  selected: [],
  padding: {
    left: 0,
    top: 0
  },
  actions: new ActionQueue(),
  shake: false,
  fade: false,
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
  [SHAKE_BOXES]: forwardAction,
  [FADE_BOXES]: forwardAction
};

export default createReducer(initialState, handlers);
