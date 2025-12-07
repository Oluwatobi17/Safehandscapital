import React from "react";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import "../styles/404.scss";

import { useDispatch, useSelector } from "react-redux";
import { signout } from "../redux/actions/authAction";
import { Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { handleCheckBalance } from "../redux/actions/checkActions";
import { useEffect } from "react";
import { useState } from "react";
import Cookies from "js-cookie";
import Logoutmodal from "../components/modals/Logoutmodal";
import TourGuide from "../components/modals/TourGuide";
// import TourGuide from "../components/modals/TourGuide";
import trading from "../assets/trading.png";
import time from "../assets/time.png";
import referral from "../assets/referral.png";
import bonus from "../assets/bonus.png";
import ticket from "../assets/ticket.png";
import invoice from "../assets/invoice.png";
import cashlesspayment from "../assets/cashless-payment.png";
function Dashboard() {
  let user_id;
  let token;
  let fullName;
  let balance;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const location = useLocation().pathname;
  const logout = () => {
    dispatch(signout());
  };
  const [page, setPage] = useState(0);
  const [isPage, setIsPage] = useState(false);
  const [isOpen, setOpen] = useState(false);
  let [open, setIsOpen] = useState(false);
  // const { loading, error, balance } = useSelector(
  //   (state) => state.checkBalance
  // );
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  
  if (userInfo?.userInfo) {
    user_id = userInfo.userInfo?.id;
    fullName = userInfo.userInfo?.fullName;
    balance = userInfo.userInfo?.wallet;
  }else if (userInfo?.info) {
    user_id = userInfo.info?.id;
    fullName = userInfo.info?.fullName;
    balance = userInfo.info?.wallet;
  }
  
  if (tokenVal) {
    token = tokenVal;
  }

  const temp = Cookies.get("SECRET_TOKEN")
    ? JSON.parse(Cookies.get("SECRET_TOKEN"))
    : null;
  useEffect(() => {
    // dispatch(handleCheckBalance(user_id, token));
    if (location === "/dashboard" || location === "/dashboard/") {
      setIsPage(true);
    } else {
      setIsPage(false);
    }
    if (temp === null) {
      setIsOpen(!open);
    }
  }, [location]);
  const [currentPageTitle, setCurrentPageTitle] = useState("");
  const [position, setPosition] = useState("");

  const ModalTitles = [
    {
      title: "TRADE",
      path: "Trade",
      img: trading,
    },
    { title: "HISTORY", path: "History", img: time },
    { title: "REFERRALS", path: "Referrals", img: referral },
    { title: "TRACK PAYMENTS", path: "Track Payments", img: cashlesspayment },
    { title: "BONUSES", path: "Bonuses", img: bonus },
    { title: "INVOICES", path: "Invoices", img: invoice },
    { title: "HARVEST", path: "Harvest", img: "arvest" },
    { title: "TICKETS", path: "Tickets", img: ticket },
  ];
  return (
    <section
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <Logoutmodal open={open} logout={logout} setIsOpen={setIsOpen} />
      {isPage ? (
        <div className="error">
          <div className="error_texts">
            <h1>404 - Page not found</h1>
            <p>The page you tried to reach does not exist.</p>
            <Link to={"/dashboard/home"}>Go to Dashboard</Link>
          </div>
        </div>
      ) : (
        <>
          <SideBar
            Logout={logout}
            isOpen={isOpen}
            setOpen={setOpen}
            ModalTitles={ModalTitles}
            page={page}
            setPage={setPage}
            currentPageTitle={currentPageTitle}
            setCurrentPageTitle={setCurrentPageTitle}
            position={position}
            setPosition={setPosition}
          />
          <div
            style={{
              width: "100%",
            }}
          >
            <Topbar
              title="Dashboard"
              balance={balance}
              loading={false}
              error={""}
              fullname={fullName}
              setOpen={setOpen}
            />
            {/* {location !== "/dashboard/leaderboard" && (
              <div className="absolute bottom-[80px] right-[50px]">
                <div className="lg:w-[465px] h-[180px] rounded-[16px] button-shadow"></div>
              </div>
            )} */}

            <Outlet />
          </div>
        </>
      )}
    </section>
  );
}

export default Dashboard;
