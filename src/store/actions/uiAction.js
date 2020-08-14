import {
  SWITCH_NAV_MAIN,
  SWITCH_NAV_STUDENT,
  SWITCH_NAV_MENTOR
} from "./types";

// Function for create user
export const switchNavMain = () => (dispatch) => {
  dispatch({
    type: SWITCH_NAV_MAIN,
  });
};

export const switchNavStudent = () => (dispatch) => {
  dispatch({
    type: SWITCH_NAV_STUDENT,
  });
};

export const switchNavMentor = () => (dispatch) => {
  dispatch({
    type: SWITCH_NAV_MENTOR,
  });
};