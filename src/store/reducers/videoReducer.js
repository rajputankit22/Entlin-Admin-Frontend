import {
  ADD_VIDEO,
  UPDATE_VIDEO,
  FETCH_ALL_VIDEOS,
  FETCH_VIDEO_BY_ID,
  UPLOAD_VIDEO,
  UNUPLOAD_VIDEO,
  PUBLISH_VIDEO,
  UNPUBLISH_VIDEO,
  DELETE_VIDEO
} from "../actions/types";

const initialState = {
  allVideos: [],
  video: {}
};

export default function (state = initialState, action) {
  switch (action.type) {
    case ADD_VIDEO:
      return {
        ...state
      };
    case UPDATE_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case UPLOAD_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case UNUPLOAD_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case PUBLISH_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case UNPUBLISH_VIDEO:
      return {
        ...state,
        video: action.payload
      };
    case FETCH_ALL_VIDEOS:
      return {
        ...state,
        isLoading: false,
        allVideos: action.payload
      };
    case FETCH_VIDEO_BY_ID:
      return {
        ...state,
        isLoading: false,
        video: action.payload
      };
    default:
      return state;
  }
}
