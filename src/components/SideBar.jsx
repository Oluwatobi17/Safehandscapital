import React, { useContext, useRef } from "react";
import "../styles/sidebar.scss";

import logo from "../assets/ever15 1.png";
import img1 from "../assets/category-2.png";
import dashboardDark from "../assets/dashboard-dark.png";
import trade from "../assets/trade.png";
import tradeDark from "../assets/trade-dark.png";
import refresh from "../assets/refresh.png";
import refreshDark from "../assets/clock.png";
import profile from "../assets/profile-2user.png";
import profileDark from "../assets/people.png";
import receipt from "../assets/receipt-text.png";
import receiptDark from "../assets/receipt-bold.png";
import money from "../assets/money-send.png";
import moneyDark from "../assets/money-dark.png";
import coin from "../assets/coin.png";
import coinDark from "../assets/coin-dark.png";
import logout from "../assets/logout.png";
import { Link, useMatch, useResolvedPath } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-use";
import TourGuide from "./modals/TourGuide";

const Div = ({ img, imgd, text, to, ModalTitles, page, currentPageTitle }) => {
  const location = useLocation();
  const resolvedPath = useResolvedPath(to);
  const isActive = useMatch({
    path: resolvedPath.pathname,
    end: true,
  });
  // console.log(text);
  // const texttt = ModalTitles?.find((x) => {
  //   // console.log(x.path, text);
  //   return x.path === "Trade";
  // });
  // const final = texttt?.map((x) => {
  //   return x.path;
  // });
  // console.log(texttt.path);
  // console.log(currentPageTitle === text, currentPageTitle);
  // console.log(final);
  return (
    <div className={isActive ? "active " : ""}>
      <Link
        to={to}
        className={`  ${text === currentPageTitle && " z-[1000]"}  side-div`}
      >
        <img src={isActive ? imgd : img} alt="image" />
        <p>{text}</p>
      </Link>
    </div>
  );
};

function SideBar({
  Logout,
  isOpen,
  setOpen,
  ModalTitles,
  currentPageTitle,
  page,
  setPage,
  setCurrentPageTitle,
  position,
  setPosition,
}) {
  const handleClick = (e) => {
    if (
      e.target.classList.contains("side-parent toggle") ||
      e.target.classList.contains("side-parent show_sidebar") ||
      e.target.classList.contains("menu_open_icon")
    ) {
      setOpen(!isOpen);
    } else {
      setOpen(false);
    }
  };
  useEffect(() => {
    document.body.addEventListener("click", handleClick);
    return () => {
      document.body.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <>
      {/* <div className="lg:flex hidden">
        <TourGuide
          page={page}
          setPage={setPage}
          setCurrentPageTitle={setCurrentPageTitle}
          currentPageTitle={currentPageTitle}
          position={position}
          setPosition={setPosition}
          ModalTitles={ModalTitles}
        />
      </div> */}
      <div className={`side-parent ${isOpen ? "show_sidebar" : "toggle"}`}>
        <div>
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>
        </div>
        <Div
          to="/dashboard/home"
          imgd={dashboardDark}
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          img={img1}
          text="Dashboard"
        />
        <Div
          to="/dashboard/trade"
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          img={trade}
          imgd={tradeDark}
          text="Connections"
        />
        <Div
          to="/dashboard/wallet"
          img={coin}
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          imgd={refreshDark}
          text="Wallet"
        />
        <Div
          to="/dashboard/referrals"
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          img={profile}
          imgd={profileDark}
          text="Referrals"
        />
        {/* <Div
          to="/dashboard/track"
          img={money}
          ModalTitles={ModalTitles}
          imgd={moneyDark}
          text="Track Payments"
        />
        <Div
          to="/dashboard/bonuses"
          img={coin}
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          imgd={coinDark}
          text="Bonuses"
        />

        <Div
          to="/dashboard/invoices"
          img={receipt}
          imgd={receiptDark}
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          text="Invoices"
        />
        <Div
          to="/dashboard/harvest"
          img={money}
          imgd={moneyDark}
          ModalTitles={ModalTitles}
          currentPageTitle={currentPageTitle}
          text="Harvest"
        />
        <a
          target="_blank"
          href="https://support.evergreenffx.com"
          img={coin}
          imgd={coinDark}
          className="w-full flex space-x-3 ml-6 mt-1"
          text="Tickets"
        >
          <img src={coin} alt="" />
          <span>Tickets</span>
        </a> */}
        <div className="line"></div>
        <div className="logout cursor-pointer" onClick={Logout}>
          <img src={logout} alt="image" />
          <p>Logout</p>
        </div>
      </div>
    </>
  );
}

export default SideBar;
