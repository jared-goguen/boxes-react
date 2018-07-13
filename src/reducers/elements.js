import { Grid, Box } from './grid';

import {
  SET_GRID_PADDING,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  DELETE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_ALL_CLASS,
  DELETE_ALL_CLASS,
  TOGGLE_ALL_CLASS,
  SET_SELECTED
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
  grid: new Grid(),
  padding: {
    left: 0,
    top: 0
  },
  actions: new ActionQueue(),
  colors: allColors,
  selected: []
};

const handlers = {
  [SET_GRID_PADDING]: forwardAction,
  [REGISTER_BOXES]: (state, action) => {
    const grid = state.grid.setBoxes(action.boxes);
    return { grid };
  },
  [ADD_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const grid = state.grid.addClass(row, col, name);
    return { grid };
  },
  [DELETE_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const grid = state.grid.deleteClass(row, col, name);
    return { grid };
  },
  [TOGGLE_BOX_CLASS]: (state, action) => {
    const { row, col, name } = action;
    const grid = state.grid.toggleClass(row, col, name);
    console.log(grid);
    return { grid };
  },
  [ADD_ALL_CLASS]: (state, action) => {
    const { name, condition } = action;
    const grid = state.grid.addAllClass(name, condition);
    return { grid };
  },
  [DELETE_ALL_CLASS]: (state, action) => {
    const { name, condition } = action;
    const grid = state.grid.deleteAllClass(name, condition);
    return { grid };
  },
  [TOGGLE_ALL_CLASS]: (state, action) => {
    const { name, condition } = action;
    const grid = state.grid.toggleAllClass(name, condition);
    return { grid };
  },
  [SET_SELECTED]: (state, action) => {
    const selected = [];
    for (let rowBoxes of state.grid.boxes) {
      for (let box of rowBoxes) {
        if (box.hasClass('selected')) {
          selected.push(box.color);
        }
      }
    }
    return { selected };
  }
};

export default createReducer(initialState, handlers);
