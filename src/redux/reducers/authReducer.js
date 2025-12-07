import {
  OTP_FAILURE,
  OTP_REQUEST,
  OTP_SUCCESS,
  REGISTER_EMAIL_FAILURE,
  REGISTER_EMAIL_REQUEST,
  REGISTER_EMAIL_SUCCESS,
  REGISTER_FAILURE,
  REGISTER_REQUEST,
  REGISTER_SUCCESS,
  SIGNIN_FAILURE,
  SIGNIN_REQUEST,
  SIGNIN_SUCCESS,
  SIGNOUT,
} from "../constants/authConstants";
export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_REQUEST:
      return { loading: true };
    case REGISTER_SUCCESS:
      return { loading: false, regInfo: action.payload };
    case REGISTER_FAILURE:
      return { loading: false, error: action.payload };

    default:
      return state;
  }
};
export const signInReducer = (state = {}, action) => {
  switch (action.type) {
    case SIGNIN_REQUEST:
      return { loading: true };
    case SIGNIN_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case SIGNIN_FAILURE:
      return { loading: false, error: action.payload };
    case SIGNOUT:
      return {};
    default:
      return state;
  }
};
export const regEmailreducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTER_EMAIL_REQUEST:
      return { loading: true };
    case REGISTER_EMAIL_SUCCESS:
      return { loading: false, userId: action.payload };
    case REGISTER_EMAIL_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
export const otpReducer = (state = {}, action) => {
  switch (action.type) {
    case OTP_REQUEST:
      return { loading: true };
    case OTP_SUCCESS:
      return { loading: false, userInfo: action.payload };
    case OTP_FAILURE:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};
