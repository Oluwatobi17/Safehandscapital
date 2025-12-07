import {
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  ENABLE_EMAIL_REQUEST,
  ENABLE_EMAIL_SUCCESS,
  ENABLE_EMAIL_FAILURE,
  DISABLE_EMAIL_REQUEST,
  DISABLE_EMAIL_SUCCESS,
  DISABLE_EMAIL_FAILURE,
} from "../constants/emailConstants";
import axios from "axios";

export const handleCheckEmail = (user_id, token) => (dispatch) => {
  dispatch({ type: CHECK_EMAIL_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=check_email_notification&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: CHECK_EMAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: CHECK_EMAIL_FAILURE,
        payload: error.message,
      });
    });
};

export const handleEnableEmail = (user_id, token) => (dispatch) => {
  dispatch({ type: ENABLE_EMAIL_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=enable_email_notification&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: ENABLE_EMAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: ENABLE_EMAIL_FAILURE,
        payload: error.message,
      });
    });
};
export const handleDisableEmail = (user_id, token) => (dispatch) => {
  dispatch({ type: DISABLE_EMAIL_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=disable_email_notification&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: DISABLE_EMAIL_SUCCESS,
        payload: response.data,
      });
    })
    .catch((error) => {
      dispatch({
        type: DISABLE_EMAIL_FAILURE,
        payload: error.message,
      });
    });
};
