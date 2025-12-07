import React from "react";
import { Link } from "react-router-dom";
import applestore from "../../assets/appstore.png";
import playstore from "../../assets/playstore.png";
import iphone from "../../assets/iphone14.png";
import { toast } from "react-toastify";

const Store = () => {
  return (
    <section className="store_section">
      <div className="store_content_wrapper">
        <div className="store_content">
          <div className="mobile_phone">
            <img src={iphone} alt="iphone" />
          </div>
          <div className="store_content_text">
            <h3>Download our App</h3>
            <p>Safehands Capital makes trading easy for both experts and beginners.</p>
          </div>
          <div className="store_badges">
            <a href="https://play.google.com/store/apps/details?id=com.Safehands Capital_ffx">
              <img src={playstore} alt="play store" />
            </a>
            <Link
              to={"#"}
              onClick={() => toast("Our iOs will be released soon. Check back")}
            >
              <img src={applestore} alt="apple store" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Store;
