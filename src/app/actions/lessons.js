import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  FETCH_LESSONS, CREATE_LESSON_SUCCESS, CREATE_LESSON_FAILURE,
  EDIT_LESSON_SUCCESS, EDIT_LESSON_FAILURE, FETCH_LESSONS_GROUPS, UNAUTH_USER,
  DELETE_LESSON_SUCCESS, DELETE_LESSON_FAILURE,
  CREATE_LESSON_GROUP_SUCCESS, CREATE_LESSON_GROUP_FAILURE,
  SET_DATE_LESSON_GROUP_FAILURE, SET_DATE_LESSON_GROUP_SUCCESS,
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
    axios.get(`${API_URL}/lessons?$limit=100`, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response.data.data);
        dispatch({
          type: FETCH_LESSONS,
          payload: response.data.data,
        });
      }).catch(response => dispatch({ type: UNAUTH_USER }));
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
 * Delete Lesson
 */
export function deleteLesson(lessonId) {
  const user = JSON.parse(localStorage.getItem('user'));
  return function (dispatch) {
    axios.delete(`${API_URL}/lessons/${lessonId}`,  { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: DELETE_LESSON_SUCCESS,
          payload: response.data,
        });
        browserHistory.push('/lessons');
      }).catch(response => dispatch(lessonError(DELETE_LESSON_FAILURE, response.data.error)));
  }
}
/**
 * Update Lesson
 */
export function editLesson(lesson) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log(lesson);
  return function (dispatch) {
    axios.patch(`${API_URL}/lessons/${lesson._id}`, lesson, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: EDIT_LESSON_SUCCESS,
          payload: response.data,
        });
        browserHistory.push(`/lessons/${lesson._id}`);
      }).catch(response => dispatch(lessonError(EDIT_LESSON_FAILURE, response.data.error)));
  }
}
export function fetchLessonGroups(lessonId) {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(`${API_URL}/lesson-groups?lessonId=${lessonId}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response.data.data);
        dispatch({
          type: FETCH_LESSONS_GROUPS,
          payload: response.data.data,
        });
      });
  }
}
/**
 * Create Lesson Groups
 */
export function createLessonGroup(props, lessonId) {
  const user = JSON.parse(localStorage.getItem('user'));
  console.log("clg");
  console.log(props);
  console.log(lessonId);
  const data = {
      name: props.name,
      lessonId: lessonId,
      dates: props.dates,
  };

  return function (dispatch) {
    axios.post(`${API_URL}/lesson-groups`, data, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: CREATE_LESSON_GROUP_SUCCESS,
          payload: response.data,
        });
        browserHistory.push(`/lessons/${lessonId}`);
      }).catch(response => dispatch(lessonError(CREATE_LESSON_GROUP_FAILURE, response.data.error)));
  }
}
