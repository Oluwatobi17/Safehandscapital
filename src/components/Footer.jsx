import React from "react";
import "../styles/footer.scss";
import plastore from "../assets/google_store_green.png";
import appstore from "../assets/apple_store_green.png";
import logo from "../assets/logo-white.png";
import twitter from "../assets/Twitter.png";
import linkedin from "../assets/linkedin.png";
import instagram from "../assets/Instagram.png";
import youtube from "../assets/Youtube.png";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

function Footer() {
  // alert(window.innerWidth)
  return (
    <footer>
      <div className="footer_max_width" style={{ paddingBottom: "2rem" }}>
        <img src={logo} alt="image" />
        <div>
          <h2>Quick Links</h2>
          <div>
            <p>
              <Link to={"/"}>Home</Link>
            </p>
            <p>
              <Link to={"/about"}>About</Link>
            </p>
            <p>
              <Link to={"/contact"}>Contact</Link>
            </p>
            <p>
              <a
                rel="noopener noreferrer"
                href={"https://support.evergreenffx.com/help-center"}
              >
                FAQ
              </a>
            </p>
            <p>
              <Link to={"/terms"}>Terms</Link>
            </p>
            <p>
              <Link to={"/privacy"}>Privacy</Link>
            </p>
          </div>
        </div>

        <div>
          <h2>Download our App</h2>
          <div className="store">
            <a href="https://play.google.com/store/apps/details?id=com.evergreen_ffx">
              <img src={plastore} alt="image" />
            </a>
            <div
              className="cursor-pointer"
              onClick={() => toast("Our iOs will be released soon. Check back")}
            >
              <img src={appstore} alt="image" />
            </div>
          </div>
        </div>
      </div>

      <p className="footer_max_width" style={{ paddingBottom: 0 }}>
        Risk Warning: CFDs are complex instruments and come with a high risk of losing money rapidly due to leverage. 71.33% of retail investor accounts lose money when trading CFDs with this provider. You should consider whether you understand how CFDs work and whether you can afford to take the high risk of losing your money.
        <span> Read more</span>
      </p>

      <div className="footer_max_width">
        <p>&copy; 2025 Safehands Capital. All rights reserved</p>
        <div className="socials">
          <a href="https://www.instagram.com/evergreen_ffx/">
            <img src={instagram} alt="image" />
          </a>
          <a href="https://twitter.com/evergreen_ffx?t=H3MCVGws3JUHdVjoAmPdng&s=08">
            <img src={twitter} alt="image" />
          </a>
          <a href="https://youtube.com/channel/UCh6Q1MOeLYeTbsj4pF_6L3Q">
            <img src={youtube} alt="image" />
          </a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
