import React, { useContext } from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import referralImg from "../assets/refferal-icon.png";
import NavContext from "../context/NavContext";
import WithdrawalMOdal from "../components/modals/WithdrawalModal";
import ReferralTables from "../components/mobile_tables/ReferralTables";
import { Player } from "@lottiefiles/react-lottie-player";
import animationConfetti from "../assets/Money rain.json";
import Cookies from "js-cookie";
const Content = ({ referral }) => {
  // console.log(referral);
  return (
    <div className="content-parent">
      <table>
        <thead>
          <tr>
            <th>Fullname</th>
            <th>Username</th>
            <th>Amount</th>
            <th>Payment Type</th>
          </tr>
        </thead>
        <tbody>
          {referral?.data.map((refer, index) => {
            return (
              <tr key={index}>
                <td>{refer.fullname}</td>
                <td>{refer.username}</td>
                <td>{`${refer.amount}`}</td>
                <td>{refer.payment_type}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function ReferralContent({ referral, referralStat, withdrawal_add }) {
  let con;
  if (Cookies.get("confetti2") === null) {
  } else {
    con = Cookies.get("confetti2");
  }
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      {/* <SideBar /> */}
      <div
        className="relative"
        style={{
          width: "100%",
        }}
      >
        {/* <Topbar title="Referrals" /> */}
        <WithdrawalMOdal
          referralStat={referralStat}
          withdrawal_add={withdrawal_add}
        />
        {con && (
          <div className="w-[100%]  left[5%] absolute top-[20%] ">
            <Player
              src={animationConfetti}
              className="w-full h-[30rem]"
              speed={1}
              loop
              autoplay
            />
          </div>
        )}
        <Content referral={referral} />
        <ReferralTables referral={referral} />
        {/* <RequestWithdrawal /> */}
      </div>
    </div>
  );
}

export default ReferralContent;
