import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';
import App from './components/App';
import './styles/index.scss';

const store = createStore(reducers);

const app = (
  <Provider store={store}>
    <App />
  </Provider>
);

ReactDOM.render(app, document.getElementById('app'));
