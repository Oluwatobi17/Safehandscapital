import React, { useRef, useState } from "react";
import "../styles/homepage.scss";
import Nav from "../components/Nav";
import money from "../assets/oc-money-profits.svg";
import bulb from "../assets/oc-lightbulb.svg";
import screen from "../assets/Screen.png";
import target from "../assets/oc-target.svg";
import settings from "../assets/oc-cogs.svg";
import secure from "../assets/oc-secure.png";
import laptop from "../assets/oc-on-the-laptop.png";
import chart from "../assets/oc-bar-chart.svg";
import market from "../assets/oc-marketing.svg";
import phone from "../assets/iPhone 14 Pro.png";
import plastore from "../assets/playstore.png";
import appstore from "../assets/appstore.png";
import send from "../assets/oc-sending.png";
import { FaAngleDown, FaAngleUp } from "react-icons/fa";
import Footer from "../components/Footer";

const Div = ({ h3Text, pText }) => {
  const [add, setAdd] = useState(true);

  const div = useRef("");

  const addHeight = () => {
    div.current.classList.add("height");
    setAdd(false);
  };

  const removeHeight = () => {
    div.current.classList.remove("height");
    setAdd(true);
  };

  return (
    <>
      <div ref={div}>
        <div>
          <h3>{h3Text}</h3>
          {add ? (
            <FaAngleDown onClick={addHeight} size={25} cursor="pointer" />
          ) : (
            <FaAngleUp onClick={removeHeight} size={25} />
          )}
        </div>
        <p>{pText}</p>
      </div>
    </>
  );
};

function HomePage() {
  return (
    <div>
      <div className="home-parent">
        <Nav />
        <div className="container">
          <h3>Become a</h3>
          <div>
            <img src={bulb} alt="image" />
            <div>
              <h3>successful trader</h3>
              <p>
                Don’t quit forex trading; join our community and enjoy the
                profit ride.
              </p>
            </div>
            <img src={money} alt="image" />
          </div>

          <img src={screen} alt="screen" />
        </div>

        <div>
          <h2>
            Explore our <span>Features</span>
          </h2>

          <div>
            <div>
              <div>
                <h3>Reliable AI</h3>
                <p>
                  Our carefully crafted AI helps you win at Forex irrespective
                  of the market condition. You do not have to worry about
                  learning how the forex market works. Become a star trader
                  without doing the trading.
                </p>
              </div>
              <img src={target} alt="image" />
            </div>

            <div>
              <div>
                <h3>Automated Trading System</h3>
                <p>
                  While your money stays in your broker account, our AI has been
                  designed to execute and close trades on your account. You do
                  not have to worry about trading while carrying out your daily
                  activities.
                </p>
              </div>
              <main>
                <img src={settings} alt="image" />
              </main>
            </div>

            <div>
              <div>
                <h3>All Round Security</h3>
                <p>
                  You do not have to worry about the safety of your funds as you
                  are not required at any point in time to invest your capital
                  with us. We also work hard to ensure that your data is safe
                  and secure.
                </p>
              </div>
              <main>
                <img src={secure} alt="image" />
              </main>
            </div>

            <div>
              <div>
                <h3>24/7 Support</h3>
                <p>
                  Enjoy an always-accessible support team. We understand that
                  our community may have occasional support matters, this is why
                  we have created a team to attend to the issues of our
                  customers.
                </p>
              </div>
              <img src={laptop} alt="image" />
            </div>

            <div>
              <div>
                <h3>Detailed reporting</h3>
                <p>
                  With a concise data dashboard, monitor your trades and
                  earnings, withdrawals, rankings, and referrals.
                </p>
              </div>
              <main>
                <img src={chart} alt="image" />
              </main>
            </div>

            <div>
              <div>
                <h3>Earn on referrals</h3>
                <p>
                  At EvergreenFFX, we like to appreciate our customers for the
                  new connections created by them. Earn a 10% commission on all
                  referrals. You stand a chance to earn as much as $30,000.
                </p>
              </div>
              <main>
                <img src={market} alt="image" />
              </main>
            </div>
          </div>
        </div>

        <div className="download_section">
          <img src={phone} alt="image" />
          <div>
            <h2>Download our App</h2>
            <p>Evergreen makes trading easy for both experts and beginners.</p>

            <div className="download_section-stores">
              <img src={plastore} alt="image" />
              <img src={appstore} alt="image" />
            </div>
          </div>
        </div>

        <div>
          <h2>Frequently Asked Questions</h2>

          <Div
            h3Text="What Does EvergreenFFX do?"
            pText="EvergreenFFx provides a decentralized platform for FOREX TRADING that helps 
                    both beginners and experts make money while they focus on other areas of their daily lives."
          />
          <Div
            h3Text="How Much Does It Cost To Get Started?"
            pText="EvergreenFFx provides a decentralized platform for FOREX TRADING that helps 
                    both beginners and experts make money while they focus on other areas of their daily lives."
          />
          <Div
            h3Text="What is EvergreenFFX Profit Sharing?"
            pText="EvergreenFFx provides a decentralized platform for FOREX TRADING that helps 
                    both beginners and experts make money while they focus on other areas of their daily lives."
          />
          <Div
            h3Text="How Do I Make Payments?"
            pText="EvergreenFFx provides a decentralized platform for FOREX TRADING that helps 
                    both beginners and experts make money while they focus on other areas of their daily lives."
          />

          <Div
            h3Text="How Long Does It Take For Payments To Be Verified?"
            pText="EvergreenFFx provides a decentralized platform for FOREX TRADING that helps 
                    both beginners and experts make money while they focus on other areas of their daily lives."
          />
        </div>

        <div id="contact">
          <h2>Get in touch</h2>
          <div>
            <img src={send} alt="image" />

            <div>
              <div>
                <label htmlFor="name">Name</label>
                <input type="text" id="name" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email">Email</label>
                <input type="text" id="email" placeholder="Enter your email" />
              </div>

              <div>
                <label htmlFor="message">Email</label>
                <textarea id="message" placeholder="What do you want to say?" />
              </div>

              <button>Submit</button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default HomePage;
