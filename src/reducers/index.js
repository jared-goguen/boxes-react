import { combineReducers } from 'redux';
import { queueReducer } from '../ActionQueue';


import app from './app';
import elements from './elements';

export default combineReducers({
  app,
  elements,
  queueReducer
});
