import React from "react";
import Settings from "../components/Settings";
import add from "../assets/add-dark.png";
import AddAccount from "../components/modals/AddAccount";
// import AddAccount from "../components/AddAccount";

function TradeSubscribed() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Settings
          addImg={add}
          btnColor=" #191919"
          bg="#00C805"
          shadow="2px 2px black"
        />
        <AddAccount />
      </div>
    </div>
  );
}

export default TradeSubscribed;
