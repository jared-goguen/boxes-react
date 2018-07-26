import { Grid, Box } from './grid';

import {
  SET_GRID_DIMENSIONS,
  REGISTER_BOXES,
  ADD_BOX_CLASS,
  DELETE_BOX_CLASS,
  TOGGLE_BOX_CLASS,
  ADD_BOX_CLASSES,
  DELETE_BOX_CLASSES,
  TOGGLE_BOX_CLASSES,
  ADD_ALL_CLASS,
  DELETE_ALL_CLASS,
  TOGGLE_ALL_CLASS,
  ADD_ALL_CLASSES,
  DELETE_ALL_CLASSES,
  TOGGLE_ALL_CLASSES,
  SET_SELECTED,
  SHUFFLE_GRID,
  UPDATE_GRID,
  APPLY_BOX,
  NULLIFY_BOX,
  SWAP_BOXES,
  SET_BOX_COLOR
} from '../actions';

import { 
  createReducer,
  forwardAction
} from './utils';

const allColors = [
  '#b31237',
  '#f03813',
  '#ff8826',
  '#ffb914',
  '#3be2a8',
  '#2c9fa3',
  '#913f92',
];

let initialState = {
  grid: new Grid(),
  padding: {
    left: 0,
    top: 0
  },
  side: 0,
  colors: allColors,
  selected: []
};

const testState = {
  selected: [
    '#ff8826',
    '#ffb914',
    '#3be2a8',
    '#2c9fa3'
  ]
}

initialState = Object.assign(initialState, testState || {});

const handlers = {
  [SET_GRID_DIMENSIONS]: forwardAction,
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
    return { grid };
  },
  [ADD_BOX_CLASSES]: (state, action) => {
    const { row, col, names } = action;
    const grid = state.grid.addClasses(row, col, names);
    return { grid };
  },
  [DELETE_BOX_CLASSES]: (state, action) => {
    const { row, col, names } = action;
    const grid = state.grid.deleteClasses(row, col, names);
    return { grid };
  },
  [TOGGLE_BOX_CLASSES]: (state, action) => {
    const { row, col, names } = action;
    const grid = state.grid.toggleClasses(row, col, names);
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
  [ADD_ALL_CLASSES]: (state, action) => {
    const { names, condition } = action;
    const grid = state.grid.addAllClasses(names, condition);
    return { grid };
  },
  [DELETE_ALL_CLASSES]: (state, action) => {
    const { names, condition } = action;
    const grid = state.grid.deleteAllClasses(names, condition);
    return { grid };
  },
  [TOGGLE_ALL_CLASSES]: (state, action) => {
    const { names, condition } = action;
    const grid = state.grid.toggleAllClasses(names, condition);
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
  },
  [SHUFFLE_GRID]: (state, action) => {
    let grid = state.grid.shuffle();
    return { grid };
  },
  [UPDATE_GRID]: forwardAction,
  [APPLY_BOX]: (state, action) => {
    let { row, col, func, condition } = action;
    let grid = state.grid.apply(row, col, func, condition);
    return { grid };
  },
  [NULLIFY_BOX]: (state, action) => {
    let { row, col } = action;
    let grid = state.grid.nullifyBox(row, col);
    return { grid };
  },
  [SWAP_BOXES]: (state, action) => {
    let { pos1, pos2 } = action;
    let grid = state.grid.swapBoxes(pos1, pos2);
    return { grid };
  },
  [SET_BOX_COLOR]: (state, action) => {
    let { row, col, color } = action;
    let grid = state.grid.setBoxColor(row, col, color);
    return { grid };
  }
};

export default createReducer(initialState, handlers);
