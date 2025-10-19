import React from "react";
import warn from "../assets/warn-red.png";
import "../styles/trade-content.scss";

export const Disable = ({
  showDisableModal,
  setShowDisableModal,
  disableAcct,
  token,
  user_id,
  setChecked,
}) => {
  return (
    <div
      className="modal-bg-overlay"
      style={{ display: showDisableModal ? "block" : "none" }}
    >
      <div className="acct_modal disable_modal">
        <img src={warn} alt="image" />
        <div>
          <h2>Disable account</h2>
          <p>Are you sure you want to disable this account?</p>
        </div>
        <div>
          <p onClick={() => setShowDisableModal(false)}>No</p>
          <button
            onClick={() => {
              disableAcct(user_id, token);
              setChecked(false);
            }}
          >
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};
