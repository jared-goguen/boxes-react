import { combineReducers } from 'redux';

import app from './app';
import elements from './elements';

export default combineReducers({
  app,
  elements
});
