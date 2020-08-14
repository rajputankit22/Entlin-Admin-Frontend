import {
  ADD_MENTOR,
  FETCH_MENTOR_BY_ID,
  FETCH_ALL_MENTORS,
  UPDATE_MENTOR_PROFILE
} from "../actions/types";

const initialState = {
  allMentors: [],
  mentor: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_MENTOR:
      return {
        ...state
      };
    case UPDATE_MENTOR_PROFILE:
      return {
        ...state,
        mentor: action.payload
      };

    case FETCH_ALL_MENTORS:
      return {
        ...state,
        isLoading: false,
        allMentors: action.payload
      };
    case FETCH_MENTOR_BY_ID:
      return {
        ...state,
        isLoading: false,
        mentor: action.payload
      };

    default:
      return state;
  }
}
