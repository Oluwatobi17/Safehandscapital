import {
  GENERATE_OTP_FAILURE,
  GENERATE_OTP_REQUEST,
  GENERATE_OTP_SUCCESS,
  UPDATE_PASSWORD_FAILURE,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PROFILE_FAILURE,
  UPDATE_PROFILE_REQUEST,
  UPDATE_PROFILE_SUCCESS,
  UPDATE_WITHDRAWALADDRESS_FAILURE,
  UPDATE_WITHDRAWALADDRESS_REQUEST,
  UPDATE_WITHDRAWALADDRESS_SUCCESS,
} from "../constants/updateDetailsConstants";

export const updateProReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PROFILE_REQUEST:
      return { loadingUpdatePro: true };
    case UPDATE_PROFILE_SUCCESS:
      return { loadingUpdatePro: false, updatepro: action.payload };
    case UPDATE_PROFILE_FAILURE:
      return { loadingUpdatePro: false, error: action.payload };

    default:
      return state;
  }
};
export const updatePassReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_PASSWORD_REQUEST:
      return { loadingUpdatePro: true };
    case UPDATE_PASSWORD_SUCCESS:
      return { loadingUpdatePro: false, updatewith: action.payload };
    case UPDATE_PASSWORD_FAILURE:
      return { loadingUpdatePro: false, error: action.payload };

    default:
      return state;
  }
};
export const updateWithReducer = (state = {}, action) => {
  switch (action.type) {
    case UPDATE_WITHDRAWALADDRESS_REQUEST:
      return { loadingUpdatePro: true };
    case UPDATE_WITHDRAWALADDRESS_SUCCESS:
      return { loadingUpdatePro: false, updatepass: action.payload };
    case UPDATE_WITHDRAWALADDRESS_FAILURE:
      return { loadingUpdatePro: false, error: action.payload };

    default:
      return state;
  }
};

export const generateOtpReducer = (state = {}, action) => {
  switch (action.type) {
    case GENERATE_OTP_REQUEST:
      return { loadingGenerate: true };
    case GENERATE_OTP_SUCCESS:
      return { loadingGenerate: false, userInfo: action.payload };
    case GENERATE_OTP_FAILURE:
      return { loadingGenerate: false, error: action.payload };
    default:
      return state;
  }
};
