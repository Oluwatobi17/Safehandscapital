import {
  CHECK_TRADE_ACCT_REQUEST,
  CHECK_TRADE_ACCT_SUCCESS,
  CHECK_TRADE_ACCT_FAILURE,
  ADD_TRADE_ACCT_REQUEST,
  ADD_TRADE_ACCT_SUCCESS,
  ADD_TRADE_ACCT_FAILURE,
  ENABLE_TRADE_ACCT_REQUEST,
  ENABLE_TRADE_ACCT_SUCCESS,
  ENABLE_TRADE_ACCT_FAILURE,
  DISABLE_TRADE_ACCT_REQUEST,
  DISABLE_TRADE_ACCT_SUCCESS,
  DISABLE_TRADE_ACCT_FAILURE,
  DELETE_TRADE_ACCT_REQUEST,
  DELETE_TRADE_ACCT_SUCCESS,
  DELETE_TRADE_ACCT_FAILURE,
} from "../constants/tradeConstants";

export const checkTradeAcctReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_TRADE_ACCT_REQUEST:
      return { loading: true, acctStatus: false };
    case CHECK_TRADE_ACCT_SUCCESS:
      return {
        loading: false,
        acctInfo: action.payload,
        acctStatus: true,
      };
    case CHECK_TRADE_ACCT_FAILURE:
      return { loading: false, error: action.payload, acctStatus: false };

    default:
      return state;
  }
};

export const addTradeAcctReducer = (state = {}, action) => {
  switch (action.type) {
    case ADD_TRADE_ACCT_REQUEST:
      return { loading: true, addStatus: false };
    case ADD_TRADE_ACCT_SUCCESS:
      return { loading: false, acctInfo: action.payload, addStatus: true };
    case ADD_TRADE_ACCT_FAILURE:
      return { loading: false, error: action.payload, addStatus: false };

    default:
      return state;
  }
};

export const enableTradeAcctReducer = (state = {}, action) => {
  switch (action.type) {
    case ENABLE_TRADE_ACCT_REQUEST:
      return { loadingEnable: true };
    case ENABLE_TRADE_ACCT_SUCCESS:
      return { loadingEnable: false, acct: action.payload };
    case ENABLE_TRADE_ACCT_FAILURE:
      return { loadingEnable: false, error: action.payload };

    default:
      return state;
  }
};

export const disableTradeAcctReducer = (state = {}, action) => {
  switch (action.type) {
    case DISABLE_TRADE_ACCT_REQUEST:
      return { loadingDisable: true };
    case DISABLE_TRADE_ACCT_SUCCESS:
      return { loadingDisable: false, acct: action.payload };
    case DISABLE_TRADE_ACCT_FAILURE:
      return { loadingDisable: false, error: action.payload };

    default:
      return state;
  }
};

export const deleteTradeAcctReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_TRADE_ACCT_REQUEST:
      return { loadingDelete: true };
    case DELETE_TRADE_ACCT_SUCCESS:
      return { loadingDelete: false, acct: action.payload };
    case DELETE_TRADE_ACCT_FAILURE:
      return { loadingDelete: false, error: action.payload };

    default:
      return state;
  }
};
