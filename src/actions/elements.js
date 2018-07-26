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
  BLANK_ACTION,
  UPDATE_GRID,
  APPLY_BOX,
  NULLIFY_BOX,
  SWAP_BOXES
} from '../actions';


export function setGridDimensions(dimensions) {
  return { type: SET_GRID_DIMENSIONS, ...dimensions };
} 

export function registerBoxes(boxes) {
  return { type: REGISTER_BOXES, boxes };
}

export function addBoxClass(row, col, name) {
  return { type: ADD_BOX_CLASS, row, col, name };
}

export function deleteBoxClass(row, col, name) {
  return { type: DELETE_BOX_CLASS, row, col, name };
}

export function toggleBoxClass(row, col, name) {
  return { type: TOGGLE_BOX_CLASS, row, col, name };
}

export function addBoxClasses(row, col, names) {
  return { type: ADD_BOX_CLASSES, row, col, names };
}

export function deleteBoxClasses(row, col, names) {
  return { type: DELETE_BOX_CLASSES, row, col, names };
}

export function toggleBoxClasses(row, col, names) {
  return { type: TOGGLE_BOX_CLASSES, row, col, names };
}

export function addAllClass(name, condition) {
  return { type: ADD_ALL_CLASS, name, condition };
}

export function deleteAllClass(name, condition) {
  return { type: DELETE_ALL_CLASS, name, condition };
}

export function toggleAllClass(name, condition) {
  return { type: TOGGLE_ALL_CLASS, name, condition };
}

export function addAllClasses(names, condition) {
  return { type: ADD_ALL_CLASSES, names, condition };
}

export function deleteAllClasses(names, condition) {
  return { type: DELETE_ALL_CLASSES, names, condition };
}

export function toggleAllClasses(names, condition) {
  return { type: TOGGLE_ALL_CLASSES, names, condition };
}

export function shuffleGrid() {
  return { type: SHUFFLE_GRID };
}

export function blankAction() {
  return { type: BLANK_ACTION };
}

export function nullifyBox(row, col) {
  return { type: NULLIFY_BOX, row, col };
}

export function swapBoxes(pos1, pos2) {
  return { type: SWAP_BOXES, pos1, pos2 };
}

export function setSelected() {
  return { type: SET_SELECTED };
}

export function updateGrid(grid) {
  return { type: UPDATE_GRID, grid }
}

export function applyBox(row, col, func) {
  return { type: APPLY_BOX, row, col, func };
}
