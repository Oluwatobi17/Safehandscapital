import React, { useContext } from "react";
import NavContext from "../context/NavContext";
import { FaTimes } from "react-icons/fa";
import "../styles/trade-content.scss";
import deleteImg from "../assets/delete.png";

export const DeleteAccountConfirmation = () => {
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
