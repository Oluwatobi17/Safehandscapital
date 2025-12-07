import {HOST_URL} from "../redux/constants/hostURL";
const url = HOST_URL;

import React, { useState } from "react";
import "../styles/dashboardcontent.scss";
import "../styles/position.scss";
import axios from "axios";
import Cookies from "js-cookie";
import img from "../assets/oc-lost.svg";
import Position from "../components/Position";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import { useDispatch, useSelector } from "react-redux";
import MobileClosedPositions from "../components/mobile_tables/MobileClosedPositions";
import Moment from 'moment';
import { toast } from "react-toastify";

const Content = ({ history, loadingHistory }) => {
  const [isLoading, setIsLoading] = useState(false);
  const token = useSelector((state) => state.token);
  
  const handleRenewSub = (id, sub) =>{
    
    if(isLoading) return;
    
    setIsLoading(true);
    
    axios
    .get(
      `${url}/api/renew_subscription/${id}/`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((response) => {
      setIsLoading(false);
      let user_details = JSON.parse(Cookies.get('userdetails'));
      let new_wallet = user_details?.wallet - sub;
      user_details = {...user_details, "wallet": new_wallet}
      Cookies.set("userdetails", JSON.stringify(user_details), {
        expires: 30 / (60 * 24),
      });

      // window.location.reload();
      window.location = "/dashboard/home";
    })
    .catch((error) => {
      setIsLoading(false);
      toast.error(error?.response?.data?.message)
    });
  }

  return (
    <div className="content-parent">
      <h2>Connected Accounts</h2>
      {!loadingHistory ? (
        <table>
          <tbody>
            <tr>
              <th>Broker</th>
              <th>Account No</th>
              <th>Terminal</th>
              <th>Subscription</th>
              <th>Expiry Date</th>
              <th> </th>
            </tr>
            {history?.map((hist, index) => {
              return (
                <tr key={index}>
                  <td>{hist.broker_server}</td>
                  <td>{hist.account_id}</td>
                  <td>{hist.broker.toLocaleUpperCase()}</td>
                  <td>${hist.subscription}</td>
                  <td id={new Date(hist.expiration)<new Date() ? 'expired':''}>{Moment(hist.expiration).format('YYYY.MM.DD')}</td>
                  <td>
                    <button className="renewButton" onClick={()=>handleRenewSub(hist.id, hist.subscription)}>Renew</button>
                  </td>
                  <td
                    style={{
                      color: `${
                        hist.profit_loss < 0 ? "#FF0000" : " #00C805"
                      }`,
                    }}
                  >
                    {hist.profit_loss}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
};

function DashBoardContent({ history, loadingHistory }) {
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
        {history?.length !== 0 ? (
          <div className="md:flex">
            <Content
              history={history}
              loadingHistory={loadingHistory}
            />
          </div>
        ) : (
          <div className="hidden md:flex">
            <Position text="Connected" head="Connected" />
          </div>
        )}
        {/* <MobileClosedPositions
          history={history}
          loadingHistory={loadingHistory}
        /> */}
      </div>
    </div>
  );
}

export default DashBoardContent;
