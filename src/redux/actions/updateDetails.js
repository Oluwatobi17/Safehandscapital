import {HOST_URL} from "../constants/hostURL";
const url = HOST_URL;

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
  (fullName, phoneno, user_id, token, navigate, toast) => async (dispatch) => {
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
        error.response && error.response.data.error
          ? error.response.data.error
          : error.data
      );
      dispatch({
        type: UPDATE_PROFILE_FAILURE,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
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
        `${url}/api/wallet_update/${user_id}/`,
        {otp:otp, wallet: withdrawal_address},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: UPDATE_WITHDRAWALADDRESS_SUCCESS, payload: data.data });
      
      if (data.data.success == "Wallet Updated Successfully") {
        let user_details = JSON.parse(Cookies.get('userdetails'));
        user_details = {...user_details, "walletAddress": withdrawal_address}
        Cookies.set("userdetails", JSON.stringify(user_details), {
          expires: 30 / (60 * 24),
        });

        window.location = "/dashboard/home";
        toast.success(data.data.sucess);
      }
    } catch (error) {
      toast.error(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.data
      );
      dispatch({
        type: UPDATE_WITHDRAWALADDRESS_FAILURE,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.data,
      });
    }
  };
export const update_password =
  (password, newpassword, user_id, token, navigate, toast) => async (dispatch) => {
    dispatch({ type: UPDATE_PASSWORD_REQUEST, payload: { password } });
    try {
      token = Cookies.get("SECRET_TOKEN");
      const data = await axios.put(
        `${url}/api/changepassword/${user_id}/`,
        {password:password,new_password:newpassword},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: data.data });
      
      if (data.status == 201) {
        toast.success(data.data.message);
        // window.location = "/dashboard/home";
      }
    } catch (error) {
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: UPDATE_PASSWORD_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.error
            : error.data,
      });
    }
  };
export const otpGenerate = (user_id, token, toast) => async (dispatch) => {
  dispatch({ type: GENERATE_OTP_REQUEST, payload: { user_id } });
  try {
    // console.log(user_id);
    const data = await axios.get(
      `${url}/api/generateOTP/${user_id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    dispatch({ type: GENERATE_OTP_SUCCESS, payload: data });
    
    toast.success("Check your email for generated OTP");
  } catch (error) {
    toast.error(
      error.response && error.response.data.error
        ? error.response.data.error
        : error.data
    );
    dispatch({
      type: GENERATE_OTP_FAILURE,
      payload:
        error.response && error.response.data.error
          ? error.response.data.error
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
      toast.success("Check your email for generated OTP");
    } catch (error) {
      toast.error(
        error.response && error.response.data.error
          ? error.response.data.error
          : error.data
      );
      dispatch({
        type: GENERATE_OTP_FAILURE,
        payload:
          error.response && error.response.data.error
            ? error.response.data.error
            : error.data,
      });
    }
  };
