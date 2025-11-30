import React, { useState } from "react";
import { FiRefreshCw } from "react-icons/fi";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { handleTrack } from "../redux/actions/trackAction";

const TrackPayment = () => {
  const [withdrawal_address, setWithdrawal_address] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { loadingTrack, error } = useSelector((state) => state.track);

  let user_id;
  let token;

  // let withdrawal_add;
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
    // withdrawal_add = userInfo.info[0]?.w_address;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
    // withdrawal_add = userInfo.userInfo?.data[0]?.w_address;
  }
  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const dispatch = useDispatch();
  const tracker = () => {
    dispatch(
      handleTrack(user_id, withdrawal_address, token, setMessage, setStatus)
    );
  };
  return (
    <div>
      <div className="w-full   h-full  bg-white mt-4 p-6 max-w-[60rem] mx-auto">
        <div className="w-full h-full">
          <h1 className="text-[24px]">Track Payment</h1>
          <p className="text-gray-400">
            Fill in the form below to check the status of your payment
          </p>
          <div className="w-full flex lg:flex-row flex-col justify-between items-end">
            <div className="lg:w-[50%] w-full mt-5">
              <p className="text-[20px] font-bold">Wallet Address</p>
              <input
                type="text"
                placeholder="Enter your USDT(TRC20) Wallet Address"
                onChange={(e) => setWithdrawal_address(e.target.value)}
                className="w-[100%] px-2 h-[64px] border drop-shadow-md border-gray-400 mt-3 rounded-[8px] outline-none"
              />
              <span className="text-red-500 mt-2">
                {error?.response?.data?.message}
              </span>
            </div>

            <div className="lg:w-[38%] w-full lg:mt-0 mt-4 flex  h-full">
              {!loadingTrack ? (
                <button
                  type="button"
                  onClick={tracker}
                  className="w-[100%] h-[82px] bg-[#00C805] button-shadow font-bold rounded-[8px]"
                  // onClick={closeDisableMoal}
                >
                  Track Payment
                </button>
              ) : (
                <button
                  type="button"
                  disabled
                  // onClick={() => bonusWithdraw(pay_id, toast)}
                  className="w-[100%] h-[82px] bg-[#00C805] button-shadow font-bold rounded-[8px]"
                  // onClick={closeDisableModal}
                >
                  <ClipLoader />
                </button>
              )}
            </div>
          </div>
          <div className="w-full h-full mt-6 space-y-4 -gray-400">
            {message !== "" && (
              <>
                <p className="text-xl">Your Payment Response:</p>
                <div
                  className={`text-[19px] p-6 rounded-[16px] button-shadow ${
                    status === "N/A" && "bg-red-500 text-black"
                  } ${status === "finished" && "bg-[#00C805] text-black"} ${
                    status === "partially_paid" && "bg-yellow-500 text-black"
                  }`}
                >
                  <span>{message}</span>
                  <div>
                    {message !== "" && (
                      <button
                        type="button"
                        onClick={() => setMessage("")}
                        className=" flex p-2 text-black mt-2 button-shadow items-center space-x-2 bg-white rounded-[8px] justify-center w-[110px]"
                        // onClick={closeDisableModal}
                      >
                        <BsArrowCounterclockwise />
                        <span>Reset</span>
                      </button>
                    )}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackPayment;
