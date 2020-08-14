import {
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  ADD_VIDEO,
  UPDATE_VIDEO,
  FETCH_ALL_VIDEOS,
  FETCH_VIDEO_BY_ID,
  UPLOAD_VIDEO,
  UNUPLOAD_VIDEO,
  PUBLISH_VIDEO,
  UNPUBLISH_VIDEO,
  DELETE_VIDEO,
  FETCH_EVENT_BY_ID
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Post a new video.
export const addVideo = (video) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/postVideo", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: video,
  })
    .then((response) => {
      dispatch({
        type: ADD_VIDEO,
        payload: response,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Video Successfully Added!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Fetch single video through videoId.
export const fetchVideoById = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/fetchVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_VIDEO_BY_ID,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Update video
export const updateVideo = (video, videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/updateVideo/" + videoId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: video,
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: UPDATE_VIDEO,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Video Successfully Updated!");
    })
    .catch((err) => {
      console.log(err.response);
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Fetch All videos as a list. 
export const fetchAllVideos = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/fetchAllVideos", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_VIDEOS,
        payload: response.data.videos,
      });
      dispatch({
        type: LOADED,
      });
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Upload a video
export const uploadVideo = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/uploadVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: UPLOAD_VIDEO,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllVideos());
      toast.success("Successfully Uploaded!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// UnUpload a video
export const unUploadVideo = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/unUploadVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: UNUPLOAD_VIDEO,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllVideos());
      toast.success("Successfully Unuploaded!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Publish a video
export const publishVideo = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/publishVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: PUBLISH_VIDEO,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllVideos());
      toast.success("Successfully Published!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// UnPublish a video
export const unPublishVideo = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/unPublishVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: UNPUBLISH_VIDEO,
        payload: response.data.video,
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllVideos());
      toast.success("Successfully UnPublished!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};

// Delete a video
export const deleteVideo = (videoId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/videos/deleteVideo/" + videoId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE_VIDEO,
        payload: response
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllVideos());
      toast.success("Successfully Deleted!");
    })
    .catch((err) => {
      dispatch({
        type: LOADED,
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED,
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map((msg) => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};
