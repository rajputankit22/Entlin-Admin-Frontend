import {
  FETCH_ALL_SUBSCRIPTIONS,
  CREATE_SUBSCRIPTION,
  FETCH_SUBSCRIPTIONS_BY_ID,
  FETCH_STUDENT_SUBSCRIPTIONS,
  PAYMENT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from "../actions/types";

const initialState = {
  allSubscriptions: [],
  subscription: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case CREATE_SUBSCRIPTION:
      return {
        ...state,
        allSubscriptions: [...state.allSubscriptions, action.payload.subscription]
      };
    case DELETE_SUBSCRIPTION:
      return {
        ...state,
        allSubscriptions: state.allSubscriptions.filter(subscription => subscription._id != action.payload.subscriptionId)
      };
    case FETCH_ALL_SUBSCRIPTIONS:
      return {
        ...state,
        isLoading: false,
        allSubscriptions: action.payload.subscriptions
      };
    case FETCH_STUDENT_SUBSCRIPTIONS:
      return {
        ...state,
        isLoading: false,
        allSubscriptions: action.payload.subscriptions
      };
    case FETCH_SUBSCRIPTIONS_BY_ID:
      return {
        ...state,
        isLoading: false,
        subscription: action.payload.subscription
      };
    case PAYMENT_SUBSCRIPTION:
      return {
        ...state,
        allSubscriptions: state.allSubscriptions.map(subscription => subscription._id === action.payload.subscription._id ? { ...subscription, ...action.payload.subscription } : subscription)

      };
    default:
      return state;
  }
}
