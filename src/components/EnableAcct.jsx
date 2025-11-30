import React from "react";
import warn from "../assets/warn-red.png";
import "../styles/trade-content.scss";

export const EnableAccount = ({
  showEnableModal,
  setShowEnableModal,
  enableAcct,
  token,
  user_id,
  setChecked,
}) => {
  return (
    <div
      className="modal-bg-overlay"
      style={{ display: showEnableModal ? "grid" : "none" }}
    >
      <div className="acct_modal enable_modal">
        <img src={warn} alt="image" />
        <div>
          <h2>Enable account</h2>
          <p>Are you sure you want to enable this account?</p>
        </div>
        <div>
          <p onClick={() => setShowEnableModal(false)}>No</p>
          <button
            onClick={() => {
              enableAcct(user_id, token);
              setChecked(true);
              setShowEnableModal(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
