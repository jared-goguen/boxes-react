import { 
  SET_WINDOW_SIZE
} from '../actions';

import { 
  createReducer,
  reduceAction
} from './utils';

const initialState = {
  width: undefined,
  height: undefined,
  instantiated: false,
};

const handlers = {
  [SET_WINDOW_SIZE]: (state, action) => reduceAction(action)
};

export default createReducer(initialState, handlers);
