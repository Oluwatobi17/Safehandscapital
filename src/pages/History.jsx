import React, { useEffect } from "react";
import "../styles/history.scss";
import HistoryContent from "./HistoryContent";
import { handleClosedPositions } from "../redux/actions/historyActions";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { handleCheckBalance } from "../redux/actions/checkActions";
import { GridLoader } from "react-spinners";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
function History() {
  let user_id;
  let token;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.checkBalance);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { referral } = useSelector((state) => state.referral);
  const { history, loadingHistory } = useSelector((state) => state.history);
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

  useEffect(() => {
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleClosedPositions(user_id, token));
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
        {loadingHistory ? (
          <div
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Player
              src={animationData}
              className="w-32 h-32"
              speed={1}
              loop
              autoplay
            />
          </div>
        ) : (
          <HistoryContent history={history} />
        )}
        {/* <HistoryContent history={history} loading={loading} /> */}
        {/* <div className="history">
          <div>
            <h3>Trade History</h3>
            <p>
              View the records of trades EvergreenFFX AI has placed on your
              trading account!.
            </p>
          </div>

          <div>
            <img src={hand} alt="image" />
            <p>There is nothing to see here</p>
            <p>You haven't made any transaction.</p>
          </div>
        </div> */}
      </div>
    </div>
  );
}

export default History;
