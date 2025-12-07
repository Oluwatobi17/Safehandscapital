import axios from "axios";
import {
  HARVEST_FAILURE,
  HARVEST_REQUEST,
  HARVEST_SUCCESS,
} from "../constants/harvestConstants";

export const handleHarvestLists = (user_id, token) => (dispatch) => {
  dispatch({ type: HARVEST_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_harvest_list&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: HARVEST_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: HARVEST_FAILURE, payload: error.message });
    });
};
