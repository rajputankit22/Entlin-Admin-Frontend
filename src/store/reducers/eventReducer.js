import {
  ADD_EVENT,
  UPDATE_EVENT,
  FETCH_ALL_EVENTS,
  FETCH_EVENT_BY_ID,
  DELETE_EVENT
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
    case DELETE_EVENT:
      return {
        ...state,
        allEvents: state.allEvents.filter(event => event._id != action.payload.eventId)
      };
    case FETCH_EVENT_BY_ID:
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
