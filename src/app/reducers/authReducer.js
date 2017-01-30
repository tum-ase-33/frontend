import {
  SIGNUP_SUCCESS,
  SIGNUP_FAILURE,
  SIGNIN_FAILURE,
  AUTH_USER,
  UNAUTH_USER,
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case SIGNUP_SUCCESS:
      return { ...state, signup: true, error: {} };
    case SIGNUP_FAILURE:
      return { ...state, signup: false, error: { signup: action.payload } };
    case SIGNIN_FAILURE:
      return { ...state, error: { signin: action.payload } };
    case AUTH_USER:
      return { ...state, authenticated: true, error: {} };
    case UNAUTH_USER:
      return { ...state, authenticated: false, error: {} };
  }

  return state;
}
