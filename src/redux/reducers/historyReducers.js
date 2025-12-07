import {
  HISTORY_FAILURE,
  HISTORY_REQUEST,
  HISTORY_SUCCESS,
} from "../constants/historyConstants";

export const historyReducers = (state = {}, action) => {
  switch (action.type) {
    case HISTORY_REQUEST:
      return { loadingHistory: true };
    case HISTORY_SUCCESS:
      return { loadingHistory: false, history: action.payload };
    case HISTORY_FAILURE:
      return { loadingHistory: false, error: action.payload };

    default:
      return state;
  }
};
