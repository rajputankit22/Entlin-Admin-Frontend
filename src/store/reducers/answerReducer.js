import {
  DELETE_ANSWER,
  FETCH_ALL_ANSWERS,
  FETCH_ANSWER_BY_ID,
  FETCH_STUDENT_ANSWERS
} from "../actions/types";

const initialState = {
  allAnswers: [],
  answer: {},
  answers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case DELETE_ANSWER:
      return {
        ...state,
        allAnswers: state.allAnswers.filter(answer => answer._id != action.payload.answerId)
      };
    case FETCH_ALL_ANSWERS:
      return {
        ...state,
        isLoading: false,
        allAnswers: action.payload
      };
    case FETCH_STUDENT_ANSWERS:
      return {
        ...state,
        isLoading: false,
        allAnswers: action.payload
      };
    case FETCH_ANSWER_BY_ID:
      return {
        ...state,
        isLoading: false,
        answer: action.payload.answer,
        answers: action.payload.answers
      };
    default:
      return state;
  }
}
