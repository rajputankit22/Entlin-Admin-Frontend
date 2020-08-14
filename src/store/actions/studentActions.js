import {
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  UPDATE_STUDENT_PROFILE,
  FETCH_ALL_STUDENTS,
  FETCH_STUDENT_BY_ID
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Fetch student through studentId.
export const fetchStudentById = (studentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/students/fetchStudent/" + studentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_STUDENT_BY_ID,
        payload: response.data.student,
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

// Update student.
export const updateProfile = (student, studentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/students/updateProfile/" + studentId, {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: student,
  })
    .then((response) => {
      console.log("Student", response.data.student)
      dispatch({
        type: UPDATE_STUDENT_PROFILE,
        payload: response.data.student
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

// Fetch all students list.
export const fetchAllStudents = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/students/fetchAllStudents", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_STUDENTS,
        payload: response.data.students,
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
