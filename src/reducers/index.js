import { combineReducers } from 'redux';
import { queueReducer } from '../ActionQueue';

import app from './app';
import elements from './elements';
import simon from './simon';
import memory from './memory';
import slide from './slide';


export default combineReducers({
  queueReducer,
  app,
  elements,
  simon,
  memory,
  slide
});
