import { 
  SET_WINDOW_SIZE
} from '../actions';

import { 
  createReducer,
  forwardAction
} from './utils';

const initialState = {
  width: undefined,
  height: undefined,
  instantiated: false,
};

const handlers = {
  [SET_WINDOW_SIZE]: forwardAction
};

export default createReducer(initialState, handlers);
