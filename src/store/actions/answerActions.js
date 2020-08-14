import {
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  DELETE_ANSWER,
  FETCH_ALL_ANSWERS,
  FETCH_ANSWER_BY_ID,
  FETCH_STUDENT_ANSWERS
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Fetch single answer through answerId
export const fetchAnswerById = (answerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/answers/fetchAnswer/" + answerId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      console.log(response.data)
      dispatch({
        type: FETCH_ANSWER_BY_ID,
        payload: response.data,
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

// Fetch single student's answers through studentId
export const fetchSingleStudentAnswers = (studentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/answers/fetchSingleStudentAnswers/" + studentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_STUDENT_ANSWERS,
        payload: response.data.answers,
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

// Fetch single mentor's answers through mentorId
export const fetchSingleMentorAnswers = (mentorId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/answers/fetchSingleMentorAnswers/" + mentorId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_STUDENT_ANSWERS,
        payload: response.data.answers,
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

// Fetch All answers as a list
export const fetchAllAnswers = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/answers/fetchAllAnswers", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_ANSWERS,
        payload: response.data.answers,
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

// Delete One answer.
export const deleteAnswer = (answerId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/answers/deleteAnswer/" + answerId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE_ANSWER,
      });
      dispatch({
        type: LOADED,
      });
      dispatch(fetchAllAnswers());
      toast.success("Answer Successfully Deleted!");
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
