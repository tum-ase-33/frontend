import axios from 'axios';
import { browserHistory } from 'react-router';
import { API_URL } from '../config';
import {
  FETCH_LESSONS_GROUPS
} from './types/index';
/**
 * Error helper
 */
export function lessonGroupError(CONST, error) {
  return {
    type: CONST,
    payload: error,
  };
}
/**
 * Fetch all lesson
 */
export function fetchLessonGroups(lessonId) {
  const user = JSON.parse(localStorage.getItem('user'));

  return function (dispatch) {
    axios.get(`${API_URL}/lesson-groups?lessonId=${lessonId}`, { headers: { Accept: 'application/json', Authorization: `Bearer ${user.token}` } })
      .then((response) => {
        console.log(response);
        dispatch({
          type: FETCH_LESSONS_GROUPS,
          payload: response.data,
        });
      });
  }
}
