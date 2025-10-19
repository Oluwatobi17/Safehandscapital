import React, { useEffect, useState } from "react";
import "../styles/referrals.scss";
import people from "../assets/oc-hi-five.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  handleCheckBalance,
  handleCheckSub,
  handlePrPay,
} from "../redux/actions/checkActions";
import { handleCheckTradeAcct } from "../redux/actions/tradeActions";
import {
  handleGetReferrals,
  handleGetReferralsStats,
} from "../redux/actions/refferalActios";
import ReferralContent from "./ReferralContent";
import { GridLoader } from "react-spinners";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
const CustomDiv = ({ text, number }) => {
  return (
    <div>
      <p>{text}</p>
      <p>{number}</p>
    </div>
  );
};

function Referrals() {
  let user_id;
  let token;
  let withdrawal_add;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [referrals, setReferrals] = useState();

  const { loading } = useSelector((state) => state.checkBalance);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { referral, loadingReferral } = useSelector((state) => state.referral);
  const { referralStats, loadingReferralStats } = useSelector(
    (state) => state.referralStats
  );
  const prPay = useSelector((state) => state.checkPrpay);
  const tradeAcct = useSelector((state) => state.checkTradeAcct);

  const subStatus = status?.status;
  const prStatus = prPay.status?.status;

  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
    withdrawal_add = userInfo.info[0]?.w_address;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
    withdrawal_add = userInfo.userInfo?.data[0]?.w_address;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  // console.log(referralStats);
  const ReferralRecord = ({ referral, referralStat, withdrawal_add }) => {
    return (
      <>
        {referral && referralStat && referral?.data === undefined && (
          <ReferralContent
            withdrawal_add={withdrawal_add}
            referral={referral}
            referralStat={referralStats}
          />
        )}
        {/* console.log(referral.data); */}
        {referralStat && referral?.data.length !== 0 && (
          <ReferralContent
            withdrawal_add={withdrawal_add}
            referral={referral}
            referralStat={referralStats}
          />
        )}
        {referralStat && referral?.data.length === 0 && null}
      </>
    );
  };
  useEffect(() => {
    dispatch(handleCheckBalance(user_id, token));
    // dispatch(handleCheckSub(user_id, token));
    // dispatch(handlePrPay(user_id, token));
    // dispatch(handleCheckTradeAcct(user_id, token));
    dispatch(handleGetReferrals(user_id, token));
    dispatch(handleGetReferralsStats(user_id, token));
  }, []);
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        {referral?.data.length === 0 ? (
          <>
            {loadingReferral ? (
              <>
                <div className="w-full flex justify-center items-center h-[40rem]">
                  <Player
                    src={animationData}
                    className="w-32 h-32"
                    speed={1}
                    loop
                    autoplay
                  />
                </div>
              </>
            ) : (
              <>
                <div className="referral-custom">
                  <h2>Referrals Details</h2>
                  <div>
                    <CustomDiv text="Total Referrals" number="0" />
                    <CustomDiv text="Amount earned" number="$0" />
                    <CustomDiv text="Amount withdrawn" number="$0" />
                  </div>
                </div>
                <div className="w-full flex flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
                  <img src={people} alt="image" />
                  <p>Oops!</p>
                  <p>You haven’t referred anyone yet!</p>
                </div>
              </>
            )}
          </>
        ) : (
          <>
            {loadingReferralStats ? (
              <div className="w-full flex justify-center items-center h-[40rem]">
                <Player
                  src={animationData}
                  className="w-32 h-32"
                  speed={1}
                  loop
                  autoplay
                />
              </div>
            ) : (
              <>
                <ReferralRecord
                  referral={referral}
                  referralStat={referralStats}
                  withdrawal_add={withdrawal_add}
                />
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Referrals;
