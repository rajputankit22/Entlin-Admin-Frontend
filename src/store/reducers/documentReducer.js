import {
  ADD_DOCUMENT,
  UPDATE_DOCUMENT,
  FETCH_ALL_DOCUMENTS,
  FETCH_DOCUMENT_BY_ID,
  PUBLISH_DOCUMENT,
  UNPUBLISH_DOCUMENT,
  DELETE_DOCUMENT
} from "../actions/types";

const initialState = {
  allDocuments: [],
  document: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_DOCUMENT:
      return {
        ...state
      };
    case UPDATE_DOCUMENT:
      return {
        ...state,
        document: action.payload
      };
    case PUBLISH_DOCUMENT:
      return {
        ...state,
        document: action.payload.document,
        allDocuments: state.allDocuments.map(document => document._id === action.payload.document._id ? { ...document, ...action.payload.document } : document)
      };
    case UNPUBLISH_DOCUMENT:
      return {
        ...state,
        document: action.payload.document,
        allDocuments: state.allDocuments.map(document => document._id === action.payload.document._id ? { ...document, ...action.payload.document } : document)
      };
    case FETCH_ALL_DOCUMENTS:
      return {
        ...state,
        isLoading: false,
        allDocuments: action.payload
      };
    case DELETE_DOCUMENT:
      return {
        ...state,
        allDocuments: state.allDocuments.filter(document => document._id != action.payload.documentId)
      };
    case FETCH_DOCUMENT_BY_ID:
      return {
        ...state,
        isLoading: false,
        document: action.payload
      };
    default:
      return state;
  }
}
