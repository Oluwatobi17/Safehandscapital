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

export const rankReducer = (state = {}, action) => {
  switch (action.type) {
    case RANK_REQUEST:
      return { loading: true };
    case RANK_SUCCESS:
      return { loading: false, rank: action.payload };
    case RANK_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const bonusStatsReducer = (state = {}, action) => {
  switch (action.type) {
    case BONUSES_STATS_REQUEST:
      return { loading: true };
    case BONUSES_STATS_SUCCESS:
      return { loading: false, bonusStats: action.payload };
    case BONUSES_STATS_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const rankingReducer = (state = {}, action) => {
  switch (action.type) {
    case RANKING_REQUEST:
      return { loading: true };
    case RANKING_SUCCESS:
      return { loading: false, rankingStats: action.payload };
    case RANKING_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const firstrankingReducer = (state = {}, action) => {
  switch (action.type) {
    case BONUS_FIRST_REQUEST:
      return { loading: true };
    case BONUS_FIRST_SUCCESS:
      return { loading: false, firstLevel: action.payload };
    case BONUS_FIRST_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const secondrankingReducer = (state = {}, action) => {
  switch (action.type) {
    case BONUS_SECOND_REQUEST:
      return { loading: true };
    case BONUS_SECOND_SUCCESS:
      return { loading: false, secondLevel: action.payload };
    case BONUS_SECOND_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const thirdrankingReducer = (state = {}, action) => {
  switch (action.type) {
    case BONUS_THIRD_REQUST:
      return { loading: true };
    case BONUS_THIRD_SUCCESS:
      return { loading: false, thirdLevel: action.payload };
    case BONUS_THIRD_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
