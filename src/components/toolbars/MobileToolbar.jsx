import React from "react";
import "../../styles/toolbar.css";
import logo from "../../assets/ever10.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import pic from "../../assets/avatar.png";
import arrow from "../../assets/Vector.png";
import { FiLogOut } from "react-icons/fi";
import { motion } from "framer-motion";
import { signout } from "../../redux/actions/authAction";
const MobileToolbar = () => {
  const [toggleMenu, setToggleMenu] = useState(false);
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

  if (userInfo?.userInfo) {
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
    <nav className="nav_toolbar mobile_toolbar">
      <div className="toolbar_container">
        <div className="toolbar_items">
          <div className="logo_wrapper">
            <Link to={"/"}>
              <img className="logo " src={logo} alt="logo" />
            </Link>
          </div>

          {token === null ? (
            <button
              className="nav_btn cta_btn"
              onClick={() => navigate("/create")}
            >
              Get Started
            </button>
          ) : (
            <div className="w-[45%] space-x-2  relative  flex items-center h-20">
              <div
                onClick={() => setProfileMenu(!profileMenu)}
                className="w-full h-full space-x-2 flex items-center cursor-pointer"
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
                  <h3 className="truncate ... text-lg">
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
                  className="w-full absolute top-[4.5rem] left-0 button-shadow py-1 shadow-lg rounded-lg h-[6.4rem] bg-white"
                >
                  <div className="w-full border-b border-b-gray-400 px-3  py-3">
                    <Link
                      className="text-sm hover:text-green-500 transition duration-300"
                      to={"/dashboard/home"}
                    >
                      Go to Dashboard
                    </Link>
                  </div>
                  <div className="w-full flex px-3   space-x-3 py-3">
                    <button
                      onClick={logout}
                      className="text-sm flex items-center space-x-3 hover:text-red-500 transition duration-300"
                    >
                      <span>Log out</span>
                      <FiLogOut className="w-5 h-5 text-red-500" />
                    </button>
                  </div>
                </motion.div>
              )}
            </div>
          )}
          <div className="toolbar_actions">
            <button className="menu_btn" onClick={() => setToggleMenu(true)}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6 hamburger"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>
      <div className={`menu_list_wrapper ${toggleMenu && "menu_list_shown"}`}>
        <div>
          <button onClick={() => setToggleMenu(!toggleMenu)}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-6 h-6 close_menu"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <ul className="menu_list">
          <li>
            <Link to={"/"}>Home</Link>
          </li>

          <li>
            <Link to={"/about"}>About</Link>
          </li>
          {/*<li>
            <a href="https://evergreenffx.com/blog">Blog</a>
          </li>*/}
          <li>
            <Link to={"/contact-us"}>Contact</Link>
          </li>
          <li>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href={"https://support.evergreenffx.com/help-center"}
            >
              FAQs
            </a>
          </li>
          <li>
            <Link to={"/t-and-c"}>T & Cs</Link>
          </li>
          <li>
            <Link to={"/privacy"}>Privacy</Link>
          </li>
          <li>
            <button
              className="w-[141px] bg-[#191919] px-[16px] py-[12px] text-[18px] rounded-[8px] text-white"
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default MobileToolbar;
