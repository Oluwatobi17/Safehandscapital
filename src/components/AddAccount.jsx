import React, { useContext, useRef, useState } from "react";
import "../styles/add-account.scss";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import warn from "../assets/warning.png";
import cancel from "../assets/Cancel.png";
import NavContext from "../context/NavContext";
import { useDispatch, useSelector } from "react-redux";
import { handleAddTradeAcct } from "../redux/actions/tradeActions";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { useEffect } from "react";
import Cookies from "js-cookie";

function AddAccount({ showAddAcctForm, setShowAddAcctForm }) {
  let user_id;
  let token;

  const [seePass, setSeePass] = useState(false);
  const passwordInput = useRef("");

  const [account_name, setAccountName] = useState("");
  const [account_id, setAccountID] = useState("");
  const [account_password, setAccountPassword] = useState("");
  const [broker, setBroker] = useState("");
  const [broker_server, setBrokerServer] = useState("");

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const seePassword = () => {
    setSeePass(true);
    passwordInput.current.type = "text";
  };

  const hidePassword = () => {
    setSeePass(false);
    passwordInput.current.type = "password";
  };

  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const addTrade = useSelector((state) => state.addTradeAcct);

  const loading = addTrade.loading;

  if (userInfo.info) {
    user_id = userInfo.info?.id;
  } else {
    user_id = userInfo.userInfo?.data?.id;
  }
  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const addTradeStatus = addTrade?.addStatus;

  const handleConnectToAI = (e) => {
    e.preventDefault();
    dispatch(
      handleAddTradeAcct(
        user_id,
        token,
        account_id,
        account_name,
        account_password,
        broker,
        broker_server
      )
    );
  };

  useEffect(() => {
    if (addTradeStatus) {
      setShowAddAcctForm(false);
      window.location.href = "/dashboard/trade";
    }
  }, [addTradeStatus]);

  return (
    <div
      className="add-parent"
      style={{ display: showAddAcctForm ? "flex" : "none" }}
    >
      <div>
        <h2>Add account</h2>
        <img
          src={cancel}
          alt="cancel"
          onClick={() => setShowAddAcctForm(false)}
        />
      </div>

      <form onSubmit={handleConnectToAI}>
        <div>
          <p>Account Name</p>
          <input
            type="text"
            placeholder="jeff brown"
            name="account_name"
            value={account_name}
            onChange={(e) => setAccountName(e.target.value >= 25)}
            required
          />
        </div>

        <div>
          <p>Account ID</p>
          <input
            type="number"
            placeholder="35485"
            name="account_id"
            value={account_id}
            onChange={(e) => setAccountID(e.target.value)}
            required
          />
        </div>

        <div>
          <img src={warn} alt="image" />
          This value should be valid
        </div>

        <div className="password">
          <p>Password</p>
          <input
            type="password"
            className="pass"
            ref={passwordInput}
            name="account_password"
            value={account_password}
            onChange={(e) => setAccountPassword(e.target.value)}
            required
          />
          <i>
            {seePass ? (
              <FiEyeOff className="see-pass" onClick={hidePassword} />
            ) : (
              <IoEyeOutline className="see-pass" onClick={seePassword} />
            )}
          </i>
        </div>

        <div>
          <p>Select Broker/Technology</p>
          <input
            type="text"
            placeholder="Select"
            name="broker"
            value={broker}
            onChange={(e) => setBroker(e.target.value)}
            required
          />
        </div>

        <div>
          <p>Broker Server</p>
          <input
            type="text"
            placeholder="Input your broker server"
            name="broker_server"
            value={broker_server}
            onChange={(e) => setBrokerServer(e.target.value)}
            required
          />
        </div>

        {!loading ? (
          <button type="submit">Connect to AI</button>
        ) : (
          <button style={{ minWidth: "10ch" }}>
            <ClipLoader size={22} />
          </button>
        )}
      </form>
    </div>
  );
}

export default AddAccount;
