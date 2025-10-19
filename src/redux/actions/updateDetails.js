import axios from "axios";
import Cookies from "js-cookie";
import {
  GENERATE_OTP_FAILURE,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_WITHDRAWALADDRESS_FAILURE,
  UPDATE_WITHDRAWALADDRESS_REQUEST,
  UPDATE_WITHDRAWALADDRESS_SUCCESS,
} from "../constants/updateDetailsConstants";

export const update_profile =
  (fullname, phone, user_id, token, navigate, toast) => async (dispatch) => {
    dispatch({ type: UPDATE_PROFILE_REQUEST, payload: { fullname, phone } });
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=update_profile&fullname=${fullname}&phone=${phone}&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: UPDATE_PROFILE_SUCCESS, payload: data.data });
      if (data.data.status_code == 200) {
        Cookies.set("userdetails", JSON.stringify(data.data.data), {
          expires: 2,
        });
        toast.success("Your profile change is successful");
        setTimeout(() => {
          window.location = "/dashboard/home";
        }, 1000);
      }
    } catch (error) {
      // toast.error(error.message);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const update_withdrawal =
  (withdrawal_address, otp, user_id, token, toast) => async (dispatch) => {
    dispatch({
      type: UPDATE_WITHDRAWALADDRESS_REQUEST,
      payload: { withdrawal_address, otp },
    });
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=update_withdrawal_address&withdrawal_address=${withdrawal_address}&otp=${otp}&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: UPDATE_WITHDRAWALADDRESS_SUCCESS, payload: data.data });
      if (data.data.status_code == 200) {
        Cookies.set("userdetails", JSON.stringify(data.data.data), {
          expires: 2,
        });
        window.location = "/dashboard/home";
        toast.success(data.data.message);
      }
    } catch (error) {
      // toast.error(error.message);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: UPDATE_WITHDRAWALADDRESS_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const update_password =
  (password, user_id, token, navigate, toast) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: { password } });
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=update_password&password=${password}&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      //   console.log(data);
      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data });
      if (data.data.status_code == 200) {
        // Cookies.set('userdetails', JSON.stringify(data.data.data), {
        //   expires: 2,
        // });
        window.location = "/dashboard/home";
      }
    } catch (error) {
      // toast.error(error.message);
      //   console.log(error);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
export const otpGenerate = (user_id, token, toast) => async (dispatch) => {
  dispatch({ type: GENERATE_OTP_REQUEST, payload: { user_id } });
  try {
    // console.log(user_id);
    const data = await axios.post(
      `https://brain.evergreenffx.com/v2/?action=generate_tx_otp&user_id=${user_id}&reason=withdrawal_address`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GENERATE_OTP_SUCCESS, payload: data });
    // console.log(data);
    // Cookies.set("user_id", JSON.stringify(data.data.data[0].user_id), {
    //   expires: 2,
    // });
    toast.success("Check your email for generated otp");
    // console.log(data);
    // console.log(data);
  } catch (error) {
    // console.log(error);
    toast.error(
      error.response && error.response.data.message
        ? error.response.data.message
        : error.data
    );
    dispatch({
      type: GENERATE_OTP_FAILURE,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data,
    });
  }
};

export const otpGenerateWithdraw =
  (user_id, token, toast) => async (dispatch) => {
    dispatch({ type: GENERATE_OTP_REQUEST, payload: { user_id } });
    try {
      // console.log(user_id);
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=generate_tx_otp&user_id=${user_id}&reason=withdrawal`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: GENERATE_OTP_SUCCESS, payload: data });
      // console.log(data);
      // Cookies.set("user_id", JSON.stringify(data.data.data[0].user_id), {
      //   expires: 2,
      // });
      toast.success("Check your email for generated otp");
      // console.log(data);
    } catch (error) {
      // console.log(error);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: GENERATE_OTP_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
