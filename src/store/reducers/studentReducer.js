import {
  UPDATE_STUDENT_PROFILE,
  FETCH_ALL_STUDENTS,
  FETCH_STUDENT_BY_ID
} from "../actions/types";

const initialState = {
  allStudents: [],
  student: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_STUDENT_PROFILE:
      return {
        ...state,
        student: action.payload
      };
    case FETCH_ALL_STUDENTS:
      return {
        ...state,
        isLoading: false,
        allStudents: action.payload
      };
    case FETCH_STUDENT_BY_ID:
      return {
        ...state,
        isLoading: false,
        student: action.payload
      };
    default:
      return state;
  }
}
