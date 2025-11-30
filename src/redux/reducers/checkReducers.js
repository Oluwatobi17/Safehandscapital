import {
  BALANCE_REQUEST,
  BALANCE_SUCCESS,
  BALANCE_FAILURE,
  CHECK_SUB_REQUEST,
  CHECK_SUB_SUCCESS,
  CHECK_SUB_FAILURE,
  CHECK_PR_PAY_REQUEST,
  CHECK_PR_PAY_SUCCESS,
  CHECK_PR_PAY_FAILURE,
} from "../constants/checkConstants";

export const checkBalanceReducer = (state = {}, action) => {
  switch (action.type) {
    case BALANCE_REQUEST:
      return { loading: true };
    case BALANCE_SUCCESS:
      return { loading: false, balance: action.payload };
    case BALANCE_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const checkSubReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_SUB_REQUEST:
      return { loading: true };
    case CHECK_SUB_SUCCESS:
      return { loading: false, status: action.payload };
    case CHECK_SUB_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};

export const checkPrpayReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_PR_PAY_REQUEST:
      return { loading: true };
    case CHECK_PR_PAY_SUCCESS:
      return { loading: false, status: action.payload };
    case CHECK_PR_PAY_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
