import 'babel-polyfill';

import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { aque } from './ActionQueue';
import reducers from './reducers';


import { Provider } from 'react-redux';
import App from './App';


const store = createStore(reducers, applyMiddleware(aque));

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
