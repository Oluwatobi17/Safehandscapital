import {HOST_URL} from "../redux/constants/hostURL";
const url = HOST_URL;

import axios from "axios";
import React, { useRef, useState } from "react";
import Position from "../components/Position";
import Subscription from "../components/Subscription";
import "../styles/dashboard.scss";
import { useDispatch, useSelector } from "react-redux";
import copy from "../assets/copy.png";
import { signout } from "../redux/actions/authAction";
import { useNavigate } from "react-router-dom";
import {
  handleCheckBalance,
  handleCheckSub,
  handlePrPay,
} from "../redux/actions/checkActions";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import { useEffect } from "react";
import Profit from "../components/Profit";
import Suspended from "../components/Suspended";
import DashBoardContent from "./DashBoardContent";
import { handleClosedPositions } from "../redux/actions/historyActions";
import { FaCheck, FaClipboard, FaMapMarked } from "react-icons/fa";
import { toast, ToastContainer } from "react-toastify";
import TourGuide from "../components/modals/TourGuide";

function DashboardHome() {
  let user_id;
  let token;
  let ref_id;
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status, loading } = useSelector((state) => state.checkSub);
  const checkSub = useSelector((state) => state.checkSub);
  const prPay = useSelector((state) => state.checkPrpay);
  const { history, loadingHistory } = useSelector((state) => state.history);
  const [ connectedAccounts, setConnectedAccounts ] = useState([]);
  const [copied, setCopied] = useState(false);
  const subStatus = status?.status;
  const prStatus = prPay.status?.status;

  const prDays = prPay.status?.days_left;
  const prAmt = prPay.status?.amount;
  const invoice_id = status?.invoice_id;
  const invoice_id2 = prPay.status?.invoice_id;

  if (userInfo?.userInfo) {
    user_id = userInfo.userInfo?.id;
    ref_id = user_id; // userInfo.info?.refID;
  }else if (userInfo?.info) {
    user_id = userInfo.info?.id;
    ref_id = user_id; // userInfo.info?.refID;
  }

  token = tokenVal;

  useEffect(()=>{
    axios
    .get(
      `${url}/api/connected_accounts/${user_id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setConnectedAccounts(response.data);
    })
    .catch((error) => {
      toast.error(error?.response?.data?.message)
    });
  }, [])
  
  const target = prPay.status?.date;
  const prDate = new Date(target).getTime();
  const SubStatusBar = ({ status, invoice_id }) => {
    return (
      <>
        {status === "owing" && <Subscription invoice_id={invoice_id} />}
        {status === "paid" && null}
        {!status || (status === undefined && <Subscription />)}
      </>
    );
  };
  // console.log(status);
  const ProfitStatusBar = ({
    status,
    prDays,
    prDate,
    prAmt,
    invoice_id,
    prTime,
  }) => {
    return (
      <>
        {status === "new_user" && null}
        {status === "owing" && prDays > 0 && (
          <Profit
            prDays={prDays}
            prDate={prDate}
            prTime={prTime}
            invoice_id={invoice_id}
          />
        )}
        {status === "owing" && prDays === 0 && (
          <Suspended invoice_id2={invoice_id2} prAmt={prAmt} />
        )}
        {status === "paid" && null}
        {(!status || status === undefined) && null}
      </>
    );
  };
  const prTime = prPay.status?.timestamp;
  useEffect(() => {
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleCheckSub(user_id, token));
    dispatch(handlePrPay(user_id, token));
    dispatch(handleClosedPositions(user_id, token));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  const textAreaRef = useRef(null); 
  const pText = `https://${window.location.hostname}/create?refID=${ref_id}`;
  // const pText = `http://127.0.0.1:5173/?invite_code=${ref_id}`;

  function copyToClipboard() {
    // this won't work in development but only in production because of its secure https protocol
    navigator.clipboard.writeText(pText);
    setCopied(true);
    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }
  return (
    <>
      {/* <TourGuide /> */}
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {!loading ? (
          <div
            className="relative"
            style={{
              width: "100%",
            }}
          >
            {subStatus !== "owing" && (
              <div className="mb-6 mt-5 w-full flex justify-end">
                <div className=" md:w-[479px] w-[379px] px-5 justify-between flex items-center h-[56px]">
                  <h6 className="text-[16px] font-bold">Referral Link</h6>
                  <div className="md:w-[320px] flex items-center px-4 w-[220px] justify-between h-full border border-gray-300 bg-white rounded-[8px]">
                    <div className=""> {/*w-[110px]*/}
                      <p
                        onClick={copyToClipboard}
                        title="Click to copy "
                        className=" cursor-pointer md:flex hidden text-[14px]"
                      >
                        {window.location.hostname}/create?refID={ref_id}
                      </p>
                      <p
                        onClick={copyToClipboard}
                        title="Click to copy "
                        className=" cursor-pointer md:hidden w-[140px] flex truncate ... text-[14px]"
                      >
                        {window.location.hostname}/create?refID={ref_id}
                      </p>
                    </div>
                    {!copied ? (
                      <div className="flex justify-center">
                        <button onClick={copyToClipboard} className="">
                          <img src={copy} alt="" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex justify-center">
                        <button className="">
                          <FaCheck />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
            <SubStatusBar status={subStatus} invoice_id={invoice_id} />
            <ProfitStatusBar
              status={prStatus}
              prDays={prDays}
              prAmt={prAmt}
              prTime={prTime}
              prDate={prDate}
              invoice_id={invoice_id2}
            />
            <DashBoardContent
              text="closed"
              head="Closed"
              history={connectedAccounts}
              loadingHistory={loadingHistory}
            />

            {/*  */}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[40rem]">
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
    </>
  );
}

export default DashboardHome;
{
  /* <div className="2xl:w-[40%] mb-10 xl:w-[60%] lg:w-[60%] h-36 mx-2 rounded-xl mt-10 bg-[#00c805] justify-around px-3 flex  flex-col space-x-3 items-center  xl:mx-10 button-shadow">
                <h1 className="font-bold w-full text-center">
                  Your referral link:
                </h1>
                <p
                  onClick={copyToClipboard}
                  title="Click to copy "
                  className=" cursor-pointer  items-center "
                >
                  https://evergreenffx.com?invite-code={ref_id}
                </p>
                <button
                  onClick={copyToClipboard}
                  className="w-20 h-8 button-shadow flex justify-center space-x-1 items-center bg-white"
                >
                  <span>Copy</span>
                  <FaClipboard />
                </button>
              </div> */
}
{
  /* <div className="mb-10">
                <div className="xl:w-[50rem] ml-2 px-2 items-center space-x-5 xl:flex hidden h-20 button-shadow rounded-xl mt-10 bg-[#00c805]">
                  <h1 className="font-bold w-32 ">Your referral link:</h1>
                  <div className="w-[25rem]">
                    <p
                      onClick={copyToClipboard}
                      title="Click to copy "
                      className=" cursor-pointer  "
                    >
                      https://evergreenffx.com?invite-code={ref_id}
                    </p>
                  </div>
                  {!copied ? (
                    <div className="flex justify-center">
                      <button
                        onClick={copyToClipboard}
                        className="w-20 h-10 rounded-[8px] button-shadow flex justify-center space-x-1 items-center bg-white"
                      >
                        <span>Copy</span>
                        <FaClipboard />
                      </button>
                    </div>
                  ) : (
                    <div className="flex justify-center">
                      <button className="w-24 h-10 rounded-[8px] button-shadow flex justify-center space-x-1 items-center bg-white">
                        <span>Copied</span>
                        <FaCheck />
                      </button>
                    </div>
                  )}
                </div>
                <div className="px-4">
                  <div className="xl:hidden flex w-full rounded-xl justify-around px-3   flex-col  bg-[#00c805] button-shadow h-36">
                    <h1 className="font-bold w-full text-center">
                      Your referral link:
                    </h1>
                    <p
                      onClick={copyToClipboard}
                      title="Click to copy "
                      className=" cursor-pointer text-center  items-center "
                    >
                      https://evergreenffx.com?invite-code={ref_id}
                    </p>
                    <div className="w-full flex justify-center">
                      <button
                        onClick={copyToClipboard}
                        className="w-20 h-10 rounded-[8px] button-shadow flex justify-center space-x-1 items-center bg-white"
                      >
                        <span>Copy</span>
                        <FaClipboard />
                      </button>
                    </div>
                  </div>
                </div>
                  </div> */
}
