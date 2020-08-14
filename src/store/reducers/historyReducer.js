import { FETCH_BORROWER_HISTORY } from "../actions/types";

const initialState = {
  borrowerHistory: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_BORROWER_HISTORY:
      return {
        ...state,
        borrowerHistory: action.payload
      };
    default:
      return state;
  }
}
