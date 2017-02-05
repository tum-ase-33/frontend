import {
  FETCH_LESSONS, CREATE_LESSON_SUCCESS, CREATE_LESSON_FAILURE,
  EDIT_LESSON_SUCCESS, EDIT_LESSON_FAILURE, FETCH_LESSONS_GROUPS,
  DELETE_LESSON_SUCCESS, DELETE_LESSON_FAILURE
} from '../actions/types/index';

export default function(state = {}, action) {
  switch(action.type) {
    case FETCH_LESSONS:
      return { list: action.payload, ...state,error: {} };
    case CREATE_LESSON_SUCCESS:
    	return {newLesson: action.payload, ...state,error: {}};
    case CREATE_LESSON_FAILURE:
    	return { ...state,error: { lesson: action.payload }};
    case EDIT_LESSON_SUCCESS:
    	return {newLesson: action.payload, ...state,error: {}};
    case EDIT_LESSON_FAILURE:
    	return { ...state,error: { lesson: action.payload }};
    case FETCH_LESSONS_GROUPS:
      return { groupList: action.payload, ...state,error: {} };
    case DELETE_LESSON_SUCCESS:
      return {newLesson: action.payload, ...state,error: {}};
    case DELETE_LESSON_FAILURE:
      return { ...state,error: { lesson: action.payload }};
  }

  return state;
}
