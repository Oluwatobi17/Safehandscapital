import React, { useContext } from "react";
import "../styles/settings.scss";
import puzzle from "../assets/oc-puzzle.svg";
import NavContext from "../context/NavContext";
import AddAccount from "./modals/AddAccount";

function Settings({
  addImg,
  btnColor,
  bg,
  bg2,
  shadow,
  cursor,
  disabled,
  setShowAddAcctForm,
  status,
  statusTwo,
  prDays,
}) {
  const { showDetails } = useContext(NavContext);

  return (
    <div className="settings-parent">
      <div>
        <div>
          <h3>Trade Settings</h3>
          <p>
            Fill in the form below correctly to connect your trading account to
            our AI powered system then sit back and enjoy the ride!
          </p>
        </div>
        <div className="flex space-x-4 items-center">
          <AddAccount
            addImg={addImg}
            btnColor=" "
            bg={bg}
            bg2={bg2}
            shadow="2px 2px black"
            disabled={disabled}
            cursor={cursor}
          />
        </div>
      </div>
      <div>
        <img src={puzzle} alt="image" />
        <p>You haven't connected a trading account</p>
        <p>
          Click on <span>"Add account"</span> to proceed.
        </p>
      </div>
    </div>
  );
}

export default Settings;
