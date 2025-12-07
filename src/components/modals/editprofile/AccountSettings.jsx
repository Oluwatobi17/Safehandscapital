import React, { useState, useRef } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import key from "../../../assets/key.png";
import { signout } from "../../../redux/actions/authAction";
import {
  otpGenerate,
  update_password,
  update_withdrawal,
} from "../../../redux/actions/updateDetails";

const AccountSettings = () => {
  const [emailRender, setEmailRender] = useState(true);
  const [passwordRender, setPasswordRender] = useState(true);
  const [walletRender, setWalletRender] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { loadingGenerate } = useSelector((state) => state.generateOtp);

  let user_id;
  let token;
  let email;
  let wallet_address;
  if (userInfo.info) {
    user_id = userInfo.info?.id;
    email = userInfo.info?.email;
    wallet_address = userInfo.info?.walletAddress;
  } else {
    user_id = userInfo.userInfo?.id;
    email = userInfo.userInfo?.email;
    wallet_address = userInfo.userInfo?.walletAddress;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }

  const Email = () => {
    return (
      <div className="email">
        <p>
          Current email: <span>samuelomorayewa17@gmail.com</span>
        </p>
        <div>
          <input type="text" placeholder="jeff brown" />
        </div>
        <div>
          <button onClick={() => setEmailRender(true)}>Cancel</button>
          <button onClick={() => setEmailRender(true)}>Save changes</button>
        </div>
      </div>
    );
  };

  const Password = () => {
    const [password, setPassword] = useState("");
    const [seePass, setSeePass] = useState(false);
    const passwordInput = useRef("");
    const [newpassword, setNewPassword] = useState("");
    const [seeNewPass, setSeeNewPass] = useState(false);
    const [isLoading, setIsLoading]  = useState(false);
    const newpasswordInput = useRef("");

    const seePassword = () => {
      setSeePass(true);
      passwordInput.current.type = "text";
    };

    const hidePassword = () => {
      setSeePass(false);
      passwordInput.current.type = "password";
    };
    const seeNewPassword = () => {
      setSeeNewPass(true);
      newpasswordInput.current.type = "text";
    };

    const hideNewPassword = () => {
      setSeeNewPass(false);
      newpasswordInput.current.type = "password";
    };
    const handleSubmit = () => {
      if(!isLoading){
        setIsLoading(true);
        dispatch(update_password(password, newpassword, user_id, token, navigate, toast)).then(
          () => {
            setIsLoading(false);
            setPassword("");
            setNewPassword("");
          }
        );
      }
    };

    return (
      <div className="email">
        <div className="password">
          <input
            style={{ width: "100%" }}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            ref={passwordInput}
            placeholder="Enter Old Password"
          />
          <i
            style={{
              position: "absolute",
              top: "18px",
              right: "10px",
            }}
          >
            {seePass ? (
              <FiEyeOff onClick={hidePassword} />
            ) : (
              <IoEyeOutline onClick={seePassword} />
            )}
          </i>
        </div>
        <div className="password">
          <input
            style={{ width: "100%" }}
            type="password"
            value={newpassword}
            onChange={(e) => setNewPassword(e.target.value)}
            ref={newpasswordInput}
            placeholder="Enter New Password"
          />
          <i
            style={{
              position: "absolute",
              top: "18px",
              right: "10px",
            }}
          >
            {seeNewPass ? (
              <FiEyeOff onClick={hideNewPassword} />
            ) : (
              <IoEyeOutline onClick={seeNewPassword} />
            )}
          </i>
        </div>

        <div>
          <button onClick={() => setPasswordRender(true)}>Cancel</button>
          <button onClick={handleSubmit}>Save changes</button>
        </div>
      </div>
    );
  };

  const Wallet = () => {
    const [withdrawal_address, setWithdrawal_address] = useState("");
    const [otp, setOtp] = useState("");
    const generate_otp = () => {
      dispatch(otpGenerate(user_id, token, toast));
    };
    const { loadingUpdatePro } = useSelector((state) => state.updateWithdrawal);
    const update_withdraw = () => {
      dispatch(
        update_withdrawal(withdrawal_address, otp, user_id, token, toast)
      );
    };
    return (
      <div className="email wallet">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
        <p>USDT(TRC20) Withdrawal Address</p>
        <input
          type="text"
          placeholder="Enter your USDT(TRC20) Wallet Address"
          onChange={(e) => setWithdrawal_address(e.target.value)}
        />
        <div className="wallet-otp">
          {/* <p>Please enter Generated OTP</p> */}
          <input
            placeholder="Please enter Generated OTP"
            onChange={(e) => setOtp(e.target.value)}
            type="text"
          />
        </div>
        <main onClick={generate_otp}>
          <img src={key} alt="image" /> <p>Tap to Generate OTP</p>
        </main>
        {loadingGenerate ? <ClipLoader size={16} /> : <></>}
        <div
          style={{
            justifyContent: "flex-start",
          }}
        >
          <button onClick={() => setWalletRender(true)}>Cancel</button>
          {!loadingUpdatePro ? (
            <button className="lg:w-[40%] w-[100%]" onClick={update_withdraw}>
              Save changes
            </button>
          ) : (
            <button className="lg:w-[40%] w-[100%]" disabled>
              <ClipLoader size={16} />
            </button>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="profile-content account">
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* <div className="w-full h-10"></div> */}

      <div>
        <h3>Password</h3>
        {passwordRender ? (
          <div>
            <p
              onClick={() => {
                setPasswordRender(false);
                setEmailRender(true);
                setWalletRender(true);
              }}
              className="special"
            >
              Change password
            </p>
          </div>
        ) : (
          <Password />
        )}
      </div>

      {/* <div>
        <h3>Withdrawal Address</h3>
        {walletRender ? (
          <div style={{ marginRight: "-10px" }}>
            <p>USDT(TRC20) Withdrawal Address</p>
            <p
              className="special"
              onClick={() => {
                setWalletRender(false);
                setPasswordRender(true);
                setEmailRender(true);
              }}
            >
              Update wallet address
            </p>
          </div>
        ) : (
          <Wallet />
        )}
      </div> */}
      {/* <div className="w-full flex justify-between bg-red-400"> */}
      {/* <div> */}
      {/* <section className="w-full flex justify-between ">
        <h3 className="w-[60%]"></h3>
        <span className="w-[40%] truncate">{wallet_address}</span>
      </section> */}
      {/* </div> */}
      {/* <Email /> */}
      {/* </div> */}
    </div>
  );
};

export default AccountSettings;
