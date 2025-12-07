import {HOST_URL} from "../redux/constants/hostURL";
const url = HOST_URL;

import React, { useEffect, useState } from "react";
import "../styles/referrals.scss";
import people from "../assets/oc-hi-five.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Moment from 'moment';
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

function Referrals() {
  let user_id;
  let token;
  let withdrawal_add;
  let myName;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [referrals, setReferrals] = useState();
  const [loadingHistory, setLoadingHistory] = useState(false);
  const [history, setHistory] = useState([]);
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
    user_id = userInfo.info?.id;
    withdrawal_add = userInfo.info?.w_address;
    myName = userInfo.info?.fullName;
  } else {
    user_id = userInfo.userInfo?.id;
    withdrawal_add = userInfo.userInfo?.w_address;
    myName = userInfo.userInfo?.fullName;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  // console.log(referralStats);
  const ReferralRecord = () => {
    setLoadingHistory(true);
    axios
    .get(
      `${url}/api/referallist/${user_id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setLoadingHistory(false);
      
      let results = response.data.filter(data => data.fullName!=myName);
      setHistory(results);
    })
    .catch((error) => {
      setLoadingHistory(false);
      toast.error(error?.response?.data?.message)
    });
  };

  useEffect(() => {
    ReferralRecord();
  }, []);
  return (
    <div className="content-parent">
      <h2>Refered Accounts</h2>
      {!loadingHistory ? ( <>
        <table>
          <tbody>
            <tr>
              <th>Name</th>
              <th>Date Joined</th>
            </tr>
            {history?.map((hist, index) => {
              return (
                <tr key={index}>
                  <td>{hist.fullName}</td>
                  <td>{Moment(hist.date_joined).format('YYYY.MM.DD')}</td>
                </tr>
              );
            })}
          </tbody>
        </table>

        {history.length==0 && <div style={{"textAlign": "center"}}>You have not Refered anyone yet!</div>}
        </>
      ) : (
        <div className="w-full flex justify-center items-center ">
          <Player
            src={animationData}
            className="w-32 h-32"
            speed={1}
            loop
            autoplay
          />
        </div>
      )}
    </div>
  );
}

export default Referrals;
