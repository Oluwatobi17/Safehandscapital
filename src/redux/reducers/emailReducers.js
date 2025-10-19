import {
  CHECK_EMAIL_REQUEST,
  CHECK_EMAIL_SUCCESS,
  CHECK_EMAIL_FAILURE,
  ENABLE_EMAIL_REQUEST,
  ENABLE_EMAIL_SUCCESS,
  ENABLE_EMAIL_FAILURE,
  DISABLE_EMAIL_REQUEST,
  DISABLE_EMAIL_SUCCESS,
  DISABLE_EMAIL_FAILURE,
} from "../constants/emailConstants";

export const checkEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case CHECK_EMAIL_REQUEST:
      return { loading: true };
    case CHECK_EMAIL_SUCCESS:
      return {
        loading: false,
        check_email_status: action.payload,
      };
    case CHECK_EMAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const enableEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case ENABLE_EMAIL_REQUEST:
      return { loading: true };
    case ENABLE_EMAIL_SUCCESS:
      return {
        loading: false,
        enable_email_status: action.payload,
      };
    case ENABLE_EMAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
export const disableEmailReducer = (state = {}, action) => {
  switch (action.type) {
    case DISABLE_EMAIL_REQUEST:
      return { loading: true };
    case DISABLE_EMAIL_SUCCESS:
      return {
        loading: false,
        disable_email_status: action.payload,
      };
    case DISABLE_EMAIL_FAILURE:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
