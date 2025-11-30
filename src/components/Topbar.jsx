import React, { useContext, useState } from "react";
import "../styles/topbar.scss";
import wallet from "../assets/wallet.png";
import pic from "../assets/avatar.png";
import arrow from "../assets/Vector.png";
import {
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMenu,
} from "react-icons/ai";
import NavContext from "../context/NavContext";
import ProfileSettings from "./ProfileSettings";
import ProfileBody from "./ProfileBody";
import { SyncLoader } from "react-spinners";
import { useLocation } from "react-router";

function Topbar({ title, balance, loading, fullname, setOpen }) {
  const location = useLocation().pathname;
  const route_name = location.split("/")[2];

  const { showNav, profileCon } = useContext(NavContext);

  const showProfile = () => {
    if (profileCon.current.classList.contains("profile-hide")) {
      profileCon.current.classList.remove("profile-hide");
    } else {
      profileCon.current.classList.add("profile-hide");
    }
  };
  const [hideBalance, setHideBalance] = useState(false);

  return (
    <div className="top-parent">
      <div className="menu">
        <AiOutlineMenu
          className="icon menu_open_icon"
          onClick={() => setOpen(true)}
          style={{
            fontSize: "20px",
            position: "relative",
            top: "12px",
            cursor: "pointer",
          }}
        />
        <h2 className="page_title" style={{ textTransform: "capitalize" }}>
          {route_name === "home" ? "Dashboard" : route_name}
        </h2>
      </div>
      <div className="container flex w-[350px] justify-between">
        <div className="flex items-center space-x-2 px-3">
          <img src={wallet} alt="wallet" className="w-[38px] h-[38px]" />
          {!loading ? (
            <div>
              <p>Profit</p>
              {hideBalance ? (
                <h3 className="text-lg">${balance}</h3>
              ) : (
                <h3 className="text-xl font-bold">*****</h3>
              )}
            </div>
          ) : (
            <SyncLoader size={10} />
          )}
          <div>
            {hideBalance ? (
              <button onClick={() => setHideBalance(!hideBalance)}>
                <AiOutlineEye className="w-6 h-6" />
              </button>
            ) : (
              <button onClick={() => setHideBalance(!hideBalance)}>
                <AiOutlineEyeInvisible className="w-6 h-6" />
              </button>
            )}
          </div>
        </div>
        <div className="user flex items-center" onClick={showProfile}>
          {/* <div className="w-[32px] h-[32px] rounded-full overflow-hidden flex justify-center items-center bg-[#00C805]"> */}
          <img src={pic} alt="user image" className=" object-cover" />
          {/* </div> */}
          <div>
            <p>Verified</p>
            <h3 className="truncate ...">
              {fullname && fullname.substring(0, 6)}
              {fullname && fullname.length >= 6 && "..."}
            </h3>
          </div>
          <img src={arrow} alt="vector" className="vector_caret" />
        </div>
      </div>
      <ProfileSettings />
      <ProfileBody />
    </div>
  );
}

export default Topbar;
