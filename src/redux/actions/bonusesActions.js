import axios from "axios";
import Cookies from "js-cookie";
import {
  BONUSES_STATS_FAILURE,
  BONUSES_STATS_REQUEST,
  BONUSES_STATS_SUCCESS,
  BONUS_FIRST_FAILURE,
  BONUS_FIRST_REQUEST,
  BONUS_FIRST_SUCCESS,
  BONUS_SECOND_FAILURE,
  BONUS_SECOND_REQUEST,
  BONUS_SECOND_SUCCESS,
  BONUS_THIRD_FAILURE,
  BONUS_THIRD_REQUST,
  BONUS_THIRD_SUCCESS,
  RANKING_FAILURE,
  RANKING_REQUEST,
  RANKING_SUCCESS,
  RANK_FAILURE,
  RANK_REQUEST,
  RANK_SUCCESS,
} from "../constants/bonusesConstants";

export const handleCurrentRank = (user_id, token) => (dispatch) => {
  dispatch({ type: RANK_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_current_rank&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: RANK_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: RANK_FAILURE, payload: error.message });
    });
};
export const handleBonusStats = (user_id, token) => (dispatch) => {
  dispatch({ type: BONUSES_STATS_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_bonus_stats&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: BONUSES_STATS_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: BONUSES_STATS_FAILURE, payload: error.message });
    });
};
export const handleRankingStats = (user_id, token) => (dispatch) => {
  dispatch({ type: RANKING_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_ranking_status&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: RANKING_SUCCESS,
        payload: response.data.data,
      });
      Cookies.set("ranks", JSON.stringify(response.data.data), {
        expires: 2,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: RANKING_FAILURE, payload: error.message });
    });
};
export const handleFirstLevel = (user_id, token) => (dispatch) => {
  dispatch({ type: BONUS_FIRST_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_bonus_first_level&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: BONUS_FIRST_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: BONUS_FIRST_FAILURE, payload: error.message });
    });
};
export const handleSecondLevel = (user_id, token) => (dispatch) => {
  dispatch({ type: BONUS_SECOND_REQUEST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_bonus_second_level&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: BONUS_SECOND_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: BONUS_SECOND_FAILURE, payload: error.message });
    });
};
export const handleThirdLevel = (user_id, token) => (dispatch) => {
  dispatch({ type: BONUS_THIRD_REQUST });
  axios
    .post(
      `https://brain.evergreenffx.com/v2/?action=get_bonus_third_level&user_id=${user_id}`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      dispatch({
        type: BONUS_THIRD_SUCCESS,
        payload: response.data.data,
      });
      // setReferrals(response.data.data);
    })
    .catch((error) => {
      dispatch({ type: BONUS_THIRD_FAILURE, payload: error.message });
    });
};
