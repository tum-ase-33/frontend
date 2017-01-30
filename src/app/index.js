import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER } from './actions/types/index';

import reducers from './reducers';
import routes from './routes';

import './components/bundle.scss';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancers(applyMiddleware(reduxThunk))
);

const user = JSON.parse(localStorage.getItem('user'));

if (user && user.token) {
  store.dispatch({ type: AUTH_USER });
}

ReactDOM.render(
  <Provider store={store}>
    <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
  </Provider>
  , document.getElementById('react-root'));
