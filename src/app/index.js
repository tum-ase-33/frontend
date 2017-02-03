import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import { Router, browserHistory } from 'react-router';
import reduxThunk from 'redux-thunk';
import { AUTH_USER, UNAUTH_USER } from './actions/types/index';
import { fetchLessons } from './actions/lessons';

import reducers from './reducers';
import routes from './routes';

import './components/bundle.scss';

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers, applyMiddleware(reduxThunk));


const user = JSON.parse(localStorage.getItem('user'));
console.log(user);

if (user && user.token) {
  store.dispatch({ type: AUTH_USER });
}
store.dispatch(fetchLessons()).then(() => {
  ReactDOM.render(
    <Provider store={store}>
      <Router onUpdate={() => window.scrollTo(0, 0)} history={browserHistory} routes={routes} />
    </Provider>
  , document.getElementById('react-root'));
});
