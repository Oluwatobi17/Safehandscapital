import {
  BALANCE_REQUEST,
  BALANCE_SUCCESS,
  BALANCE_FAILURE,
  CHECK_SUB_REQUEST,
  CHECK_SUB_SUCCESS,
  CHECK_SUB_FAILURE,
  CHECK_PR_PAY_REQUEST,
  CHECK_PR_PAY_SUCCESS,
  CHECK_PR_PAY_FAILURE,
} from "../constants/checkConstants";
import axios from "axios";

export const handleCheckBalance = (user_id, token) => (dispatch) => {
  dispatch({ type: BALANCE_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=dashboard_balance&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: BALANCE_SUCCESS,
        payload: response.data.data.balance || response.data.data[0]?.balance,
      });
    })
    .catch((error) => {
      dispatch({ type: BALANCE_FAILURE, payload: error.message });
    });
};

export const handleCheckSub = (user_id, token) => (dispatch) => {
  dispatch({ type: CHECK_SUB_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=check_sub&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: CHECK_SUB_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: CHECK_SUB_FAILURE, payload: error.message });
    });
};

export const handlePrPay = (user_id, token) => (dispatch) => {
  dispatch({ type: CHECK_PR_PAY_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=check_pr_pay&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: CHECK_PR_PAY_SUCCESS, payload: response.data.data });
    })
    .catch((error) => {
      dispatch({ type: CHECK_PR_PAY_FAILURE, payload: error.message });
    });
};
