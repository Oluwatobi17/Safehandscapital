import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import Cookies from "js-cookie";
import thunk from "redux-thunk";
import {
  otpReducer,
  regEmailreducer,
  registerReducer,
  signInReducer,
} from "./reducers/authReducer";
import {
  checkBalanceReducer,
  checkSubReducer,
  checkPrpayReducer,
} from "./reducers/checkReducers";
import {
  addTradeAcctReducer,
  checkTradeAcctReducer,
  deleteTradeAcctReducer,
  disableTradeAcctReducer,
  enableTradeAcctReducer,
} from "./reducers/tradeReducers";
import {
  referralReducer,
  referralStatsReducer,
  withdrawReducer,
} from "./reducers/referralReducers";
import {
  bonusStatsReducer,
  firstrankingReducer,
  rankingReducer,
  rankReducer,
  secondrankingReducer,
  thirdrankingReducer,
} from "./reducers/bonusesReducr";
import { harvestReducers } from "./reducers/harvestReducers";
import { historyReducers } from "./reducers/historyReducers";
import {
  couponReducer,
  invoiceListReducers,
  makePaymentReducer,
  singleInvoiceReducers,
} from "./reducers/invoiceReducers";
import {
  generateOtpReducer,
  updatePassReducer,
  updateProReducer,
  updateWithReducer,
} from "./reducers/updateDetailsReducer";

import {
  checkEmailReducer,
  enableEmailReducer,
  disableEmailReducer,
} from "./reducers/emailReducers";
import { trackReducers } from "./reducers/trackReducer";

const initialstate = {
  userInformation: {
    info: Cookies.get("userdetails")
      ? JSON.parse(Cookies.get("userdetails"))
      : null,
  },
  token: Cookies.get("SECRET_TOKEN")
    ? JSON.parse(Cookies.get("SECRET_TOKEN"))
    : null,
  registerEmail: {
    id: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
    email: Cookies.get("email") ? JSON.parse(Cookies.get("email")) : null,
  },
  rankingStats: {
    rank: Cookies.get("ranks") ? JSON.parse(Cookies.get("ranks")) : null,
  },
  checkBalance: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  referral: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  bonusStats: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  referralStats: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  // rank: {
  //   userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  // },
  firstLevel: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  secondLevel: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  thirdLevel: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  harvests: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  history: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  track: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  rankingStats: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },

  checkSub: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  updateProfile: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  checkPrpay: {
    userID: Cookies.get("user_id") ? JSON.parse(Cookies.get("user_id")) : null,
  },
  checkTradeAcct: {
    info: Cookies.get("checkTradeAcctDetails")
      ? JSON.parse(Cookies.get("checkTradeAcctDetails"))
      : null,
  },
  addTradeAcct: {},
  // enableTradeAcct: {},
  disableTradeAcct: {},
  deleteTradeAcct: {},
  getInvoiceList: {},
  getSingleInvoice: {},

  checkEmailNotification: {},
  enableEmailNotification: {},
  disableEmailNotification: {},
};

const reducer = combineReducers({
  //   freelancerReg: freelancerRegister,
  userInformation: signInReducer,
  token: signInReducer,
  registerEmail: regEmailreducer,
  otpReducer: otpReducer,
  generateOtp: generateOtpReducer,
  register: registerReducer,
  checkBalance: checkBalanceReducer,
  referral: referralReducer,
  referralStats: referralStatsReducer,
  checkSub: checkSubReducer,
  checkPrpay: checkPrpayReducer,
  updateProfile: updateProReducer,
  updateWithdrawal: updateWithReducer,
  updatePassword: updatePassReducer,
  rank: rankReducer,
  harvests: harvestReducers,
  history: historyReducers,
  track: trackReducers,
  bonusStats: bonusStatsReducer,
  rankingStats: rankingReducer,
  firstLevel: firstrankingReducer,
  secondLevel: secondrankingReducer,
  thirdLevel: thirdrankingReducer,
  checkTradeAcct: checkTradeAcctReducer,
  addTradeAcct: addTradeAcctReducer,
  enableTradeAcct: enableTradeAcctReducer,
  disableTradeAcct: disableTradeAcctReducer,

  deleteTradeAcct: deleteTradeAcctReducer,
  getInvoiceList: invoiceListReducers,
  withdrawal: withdrawReducer,
  getSingleInvoice: singleInvoiceReducers,
  couponRed: couponReducer,
  makePay: makePaymentReducer,

  checkEmailNotification: checkEmailReducer,
  enableEmailNotification: enableEmailReducer,
  disableEmailNotification: disableEmailReducer,
});
const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const middleware = [thunk];

const store = createStore(
  reducer,
  initialstate,
  composeEnhancer(applyMiddleware(...middleware))
);
export default store;
