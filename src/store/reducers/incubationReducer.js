import {
  DELETE_INCUBATION,
  UPDATE_INCUBATION,
  FETCH_ALL_INCUBATIONS,
  FETCH_INCUBATION_BY_ID
} from "../actions/types";

const initialState = {
  allIncubations: [],
  incubation: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case UPDATE_INCUBATION:
      return {
        ...state,
        incubation: action.payload
      };
    case FETCH_ALL_INCUBATIONS:
      return {
        ...state,
        isLoading: false,
        allIncubations: action.payload
      };
    case DELETE_INCUBATION:
      return {
        ...state,
        allIncubations: state.allIncubations.filter(incubation => incubation._id != action.payload.incubationId)
      };
    case FETCH_INCUBATION_BY_ID:
      return {
        ...state,
        isLoading: false,
        incubation: action.payload
      };
    default:
      return state;
  }
}
