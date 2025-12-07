import {HOST_URL} from "../constants/hostURL";
const url = HOST_URL;

import {
  OTP_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  REGISTER_EMAIL_FAILURE,
  REGISTER_EMAIL_REQUEST,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "../constants/authConstants";
import axios from "axios";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

export const register =
  (fullName, email, password, phoneno, refID, navigate, toast) =>
  async (dispatch, getState) => {
    dispatch({
      type: REGISTER_REQUEST,
      payload: { fullName, email, password, phoneno, refID },
    });
    
    const my_data = { fullName, email, password, phoneno, refID };

    try {
      const {
        register: { fullName, email, password, phoneno, refID },
      } = getState();

      const data = await axios.post(
        `${url}/api/signup/`,my_data
      );

      dispatch({ type: REGISTER_SUCCESS, payload: data });

      navigate("/login");

      Cookies.remove("invite-code");
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: REGISTER_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const signin =
  (email, password, navigate, toast) => async (dispatch) => {
    const my_data = {username: email, password};

    dispatch({ type: SIGNIN_REQUEST, payload: my_data });
    
    try {
      const data = await axios.post(
        `${url}/api/token/`, my_data
      );

      // dispatch({ type: SIGNIN_SUCCESS, payload: data.data });
      
      if (data.data?.access!=undefined) {
        const decoded = jwtDecode(data.data.access).user_id;
        
        Cookies.set("SECRET_REFRESH", JSON.stringify(data.data.refresh), {
          expires: 30 / (60 * 24),
        });
        Cookies.set("SECRET_TOKEN", JSON.stringify(data.data.access), {
          expires: 30 / (60 * 24),
        });

        const res = await axios.get(`${url}/api/userdetails/${decoded}/`);
        
        Cookies.set("userdetails", JSON.stringify(res.data), {
          expires: 30 / (60 * 24),
        });

        dispatch({ type: SIGNIN_SUCCESS, payload: res.data });

        navigate("/dashboard/home");
      }
    } catch (error) {
      // toast.error(error.message);

      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: SIGNIN_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const regEmail = (email, navigate, toast) => async (dispatch) => {
  dispatch({ type: REGISTER_EMAIL_REQUEST, payload: { email } });
  try {
    const data = await axios.post(
      `https://brain.evergreenffx.com/v2/?action=reg_email&email=${email}`
    );
    dispatch({ type: REGISTER_EMAIL_SUCCESS, payload: data.data });

    Cookies.set("user_id", JSON.stringify(data.data.data[0].user_id), {
      expires: 2,
    });
    Cookies.set("email", JSON.stringify(email), {
      expires: 2,
    });
    navigate("/verify");
  } catch (error) {
    // toast.error(error.message);
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.data
    );
    dispatch({
      type: REGISTER_EMAIL_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data,
    });
  }
};
export const otpAction =
  (user_id, otp, navigate, toast) => async (dispatch) => {
    dispatch({ type: OTP_REQUEST, payload: { user_id } });
    try {
      // console.log(user_id);
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=verify_tx_2fa&user_id=${user_id}&code=${otp}`
      );
      dispatch({ type: OTP_SUCCESS, payload: data });

      window.location = "/signup";
    } catch (error) {
      // console.log(error);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: OTP_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const signout = (navigate) => (dispatch) => {
  Cookies.remove("userdetails");
  Cookies.remove("SECRET_TOKEN");
  Cookies.remove("INVOICE_LIST");
  Cookies.remove("ranks");
  Cookies.remove("invoice_id");
  Cookies.remove("checkValue");
  Cookies.remove("INVOICE_ID");
  Cookies.remove("TRADE_ACCT_INFO");
  window.location = "/login";
  dispatch({ type: SIGNOUT });
};
