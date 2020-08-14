import { FETCH_HOME_DETAILS } from "../actions/types";

const initialState = {
  dashboardDetails: {},
};

export default function (state = initialState, action) {
  switch (action.type) {
    case FETCH_HOME_DETAILS:
      return {
        ...state,
        dashboardDetails: action.payload,
      };
    default:
      return state;
  }
}
