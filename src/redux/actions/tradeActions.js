import {HOST_URL} from "../constants/hostURL";
const url = HOST_URL;

import {
  CHECK_TRADE_ACCT_REQUEST,
  CHECK_TRADE_ACCT_SUCCESS,
  CHECK_TRADE_ACCT_FAILURE,
  ADD_TRADE_ACCT_REQUEST,
  ADD_TRADE_ACCT_SUCCESS,
  ADD_TRADE_ACCT_FAILURE,
  ENABLE_TRADE_ACCT_REQUEST,
  ENABLE_TRADE_ACCT_SUCCESS,
  ENABLE_TRADE_ACCT_FAILURE,
  DISABLE_TRADE_ACCT_REQUEST,
  DISABLE_TRADE_ACCT_SUCCESS,
  DISABLE_TRADE_ACCT_FAILURE,
  DELETE_TRADE_ACCT_REQUEST,
  DELETE_TRADE_ACCT_SUCCESS,
  DELETE_TRADE_ACCT_FAILURE,
} from "../constants/tradeConstants";
import axios from "axios";
import Cookies from "js-cookie";
import { toast } from "react-toastify";

export const handleCheckTradeAcct = (user_id, token) => (dispatch) => {
  dispatch({ type: CHECK_TRADE_ACCT_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=check_trade_acct&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: CHECK_TRADE_ACCT_SUCCESS, payload: response.data.data });
      if (response.status == 200) {
        Cookies.set("TRADE_ACCT_INFO", JSON.stringify(response.data.data), {
          expires: 2,
        });
      }
    })
    .catch((error) => {
      dispatch({ type: CHECK_TRADE_ACCT_FAILURE, payload: error.message });
    });
};
export const handleAddTradeAcct =
  (
    user_id,
    token,
    account_id,
    account_name,
    account_password,
    broker,
    brokerNo,
    broker_server,
    broker_server_id,
    subscription,
    toast
  ) =>
  (dispatch) => {
    dispatch({ type: ADD_TRADE_ACCT_REQUEST });
    axios
      .post(
        `${url}/api/addAccount/`,
        {account_id,
        user: user_id,
        account_name,
        broker,
        brokerNo,
        broker_server,
        broker_server_id,
        subscription,
        account_password: encodeURIComponent(account_password),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        // if (account_id < 3) {
        //   toast.error("brvh!!!");
        // }
        dispatch({ type: ADD_TRADE_ACCT_SUCCESS, payload: response.data.data });

        if (response.status == 200) {
          Cookies.set("TRADE_ACCT_INFO", JSON.stringify(response.data.data), {
            expires: 2,
          });
          toast.success(response.data.message);
        }
      })
      .catch((error) => {
        toast.error(error?.response?.data?.message);
        // dispatch({ type: ADD_TRADE_ACCT_FAILURE, payload: error.message });
      });
  };

export const handleEnableTradeAcct = (user_id, token) => (dispatch) => {
  dispatch({ type: ENABLE_TRADE_ACCT_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=enable_trade_acct&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({ type: ENABLE_TRADE_ACCT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: ENABLE_TRADE_ACCT_FAILURE, payload: error.message });
    });
};

export const handleDisableTradeAcct = (user_id, token) => (dispatch) => {
  dispatch({ type: DISABLE_TRADE_ACCT_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=disable_trade_acct&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      // console.log(response.data.data?.status);
      dispatch({ type: DISABLE_TRADE_ACCT_SUCCESS, payload: response.data });
    })
    .catch((error) => {
      dispatch({ type: DISABLE_TRADE_ACCT_FAILURE, payload: error.message });
    });
};

export const handleDeleteTradeAcct =
  (user_id, token, setIsOpenDel, isOpenDel, toast) => (dispatch) => {
    dispatch({ type: DELETE_TRADE_ACCT_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=delete_trade_acct&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({ type: DELETE_TRADE_ACCT_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        if (error.response.statusText == "Payment Required") {
          setIsOpenDel(!isOpenDel);
        }
        toast.error(
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data
        );
        dispatch({ type: DELETE_TRADE_ACCT_FAILURE, payload: error.message });
      });
  };
