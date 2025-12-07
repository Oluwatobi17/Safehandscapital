import axios from "axios";
import Cookies from "js-cookie";
import { BALANCE_FAILURE } from "../constants/checkConstants";
import {
  REFERRAL_FAILURE,
  REFERRAL_REQUEST,
  REFERRAL_STATS_FAILURE,
  REFERRAL_STATS_REQUEST,
  REFERRAL_STATS_SUCCESS,
  REFERRAL_SUCCESS,
  WITHDRAW_FAILURE,
  WITHDRAW_REQUEST,
  WITHDRAW_SUCCESS,
} from "../constants/referralConstants";

export const handleGetReferrals =
  (user_id, token, setReferrals) => (dispatch) => {
    dispatch({ type: REFERRAL_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=get_referral_list&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        dispatch({
          type: REFERRAL_SUCCESS,
          payload: response.data.data,
        });
      })
      .catch((error) => {
        dispatch({ type: REFERRAL_FAILURE, payload: error.message });
      });
  };
export const handleGetReferralsStats = (user_id, token) => (dispatch) => {
  dispatch({ type: REFERRAL_STATS_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_referral_stats&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: REFERRAL_STATS_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: REFERRAL_STATS_FAILURE, payload: error.message });
    });
};
export const withdraw =
  (amount, otp, user_id, token, toast, confetti) => async (dispatch) => {
    dispatch({
      type: WITHDRAW_REQUEST,
      payload: { amount, otp },
    });
    try {
      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=referral_withdrawal&amount=${amount}&otp=${otp}&user_id=${user_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      dispatch({ type: WITHDRAW_SUCCESS, payload: data.data });
      if (data.data.status_code == 200) {
        // Cookies.set("userdetails", JSON.stringify(data.data.data), {
        //   expires: 2,
        // });
        // window.location = "/dashboard/home";
        Cookies.set("confetti2", confetti, { expires: 2 / (60 * 24) });
        toast.success("Your withdrawal is successful");
        setTimeout(() => {
          window.location = "/dashboard/referrals";
        }, 1000);
        // setConfetti(true);
      }
    } catch (error) {
      // toast.error(error.message);
      toast.error(
        error.response && error.response.data.message
          ? error.response.data.message
          : error.data
      );
      dispatch({
        type: WITHDRAW_FAILURE,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.data,
      });
    }
  };
