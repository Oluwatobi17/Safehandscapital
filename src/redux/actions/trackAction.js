import axios from "axios";
import {
  TRACK_PAYMENT_FAILURE,
  TRACK_PAYMENT_REQUEST,
  TRACK_PAYMENT_SUCCESS,
} from "../constants/trackConstants";

export const handleTrack =
  (user_id, withdrawal_address, token, setMessage, setStatus) => (dispatch) => {
    console.log(token);
    dispatch({ type: TRACK_PAYMENT_REQUEST });
    axios
      .post(
        `https://brain.evergreenffx.com/v2/?action=track_payment&user_id=${user_id}&wallet_address=${withdrawal_address}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        setStatus(response?.data?.data?.status);
        setMessage(response?.data?.data?.message);
        dispatch({
          type: TRACK_PAYMENT_SUCCESS,
          payload: response.data.data,
        });
        // setReferrals(response.data.data);
      })
      .catch((error) => {
        dispatch({ type: TRACK_PAYMENT_FAILURE, payload: error });
      });
  };
