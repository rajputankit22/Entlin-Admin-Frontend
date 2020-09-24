import {
  LOADING,
  LOADED,
  SESSION_EXPIRED,
  FETCH_ALL_SUBSCRIPTIONS,
  CREATE_SUBSCRIPTION,
  FETCH_SUBSCRIPTIONS_BY_ID,
  FETCH_STUDENT_SUBSCRIPTIONS,
  PAYMENT_SUBSCRIPTION,
  DELETE_SUBSCRIPTION
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

// Create Subscription.
export const createSubscription = (subscriptionType, studentId) => (dispatch) => {
  axios(config.DOMAIN + "/subscriptions/createSubscription", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
    data: {
      "studentId": studentId,
      "subscriptionType": subscriptionType
    },
  })
    .then((response) => {
      dispatch({
        type: CREATE_SUBSCRIPTION,
        payload: response.data,
      });
      toast.success("Subscription Successfully Created!");
    })
    .catch((err) => {
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

// Fetch single subscription through subscriptionId
export const fetchSubscriptionById = (subscriptionId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/subscriptions/fetchSubscriptionById/" + subscriptionId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_SUBSCRIPTIONS_BY_ID,
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

// Fetch single student's subscriptions through studentId
export const fetchStudentSubscriptions = (studentId) => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/subscriptions/fetchStudentSubscriptions/" + studentId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_STUDENT_SUBSCRIPTIONS,
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

// Fetch All subscriptions as a list
export const fetchAllSubscriptions = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/subscriptions/fetchAllSubscriptions", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: FETCH_ALL_SUBSCRIPTIONS,
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

// Delete One Subscription.
export const deleteSubscription = (subscriptionId) => (dispatch) => {
  axios(config.DOMAIN + "/subscriptions/deleteSubscription/" + subscriptionId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: DELETE_SUBSCRIPTION,
        payload: response.data
      });
      toast.success("Subscription Successfully Deleted!");
    })
    .catch((err) => {
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

// Subscription payment.
export const subscriptionPayment = (subscriptionId) => (dispatch) => {
  axios(config.DOMAIN + "/subscriptions/subscriptionPayment/" + subscriptionId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      dispatch({
        type: PAYMENT_SUBSCRIPTION,
        payload: response.data
      });
      toast.success("Payment Successfully Completed!");
    })
    .catch((err) => {
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
