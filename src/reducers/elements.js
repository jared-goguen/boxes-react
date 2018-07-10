import { Set } from 'immutable';

import {
  SET_GRID_PADDING,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  REMOVE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
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
  boxes: [[]],
  boxClasses: [[[new Set()]]],
  padding: {
    left: 0,
    top: 0
  },
  actions: new ActionQueue(),
  colors: allColors
};

const handlers = {
  [SET_GRID_PADDING]: forwardAction,
  [REGISTER_BOXES]: forwardAction,
  [ADD_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const classNames = state.boxClasses[row][col];
    if (!classNames.has(name)) {
      const boxClasses = state.boxClasses.map(row => row.slice());
      boxClasses[row][col] = classNames.add(name)
      return { boxClasses }
    }
  },
  [REMOVE_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const classNames = state.boxClasses[row][col];
    if (classNames.has(name)) {
      const boxClasses = state.boxClasses.map(row => row.slice());
      boxClasses[row][col] = classNames.delete(name)
      return { boxClasses }
    }
  },
  [TOGGLE_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const classNames = state.boxClasses[row][col];
    const boxClasses = state.boxClasses.map(row => row.slice());
    if (classNames.has(name)) {
      boxClasses[row][col] = classNames.delete(name)
    } else {
      boxClasses[row][col] = classNames.add(name)
    }
    return { boxClasses }
  },
  [SHAKE_BOXES]: forwardAction,
  [FADE_BOXES]: forwardAction
};

export default createReducer(initialState, handlers);
