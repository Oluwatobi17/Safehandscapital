import React, { useState } from "react";
import "../styles/home.css";
import MobileToolbar from "../components/toolbars/MobileToolbar";
import DesktopToolbar from "../components/toolbars/DesktopToolbar";
import Hero from "../components/home_sections/Hero";
import Feature from "../components/home_sections/Feature";
import Store from "../components/home_sections/Store";
import Faq from "../components/home_sections/Faq";
import Contact from "../components/home_sections/Contact";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
// import { useLocation } from "react-use";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import { useDispatch, useSelector } from "react-redux";
import Popup from "../components/modals/Popup";

const Home = () => {
  // let user_id;
  // let token;
  // let fullName;

  // const navigate = useNavigate();
  // const dispatch = useDispatch();
  // const logout = () => {
  //   dispatch(signout());
  // };

  // const [isPage, setIsPage] = useState(false);
  // const [isOpen, setOpen] = useState(false);
  // let [open, setIsOpen] = useState(false);
  // const { loading, error, balance } = useSelector(
  //   (state) => state.checkBalance
  // );
  // const userInfo = useSelector((state) => state.userInformation);
  // const tokenVal = useSelector((state) => state.token);

  // if (userInfo.info) {
  //   user_id = userInfo.info[0]?.id;
  //   fullName = userInfo.info[0]?.fullname;
  // } else {
  //   user_id = userInfo.userInfo?.data[0]?.id;
  //   fullName = userInfo.userInfo?.data[0]?.fullname;
  // }

  // if (tokenVal.userInfo) {
  //   token = tokenVal.userInfo?.token;
  // } else {
  //   token = tokenVal;
  // }

  // const temp = Cookies.get("SECRET_TOKEN")
  //   ? JSON.parse(Cookies.get("SECRET_TOKEN"))
  //   : null;
  // useEffect(() => {
  //   // dispatch(handleCheckBalance(user_id, token));
  //   // if (location === "/dashboard" || location === "/dashboard/") {
  //   //   setIsPage(true);
  //   // } else {
  //   //   setIsPage(false);
  //   // }
  //   if (temp === null) {
  //     setIsOpen(!open);
  //   }
  // }, [location]);
  useEffect(() => {
    window.scroll(0, 0);
  }, []);

  const location = useLocation();
  const search = location.search;
  const invitecode = new URLSearchParams(search).get("invite-code");
  const invite_code = new URLSearchParams(search).get("invite_code");
  Cookies.set("invite-code", JSON.stringify(invitecode));
  Cookies.set("invite_code", JSON.stringify(invite_code));

  return (
    <main>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <MobileToolbar />
      <DesktopToolbar />
      <Hero />
      <Feature />
      <Popup />
      <Store />
      <Faq />
      <script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-8595078494392832"
        crossorigin="anonymous"
      ></script>
      {/* <Contact /> */}
      <Footer />
    </main>
  );
};

export default Home;
