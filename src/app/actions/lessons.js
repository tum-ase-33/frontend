import axios from 'axios';
import { API_URL } from '../config';
import {
  FETCH_LESSONS,
} from './types/index';

/**
 * Fetch all users
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
