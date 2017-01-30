/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import lessonReducer from './lessonReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  lesson: lessonReducer
});

export default rootReducer;
