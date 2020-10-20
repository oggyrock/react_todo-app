import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, combineReducers } from 'redux';
import './styles/index.css';
import './styles/todo-list.css';
import './styles/filters.css';
import App from './App';
import { todoReducer } from './store';

export const rootReducer = combineReducers({ todoReducer });
export const store = createStore(rootReducer);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
