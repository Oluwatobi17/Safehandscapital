import React, { useEffect } from "react";
import "../styles/profile-settings.scss";
import profile from "../assets/profile.png";
import arrow from "../assets/left-arrow.png";
import manage from "../assets/manage.png";
import email from "../assets/email.png";
// import dark from '../assets/dark-mode.png';
import contact from "../assets/contact.png";
import PT from "../assets/p&t.png";
import about from "../assets/about.png";
import faq from "../assets/faq.png";
import { useContext } from "react";
import NavContext from "../context/NavContext";
import EditProfleModal from "./modals/EditProfleModal";

function ProfileSettings() {
  const { profileCon } = useContext(NavContext);

  useEffect(() => {
    document.addEventListener("click", (e) => {
      if (
        !e.target.matches(".profile-container") &&
        !e.target.matches(".profile-container > *") &&
        !e.target.matches(".profile-container div .switch > *") &&
        !e.target.matches(".profile-container div > *") &&
        !e.target.matches(".user") &&
        !e.target.matches(".user > *") &&
        !e.target.matches(".user div > *")
      ) {
        if (!profileCon.current.classList.contains("profile-hide")) {
          profileCon.current.classList.add("profile-hide");
        }
      }
    });
  }, []);

  return (
    <div ref={profileCon} className="profile-container profile-hide">
      <div>
        <h3>Profile & Account</h3>
        <div>
          <EditProfleModal />
        </div>
      </div>

      <div>
        <h3>Preference</h3>
        {/* <div>
          <div>
            <img src={email} alt="image" />
            <p>Email Notification</p>
          </div>
          <label className="switch">
            <input
              type="checkbox"
            />
            <span className="slider"></span>
          </label>
        </div> */}
      </div>

      <div className="h-full space-y-5 mt-4">
        {/*  class<h3>General</h3> */}
        <a href="/contact-us" className="flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <img src={contact} alt="image" />
            <p>Contact Us</p>
          </div>
          <img src={arrow} alt="image" />
        </a>

        <a href="/" className="flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <img src={faq} alt="image" />
            <p>FAQs</p>
          </div>
          <img src={arrow} alt="image" />
        </a>
        <a className="flex justify-between items-center" href="/t-and-c">
          <div className="flex items-center space-x-5">
            <img src={PT} alt="image" />
            <p>Privacy & Terms</p>
          </div>
          <img src={arrow} alt="image" />
        </a>
        <a href="/about" className="flex justify-between items-center">
          <div className="flex items-center space-x-5">
            <img src={about} alt="image" />
            <p>About Safehands</p>
          </div>
          <img src={arrow} alt="image" />
        </a>
      </div>
    </div>
  );
}

export default ProfileSettings;
