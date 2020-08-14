import {
  ADD_ADMIN,
  FETCH_EMPLOYEE_BY_ID,
  FETCH_ALL_EMPLOYEES,
  UPDATE_EMPLOYEE_PROFILE
} from "../actions/types";

const initialState = {
  allEmployees: [],
  employee: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_ADMIN:
      return {
        ...state
      };
    case UPDATE_EMPLOYEE_PROFILE:
      return {
        ...state,
        employee: action.payload
      };

    case FETCH_ALL_EMPLOYEES:
      return {
        ...state,
        isLoading: false,
        allEmployees: action.payload
      };
    case FETCH_EMPLOYEE_BY_ID:
      console.log("Fetch Employee By Id", action.payload)
      return {
        ...state,
        isLoading: false,
        employee: action.payload
      };

    default:
      return state;
  }
}
