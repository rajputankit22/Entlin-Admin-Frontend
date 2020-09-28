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
        video: action.payload.video,
        allVideos: state.allVideos.map(video => video._id === action.payload.video._id ? { ...video, ...action.payload.video } : video)
      };
    case UNUPLOAD_VIDEO:
      return {
        ...state,
        video: action.payload.video,
        allVideos: state.allVideos.map(video => video._id === action.payload.video._id ? { ...video, ...action.payload.video } : video)
      };
    case PUBLISH_VIDEO:
      return {
        ...state,
        video: action.payload.video,
        allVideos: state.allVideos.map(video => video._id === action.payload.video._id ? { ...video, ...action.payload.video } : video)
      };
    case UNPUBLISH_VIDEO:
      return {
        ...state,
        video: action.payload.video,
        allVideos: state.allVideos.map(video => video._id === action.payload.video._id ? { ...video, ...action.payload.video } : video)
      };
    case FETCH_ALL_VIDEOS:
      return {
        ...state,
        isLoading: false,
        allVideos: action.payload
      };
    case DELETE_VIDEO:
      return {
        ...state,
        allVideos: state.allVideos.filter(video => video._id != action.payload.videoId)
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
