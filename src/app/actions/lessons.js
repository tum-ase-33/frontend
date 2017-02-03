import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  FETCH_LESSONS, CREATE_LESSON_SUCCESS, CREATE_LESSON_FAILURE,
  EDIT_LESSON_SUCCESS, EDIT_LESSON_FAILURE,
} from './types/index';
/**
 * Error helper
 */
export function lessonError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}
/**
 * Fetch all lesson
 */
export function fetchLessons() {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(`${API_URL}/lessons`, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_LESSONS,
          payload: response.data,
        });
      });
  }
}
/**
 * Create Lesson
 */
export function createLesson(props) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(props);
  return function (dispatch) {
    axios.post(`${API_URL}/lessons`, props, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: CREATE_LESSON_SUCCESS,
          payload: response.data,
        });
        browserHistory.push('/lessons');
      }).catch(response => dispatch(lessonError(CREATE_LESSON_FAILURE, response.data.error)));
  }
}
/**
 * Create Lesson
 */
export function editLesson(_id, props) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(props);
  return function (dispatch) {
    axios.patch(`${API_URL}/lessons/${_id}`, props, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: EDIT_LESSON_SUCCESS,
          payload: response.data,
        });
        browserHistory.push('/lessons');
      }).catch(response => dispatch(lessonError(EDIT_LESSON_FAILURE, response.data.error)));
  }
}
