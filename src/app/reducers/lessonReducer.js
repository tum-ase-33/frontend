import {
  FETCH_LESSONS,
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_LESSONS:
      return { list: action.payload, ...state };
  }

  return state;
}
