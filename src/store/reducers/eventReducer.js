import {
  ADD_EVENT,
  UPDATE_EVENT,
  FETCH_ALL_EVENTS,
  FETCH_EVENT_BY_ID
} from "../actions/types";

const initialState = {
  allEvents: [],
  event: {},
  registrations: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_EVENT:
      return {
        ...state
      };
    case UPDATE_EVENT:
      return {
        ...state,
        event: action.payload
      };

    case FETCH_ALL_EVENTS:
      return {
        ...state,
        isLoading: false,
        allEvents: action.payload
      };
    case FETCH_EVENT_BY_ID:
      console.log(action.payload)
      console.log(action.payload)
      return {
        ...state,
        isLoading: false,
        event: action.payload.event,
        registrations: action.payload.registrations
      };

    default:
      return state;
  }
}
