import 'babel-polyfill';

import './styles/index.scss';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { aque, bindProcessing } from './ActionQueue';
import reducers from './reducers';


import { Provider } from 'react-redux';
import App from './App';


const store = createStore(reducers, applyMiddleware(aque));
bindProcessing(store);

if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  window.store = store;
}

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
