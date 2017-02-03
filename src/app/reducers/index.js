/* eslint-disable */
import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import authReducer from './authReducer';
import userReducer from './userReducer';
import lessonReducer from './lessonReducer';
import lessonGroupReducer from './lessonGroupReducer';

const rootReducer = combineReducers({
  form,
  auth: authReducer,
  user: userReducer,
  lesson: lessonReducer,
  lessonGroups: lessonGroupReducer
});

export default rootReducer;
