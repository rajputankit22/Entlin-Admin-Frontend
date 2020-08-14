import {
  FETCH_BORROWER_HISTORY,
  LOADING,
  LOADED,
  SESSION_EXPIRED
} from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

export const fetchBorrowerHistory = borrowerId => dispatch => {
  dispatch({
    type: LOADING
  });
  axios(config.DOMAIN + "/histories/fetchBorrowerHistories/" + borrowerId, {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate()
    }
  })
    .then(response => {
      console.log(response.data);
      dispatch({
        type: FETCH_BORROWER_HISTORY,
        payload: response.data.histories
      });
      dispatch({
        type: LOADED
      });
    })
    .catch(err => {
      console.log(err.response);
      dispatch({
        type: LOADED
      });
      if (err.response.status === 403) {
        dispatch({
          type: SESSION_EXPIRED
        });
      } else {
        if (err.response.data.error) {
          toast.error(err.response.data.error);
        } else if (err.response.data.errors.length > 0) {
          err.response.data.errors.map(msg => {
            toast.error(msg.msg);
          });
        } else {
          toast.error("Server is not connected!");
        }
      }
    });
};
