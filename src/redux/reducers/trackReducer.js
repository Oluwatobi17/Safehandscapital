import {
  TRACK_PAYMENT_FAILURE,
  TRACK_PAYMENT_REQUEST,
  TRACK_PAYMENT_SUCCESS,
} from "../constants/trackConstants";

export const trackReducers = (state = {}, action) => {
  switch (action.type) {
    case TRACK_PAYMENT_REQUEST:
      return { loadingTrack: true };
    case TRACK_PAYMENT_SUCCESS:
      return { loadingTrack: false, payment: action.payload };
    case TRACK_PAYMENT_FAILURE:
      return { loadingTrack: false, error: action.payload };

    default:
      return state;
  }
};
