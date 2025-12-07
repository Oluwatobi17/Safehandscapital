import React, { useEffect } from "react";
import harvest from "../assets/oc-plane.svg";

import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleHarvestLists } from "../redux/actions/harvestActions";
import { handleCheckBalance } from "../redux/actions/checkActions";
import HarvestContent from "./HarvestContent";

function Harvest() {
  let user_id;
  let token;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, balance } = useSelector(
    (state) => state.checkBalance
  );
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { referral } = useSelector((state) => state.referral);
  const { harvests, loadingHarvest } = useSelector((state) => state.harvests);
  const { referralStats } = useSelector((state) => state.referralStats);
  const prPay = useSelector((state) => state.checkPrpay);
  const tradeAcct = useSelector((state) => state.checkTradeAcct);
  const subStatus = status?.status;
  const prStatus = prPay.status?.status;

  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }

  const ReferralRecord = ({ referral, referralStat }) => {
    return (
      <>
        {referral && referralStat && referral?.data === undefined && (
          <ReferralContent referralStat={referralStats} />
        )}
        {referralStat && referral?.data.length !== 0 && (
          <ReferralContent referralStat={referralStats} />
        )}
        {referralStat && referral?.data.length === 0 && null}
      </>
    );
  };
  useEffect(() => {
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleHarvestLists(user_id, token));
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
        <HarvestContent harvests={harvests} loading={loadingHarvest} />
      </div>
    </div>
  );
}

export default Harvest;
