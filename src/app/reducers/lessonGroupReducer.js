import {
  FETCH_LESSONS_GROUPS
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_LESSONS_GROUPS:
      return { list: action.payload, ...state,error: {} };
  }

  return state;
}
