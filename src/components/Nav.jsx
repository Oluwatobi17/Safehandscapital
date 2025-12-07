import React from "react";
import "../styles/nav.scss";
import MobileToolbar from "./toolbars/MobileToolbar";
import DesktopToolbar from "./toolbars/DesktopToolbar";

function Nav() {
  return (
    <nav>
      <MobileToolbar />
      <DesktopToolbar />
    </nav>
  );
}

export default Nav;
