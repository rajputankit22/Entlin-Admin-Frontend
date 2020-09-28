import {
  DELETE_QUESTION,
  CLOSE_QUESTION,
  FETCH_ALL_QUESTIONS,
  FETCH_QUESTION_BY_ID,
  FETCH_STUDENT_QUESTION
} from "../actions/types";

const initialState = {
  allQuestions: [],
  question: {},
  answers: []
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CLOSE_QUESTION:
      return {
        ...state,
        question: action.payload.question,
        allQuestions: state.allQuestions.map(question => question._id === action.payload.question._id ? { ...question, ...action.payload.question } : question)
      };
    case DELETE_QUESTION:
      return {
        ...state,
        allQuestions: state.allQuestions.filter(question => question._id != action.payload.questionId)
      };
    case FETCH_ALL_QUESTIONS:
      return {
        ...state,
        isLoading: false,
        allQuestions: action.payload
      };
    case FETCH_STUDENT_QUESTION:
      return {
        ...state,
        isLoading: false,
        allQuestions: action.payload
      };
    case FETCH_QUESTION_BY_ID:
      return {
        ...state,
        isLoading: false,
        question: action.payload.question,
        answers: action.payload.answers
      };
    default:
      return state;
  }
}
