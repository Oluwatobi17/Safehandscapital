import React, { useContext } from "react";
import NavContext from "../context/NavContext";
import deleteImg from "../assets/delete.png";
import "../styles/trade-content.scss";

export const DeleteAccount = ({ showDeleteModal, setShowDeleteModal }) => {
  //   const { del, showDelConfirm } = useContext(NavContext);

  return (
    <div
      style={{ display: showDeleteModal ? "flex" : "none" }}
      className="disable"
    >
      <img src={deleteImg} alt="image" />
      <div>
        <h2>Delete account</h2>
        <p>
          Are you sure you want to delete this account? This action can't be
          undone.
        </p>
      </div>
      <div>
        <p onClick={() => setShowDeleteModal(false)}>No</p>
        <button
        //   className="b"
        //   onClick={() => {
        //     del.current.style.display = "none";
        //     showDelConfirm();
        //   }}
        >
          Yes
        </button>
      </div>
    </div>
  );
};
