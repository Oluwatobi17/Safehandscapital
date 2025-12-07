import React, { useContext } from "react";
import "../styles/trade-content.scss";
import deleteImg from "../assets/delete.png";
import warn from "../assets/warn-red.png";
import NavContext from "../context/NavContext";
import { FaTimes } from "react-icons/fa";
import { useState } from "react";
import { useEffect } from "react";

const Table = ({ id, broker, broker_server, status }) => {
  console.log(id);
  const { showDisable, checkInput, showDel } = useContext(NavContext);
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
        {/* <p>
          Fill in the form below correctly to connect your trading account to
          our AI powered system then sit back and enjoy the ride!
        </p> */}
      </div>

      <table>
        <tbody>
          <tr>
            <th>Acount ID</th>
            <th>Broker</th>
            <th>Added On</th>
            <th>Login State</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>{id}</td>
            <td>{broker}</td>
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
                <input
                  type="checkbox"
                  onChange={() => {
                    showDisable();
                  }}
                  checked
                />
                <span ref={checkInput} className="slider"></span>
              </label>
              <img onClick={showDel} src={deleteImg} alt="image" />
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

const Disable = () => {
  const { disable, checkInput } = useContext(NavContext);

  return (
    <div ref={disable} className="disable">
      <img src={warn} alt="image" />
      <div>
        <h2>Disable account</h2>
        <p>Are you sure you want to disable this account?</p>
      </div>
      <div>
        <p onClick={() => (disable.current.style.display = "none")}>No</p>
        <button
          onClick={() => {
            if (!checkInput.current.classList.contains("slid")) {
              checkInput.current.classList.add("slid");
              checkInput.current.disable;
              disable.current.style.display = "none";
            }
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

const DeleteAccount = () => {
  const { del, showDelConfirm } = useContext(NavContext);

  return (
    <div ref={del} className="disable">
      <img src={deleteImg} alt="image" />
      <div>
        <h2>Delete account</h2>
        <p>
          Are you sure you want to delete this account? This action can't be
          undone.
        </p>
      </div>
      <div>
        <p onClick={() => (del.current.style.display = "none")}>No</p>
        <button
          className="b"
          onClick={() => {
            del.current.style.display = "none";
            showDelConfirm();
          }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};

const DeleteAccountConfirmation = () => {
  const { delConfirm } = useContext(NavContext);

  return (
    <div ref={delConfirm} className="disable confirm">
      <section
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          // background: "red",
          width: "90%",
          paddingTop: "10px",
        }}
      >
        <img src={deleteImg} alt="image" />
        <i
          onClick={() => (delConfirm.current.style.display = "none")}
          style={{
            backgroundColor: "rgb(237, 232, 232)",
            borderRadius: "50%",
            textAlign: "center",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "8px",
            cursor: "pointer",
          }}
        >
          <FaTimes />
        </i>
      </section>
      <div>
        <h2>Delete account</h2>
        <p>
          Before you can delete this account, you are required to pay 20% profit
          share.
        </p>
      </div>
      <div>
        <button>Pay Now</button>
      </div>
    </div>
  );
};

function TradeContent() {
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
        <Table />
        <Disable />
        <DeleteAccount />
        <DeleteAccountConfirmation />
      </div>
    </div>
  );
}

export default TradeContent;
