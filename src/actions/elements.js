import { 
  SET_GRID_PADDING,
  TOGGLE_COLOR
} from '../actions';

export function setGridPadding(padding) {
  return { type: SET_GRID_PADDING, padding };
} 

export function toggleColor(color) {
  return { type: TOGGLE_COLOR, color };
}