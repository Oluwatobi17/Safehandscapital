import axios from "axios";
import {
  HISTORY_FAILURE,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
} from "../constants/historyConstants";

export const handleClosedPositions = (user_id, token) => (dispatch) => {
  dispatch({ type: HISTORY_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=closed_positions&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: HISTORY_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: HISTORY_FAILURE, payload: error.message });
    });
};
