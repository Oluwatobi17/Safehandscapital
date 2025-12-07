import React, { useEffect, useState } from "react";
import Suspended from "../components/Suspended";
import "../styles/trade-content.scss";
import deleteImg from "../assets/delete.png";

const Table = () => {
  const [width, setWidth] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 400) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  });

  return (
    <div className="table-parent">
      <div>
        <h3>Trade Settings</h3>
        <p>
          Fill in the form below correctly to connect your trading account to
          our AI powered system then sit back and enjoy the ride!.
        </p>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Acound ID</th>
            <th>Broker</th>
            <th>Added On</th>
            <th>Login State</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>75849</td>
            <td>MT4</td>
            <td>{width ? "1/7/22" : "15 May 2022 8:00 am"}</td>
            <td
              style={{
                color: "#00C805",
                fontWeight: 700,
              }}
            >
              Connected
            </td>
            <td>
              <label className="switch">
                <input type="checkbox" />
                <span className="slider"></span>
              </label>
              <img src={deleteImg} alt="image" />
            </td>
          </tr>
          <tr>
            <td>75849</td>
            <td>MT4</td>
            <td>{width ? "1/7/22" : "15 May 2022 8:00 am"}</td>
            <td
              style={{
                color: "#E74F48",
                fontWeight: 700,
              }}
            >
              Disconnected
            </td>
            <td>
              <label className="switch">
                <input type="checkbox" disabled />
                <span className="slider"></span>
              </label>
              <img src={deleteImg} alt="image" />
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

function TradeContentErr() {
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
        <Table />
      </div>
    </div>
  );
}

export default TradeContentErr;
