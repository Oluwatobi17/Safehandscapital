import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import TopPage from "../components/TopPage";
import img1 from "../assets/oc-startup.png";
import img2 from "../assets/oc-marketing.svg";
import mark1 from "../assets/mark1.png";
import mark2 from "../assets/mark2.png";
import star1 from "../assets/star1.png";
import star2 from "../assets/star2.png";
import star3 from "../assets/star3.png";
import ruby1 from "../assets/ruby1.png";
import ruby2 from "../assets/ruby2.png";
import ruby3 from "../assets/ruby3.png";
import "../styles/about-page.scss";
import { useEffect } from "react";

const Div = ({ img, h3Text, pText }) => {
  return (
    <div>
      <img src={img} alt="image" />
      <h3>{h3Text}</h3>
      <p>{pText}</p>
    </div>
  );
};

function AboutPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div className="about-page">
      <Nav />
      <TopPage headerText="About us" />

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div>
          <p>
            Safehands Capital is an automated trading service platform that uses a reliable software
            to help beginners and expert traders win at forex. Without investing
            your trading capital with us, our software helps you to execute trades on
            your account and make profit while you focus on other areas of your
            daily activities. Our trading software generates between 5-10% every trading month. All you have to do is just to set up your MT4 or
            MT5 trading account and activate your membership in Safehands Capital.
          </p>
          <p>
              <b>How to get started</b> <br/>
              In simple steps:
              <br/><br/>
              <ul>
                <li><b>i.</b> Sign up with any broker of your choosing or go with the one we recommend (and we don't recommend rubbish).</li>
                <br/>
                <li><b>ii.</b> Fund your account with a minimum of $1,000</li>
                <br/>
                <li><b>iii.</b> Proceed to safehandscapital.com, sign up and pay the registration fee to activate your account (don't forget you that we wave payment of registration fee when you use any our recommended brokers).</li>
                <br/>
                <li><b>iv.</b> Connect your account to our trading software (account connection is very easy but if you encounter any challenge kindly message support).</li>
                <br/>
                <li><b>v.</b> Sit back and let our trading software trade for you.</li>
              </ul>
            </p>
        </div>
        <img src={img1} alt="image" />
      </div>

      <div style={{ maxWidth: "1440px", margin: "0 auto" }}>
        <div>
          <img src={img2} alt="image" />
          <div>
            <h3>Affiliate</h3>
            <p>
              We love team building and we reward one when it comes our way.
              Although not compulsory to participate, the SafehandsCapital uses an
              affiliate ranking table to reward our members for new connections
              made between SafehandsCapital and new members.
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default AboutPage;
