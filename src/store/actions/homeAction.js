import { LOADING, SESSION_EXPIRED, LOADED, FETCH_HOME_DETAILS } from "./types";
import axios from "axios";
import { authenticate } from "../../helper/localStore";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { config } from "../../config";

export const fetchHomeDetails = () => (dispatch) => {
  dispatch({
    type: LOADING,
  });
  axios(config.DOMAIN + "/homes/fetchHomeDetails/", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      Authorization: authenticate(),
    },
  })
    .then((response) => {
      console.log(response.data);
      dispatch({
        type: FETCH_HOME_DETAILS,
        payload: response.data,
      });
      dispatch({
        type: LOADED,
      });
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
