import { combineReducers } from 'redux';
import { queueReducer } from '../ActionQueue';

import app from './app';
import elements from './elements';
import simon from './simon';

export default combineReducers({
  app,
  elements,
  simon,
  queueReducer
});
