import React from "react";
import target from "../../assets/features/oc-target.png";
import cogs from "../../assets/features/oc-cogs.png";
import secure from "../../assets/features/oc-secure.png";
import laptop from "../../assets/features/oc-on-the-laptop.png";
import barchart from "../../assets/features/oc-bar-chart.png";
import marketing from "../../assets/features/oc-marketing.png";

const Feature = () => {
  return (
    <section className="feature_section">
      <div className="feature_content_wrapper">
        <div className="feature_content">
          <h1>
            Explore our <span>Features</span>
          </h1>
          <div className="features">
            <article className="feature_card feature_card_1">
              <div className="feature_card_text">
                <h2>Reliable Trading Software</h2>
                <p>
                  Our carefully crafted trading software helps you win at Forex irrespective
                  of the market condition. You do not have to worry about
                  learning how the forex market works. Become a star trader
                  without doing the trading.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={target} alt="target" />
              </div>
            </article>
            <article className="feature_card feature_card_2">
              <div className="feature_card_text">
                <h2>Automated Trading System</h2>
                <p>
                  While your money stays in your broker account, our trading software has been
                  designed to execute and close trades on your account. You do
                  not have to worry about trading while carrying out your daily
                  activities.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={cogs} alt="cogs" />
              </div>
            </article>
            <article className="feature_card feature_card_3">
              <div className="feature_card_text">
                <h2>All Round Security</h2>
                <p>
                  You do not have to worry about the safety of your funds as you
                  are not required at any point in time to invest your capital
                  with us. We also work hard to ensure that your data is safe
                  and secure.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={secure} alt="secure" />
              </div>
            </article>
            <article className="feature_card feature_card_4">
              <div className="feature_card_text">
                <h2>24/7 Support</h2>
                <p>
                  Enjoy an always-accessible support team. We understand that
                  our community may have occasional support matters, this is why
                  we have created a team to attend to the issues of our
                  customers.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={laptop} alt="on the laptop" />
              </div>
            </article>
            <article className="feature_card feature_card_5">
              <div className="feature_card_text">
                <h2>Detailed reporting</h2>
                <p>
                  With a concise data dashboard, monitor your trades and
                  earnings, withdrawals, and referrals.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={barchart} alt="barchart" />
              </div>
            </article>
            <article className="feature_card feature_card_6">
              <div className="feature_card_text">
                <h2>Earn on referrals</h2>
                <p>
                  At Safehands Capital, we like to appreciate our customers for the
                  new connections created by them. Earn a 20% commission on each referral.
                </p>
              </div>
              <div className="feature_card_img">
                <img src={marketing} alt="marketing" />
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Feature;
