import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from './types/index';
/**
 * Error helper
 */
export function authError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}

/**
 * Sign up
 */
export function signupUser(props) {
  return function (dispatch) {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    axios.post(`${API_URL}/users`, props, config)
      .then((response) => {
        console.log(response);
        dispatch({ type: SIGNUP_SUCCESS });

        browserHistory.push('/signin');
      })
      .catch(response => dispatch(authError(SIGNUP_FAILURE, response.data.error)));
  }
}

/**
 * Sign in
 */
export function signinUser(props) {
  const { email, password } = props;

  return function (dispatch) {
    const config = {
      headers: {
        Accept: 'application/json',
      },
    };
    axios.post(`${API_URL}/auth/local`, { email, password }, config)
      .then((response) => {
        localStorage.setItem('user', JSON.stringify(response.data));

        dispatch({ type: AUTH_USER });

        browserHistory.push('/lessons');
      })
      .catch(() => dispatch(authError(SIGNIN_FAILURE, "Email or password isn't right")));
  }
}
/**
 * Sign out
 */
export function signoutUser() {
  localStorage.clear();

  return {
    type: UNAUTH_USER,
  }
}
