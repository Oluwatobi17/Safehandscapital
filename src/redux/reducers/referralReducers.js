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

export const referralReducer = (state = {}, action) => {
  switch (action.type) {
    case REFERRAL_REQUEST:
      return { loadingReferral: true };
    case REFERRAL_SUCCESS:
      return { loadingReferral: false, referral: action.payload };
    case REFERRAL_FAILURE:
      return { loadingReferral: false, error: action.payload };

    default:
      return state;
  }
};
export const referralStatsReducer = (state = {}, action) => {
  switch (action.type) {
    case REFERRAL_STATS_REQUEST:
      return { loadingReferralStats: true };
    case REFERRAL_STATS_SUCCESS:
      return { loadingReferralStats: false, referralStats: action.payload };
    case REFERRAL_STATS_FAILURE:
      return { loadingReferralStats: false, error: action.payload };

    default:
      return state;
  }
};
export const withdrawReducer = (state = {}, action) => {
  switch (action.type) {
    case WITHDRAW_REQUEST:
      return { loadingWithdraw: true };
    case WITHDRAW_SUCCESS:
      return { loadingWithdraw: false, withdraw: action.payload };
    case WITHDRAW_FAILURE:
      return { loadingWithdraw: false, error: action.payload };

    default:
      return state;
  }
};
