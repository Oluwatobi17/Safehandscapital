import React from "react";
import Position from "../components/Position";
import Suspended from "../components/Suspended";
import "../styles/dashboard.scss";

function DashboardSuspended() {
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
        <Suspended />
        <Position text="closed" head="Closed" />
      </div>
    </div>
  );
}

export default DashboardSuspended;
