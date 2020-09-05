import {
  UPDATE_STUDENT_PROFILE,
  FETCH_ALL_STUDENTS,
  FETCH_STUDENT_BY_ID,
  RESET_PASSWORD,
  RESET_PASSWORD_FIELDS
} from "../actions/types";

const initialState = {
  allStudents: [],
  student: {},
  passwordResetSuccessMsg: "",
  restPasswordFields: true
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
    case RESET_PASSWORD:
      return {
        ...state,
        restPasswordFields: true,
        passwordResetSuccessMsg: action.payload
      };
    case RESET_PASSWORD_FIELDS:
      return {
        ...state,
        restPasswordFields: false
      };
    default:
      return state;
  }
}
