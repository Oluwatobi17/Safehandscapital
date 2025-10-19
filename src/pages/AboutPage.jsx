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
            SafehandsCapital is an automated trading system that uses a reliable AI
            to help beginners and expert traders win at forex. Without investing
            your trading capital with us, our AI helps you to execute trades on
            your account and make profit while you focus on other areas of your
            daily activities. All you have to do is just to set up your MT4 or
            MT5 trading account and activate your membership in SafehandsCapital.
          </p>
          <p>
            After each trading month (20 trading days), users are expected to
            pay a 20% profit share, which is used for the maintenance of the AI.
            This also gives you an assurance that our AI will always make profit
            for you.
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

        <h3>Rankings</h3>

        <div>
          <Div
            img={mark1}
            h3Text="The Leader"
            pText="A leader would have 15 downlines and would be eligible to get compensated with 
                        a $100 affiliate bonus."
          />

          <Div
            img={mark2}
            h3Text="The Business Builder"
            pText="A business builder would have 25 downlines and would be eligible to get compensated 
                        with $300 affiliate bonus."
          />

          <Div
            img={mark2}
            h3Text="The Sapphire Executive"
            pText="To be eligible as a sapphire executive, the affiliate would have 60 downlines 
                        to get compensated with $700 affiliate bonus."
          />
          <Div
            img={star2}
            h3Text="The Sapphire Director"
            pText="A sapphire director would have 120 downlines to be eligible to get 
                        compensated with $1,500 affiliate bonus."
          />
          {/* <Div
            img={star1}
            h3Text="The Ruby Executive"
            pText="To be eligible as a ruby executive, the affiliate would have 1,500 
                        downlines to get compensated with $7,000 affiliate bonus."
          />
          <Div
            img={star3}
            h3Text="The Ruby Director"
            pText="A ruby director would have 5,000 downlines to be eligible to get compensated 
                        with $20,000 affiliate bonus."
          />
          <Div
            img={ruby1}
            h3Text="The Diamond Executive"
            pText="To be eligible as a diamond executive, the affiliate would have 15,000 
                        downlines to get compensated with $40,000 affiliate bonus."
          /> */}
          <Div
            img={ruby2}
            h3Text="The Diamond Director"
            pText="A diamond director would have 250 downlines to be eligible to get 
                        compensated with $4,000 affiliate bonus."
          />
          <Div
            img={ruby3}
            h3Text="The Evergreen Ambassador"
            pText="To be an Evergreen ambassador, the affiliate would have 600 downlines 
                        to get compensated with $10,000 affiliate bonus."
          />
        </div>

        <h3>
          NOTE: Downlines is the number of referrals that made use of your
          referral link in registering on SafehandsCapital.
        </h3>
      </div>

      <Footer />
    </div>
  );
}

export default AboutPage;
