import {
  LOADING,
  LOADED,
  ADD_MENTOR,
  UPDATE_MENTOR_PROFILE,
  SESSION_EXPIRED,
  FETCH_ALL_MENTORS,
  FETCH_MENTOR_BY_ID,
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Add a new mentor
export const addMentor = (mentor) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/mentors/addMentor", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: mentor,
  })
    .then((response) => {
      dispatch({
        type: ADD_MENTOR,
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Mentor Successfully Added!");
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

// Fetch mentor through mentorId
export const fetchMentorById = (mentorId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/mentors/fetchMentor/" + mentorId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_MENTOR_BY_ID,
        payload: response.data.mentor,
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

// Update mentor
export const updateProfile = (mentor, mentorId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/mentors/updateProfile/" + mentorId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: mentor,
  })
    .then((response) => {
      dispatch({
        type: UPDATE_MENTOR_PROFILE,
        payload: response.data.mentor
      });
      dispatch({
        type: LOADED,
      });
      toast.success("Profile Successfully Updated!");
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

// Fetch all mentors list
export const fetchAllMentors = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/mentors/fetchAllMentors", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_MENTORS,
        payload: response.data.mentors,
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
