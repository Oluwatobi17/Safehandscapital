import React, { useState, useRef } from "react";
import { FiEyeOff } from "react-icons/fi";
import { IoEyeOutline } from "react-icons/io5";
import key from "../assets/key.png";

const AccountContent = () => {
  const [emailRender, setEmailRender] = useState(true);
  const [passwordRender, setPasswordRender] = useState(true);
  const [walletRender, setWalletRender] = useState(true);

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
    const [seePass, setSeePass] = useState(false);
    const passwordInput = useRef("");

    const seePassword = () => {
      setSeePass(true);
      passwordInput.current.type = "text";
    };

    const hidePassword = () => {
      setSeePass(false);
      passwordInput.current.type = "password";
    };

    return (
      <div className="email">
        <div className="password">
          <input
            style={{ width: "100%" }}
            type="password"
            ref={passwordInput}
            placeholder="Enter New Password"
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

        <div>
          <button onClick={() => setPasswordRender(true)}>Cancel</button>
          <button onClick={() => setPasswordRender(true)}>Save changes</button>
        </div>
      </div>
    );
  };

  const Wallet = () => {
    return (
      <div className="email wallet">
        <p>USDT(TRC20) Withdrawal Address</p>
        <input
          type="text"
          placeholder="Enter your USDT(TRC20) Wallet Address"
        />
        <div className="wallet-otp">
          <p>Please enter Generated OTP</p>
          <input type="text" />
        </div>
        <main>
          <img src={key} alt="image" /> <p>Tap to Generate OTP</p>
        </main>
        <div
          style={{
            justifyContent: "flex-start",
          }}
        >
          <button onClick={() => setWalletRender(true)}>Cancel</button>
          <button onClick={() => setWalletRender(true)}>Save changes</button>
        </div>
      </div>
    );
  };

  return (
    <div className="profile-content account">
      <div>
        <h3>Email</h3>
        {emailRender ? (
          <div>
            <p>samuelomorayewa17@gmail.com</p>
            <p
              onClick={() => {
                setEmailRender(false);
                setPasswordRender(true);
                setWalletRender(true);
              }}
              className="special"
            >
              Change email
            </p>
          </div>
        ) : (
          <Email />
        )}
      </div>

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

      <div>
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
      </div>
    </div>
  );
};

export default AccountContent;
