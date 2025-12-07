import React from "react";
import "../styles/dashboard.scss";
import Position from "../components/Position";
import Profit from "../components/Profit";

function DashBoardWarning() {
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
        <Profit />
        <Position text="closed" head="Closed" />
      </div>
    </div>
  );
}

export default DashBoardWarning;
