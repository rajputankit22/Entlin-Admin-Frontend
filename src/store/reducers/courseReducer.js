import {
  ADD_COURSE,
  UPDATE_COURSE,
  FETCH_ALL_COURSES,
  FETCH_COURSE_BY_ID,
  UPLOAD_COURSE,
  UNUPLOAD_COURSE,
  PUBLISH_COURSE,
  UNPUBLISH_COURSE,
  DELETE_COURSE
} from "../actions/types";

const initialState = {
  allCourses: [],
  course: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_COURSE:
      return {
        ...state
      };
    case UPDATE_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case UPLOAD_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case UNUPLOAD_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case PUBLISH_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case UNPUBLISH_COURSE:
      return {
        ...state,
        course: action.payload
      };
    case FETCH_ALL_COURSES:
      return {
        ...state,
        isLoading: false,
        allCourses: action.payload
      };
    case FETCH_COURSE_BY_ID:
      return {
        ...state,
        isLoading: false,
        course: action.payload
      };
    default:
      return state;
  }
}
