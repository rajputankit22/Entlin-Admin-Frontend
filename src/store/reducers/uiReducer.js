import {
  SWITCH_NAV_MAIN,
  SWITCH_NAV_STUDENT,
  SWITCH_NAV_MENTOR
} from "../actions/types";

const initialState = {
  nav: "main",
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SWITCH_NAV_MAIN:
      return {
        ...state,
        nav: "main",
      };
    case SWITCH_NAV_STUDENT:
      return {
        ...state,
        nav: "student",
      };
    case SWITCH_NAV_MENTOR:
      return {
        ...state,
        nav: "mentor",
      };
    default:
      return state;
  }
}
