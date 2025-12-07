import React, { useState } from "react";
import "../../styles/toolbar.css";

import logo from "../../assets/evergreenffs_logo.png";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import pic from "../../assets/avatar.png";
import arrow from "../../assets/Vector.png";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { signout } from "../../redux/actions/authAction";

const DesktopToolbar = () => {
  const [profileMenu, setProfileMenu] = useState(false);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  let user_id;
  let token;
  let fullName;
  let gender;
  const dispatch = useDispatch();
  const logout = () => {
    dispatch(signout());
  };

  if (userInfo?.info) {
    user_id = userInfo?.userInfo?.id;
    fullName = userInfo?.userInfo?.fullname;
    gender = "Male";
  } 

  if (tokenVal?.userInfo) {
    token = tokenVal?.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const navigate = useNavigate();
  return (
    <nav className="nav_toolbar desktop_toolbar">
      <div className="desktop_toolbar_content">
        <div className="desktop_toolbar_content1">
          <Link to={"/"}>
            <img src={logo} alt="logo" />
          </Link>

          <ul className="desktop_menu_list">
            <li>
              <NavLink to={"/"}>Home</NavLink>
            </li>
            <li>
              <NavLink to={"/about"}>About</NavLink>
            </li>
            <li>
              <NavLink to={"/contact-us"}>Contact</NavLink>
            </li>
            <li>
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={"https://support.evergreenffx.com/help-center"}
              >
                FAQ
              </a>
            </li>
            <li>
              <NavLink to={"/t-and-c"}>T&Cs</NavLink>
            </li>
            <li>
              <NavLink to={"/privacy"}>Privacy</NavLink>
            </li>
          </ul>
        </div>
        {token === null ? (
          <div className="cta_btns_wrapper">
            <button
              className="cta_btn dsk_cta_btn"
              style={{ background: "#fff" }}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
            <button className="cta_btn" onClick={() => navigate("/create")}>
              Get Started
            </button>
          </div>
        ) : (
          <div className="w-[15%] space-x-4 relative  flex items-center h-20">
            <div
              onClick={() => setProfileMenu(!profileMenu)}
              className="w-full h-full flex cursor-pointer space-x-4 items-center"
            >
              <img
                src={pic}
                alt="user image"
                className="w-[45px] object-contain"
              />
              <div>
                {gender === "male" && (
                  <span className="font-bold">Hi Chief</span>
                )}
                {gender === "female" && (
                  <span className="font-bold">Hi Chieftess</span>
                )}
                <h3 className="truncate ...">
                  {fullName?.substring(0, 6)}
                  {fullName?.length >= 6 && "..."}
                </h3>
              </div>
              <button>
                {" "}
                <img src={arrow} alt="vector" />
              </button>
            </div>
            {profileMenu && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-full absolute top-[4.5rem] left-0 button-shadow py-1 shadow-lg rounded-lg bg-white"
              >
                <div className="w-full border-b border-b-gray-400 px-3  py-3">
                  <Link
                    className="text-lg hover:text-green-500 transition duration-300"
                    to={"/dashboard/home"}
                  >
                    Go to Dashboard
                  </Link>
                </div>
                <div className="w-full flex px-3   space-x-3 py-3">
                  <button
                    onClick={logout}
                    className="text-lg flex items-center space-x-3 hover:text-red-500 transition duration-300"
                  >
                    <span>Log out</span>
                    <FiLogOut className="w-5 h-5 text-red-500" />
                  </button>
                </div>
              </motion.div>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default DesktopToolbar;
