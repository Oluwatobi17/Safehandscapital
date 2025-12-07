import React from "react";
import screen from "../../assets/Screen.png";

const Hero = () => {
  return (
    <header className="hero_section">
      <div className="hero_content">
        <div className="hero_content_text">
          <h1>
            Become a <br /> successful trader
          </h1>
          <p>
            Don’t quit forex trading; join our community and enjoy the
            profit ride
          </p>
        </div>
        <div className="hero_content_img">
          <img src={screen} alt="screen" />
        </div>
      </div>
    </header>
  );
};

export default Hero;
