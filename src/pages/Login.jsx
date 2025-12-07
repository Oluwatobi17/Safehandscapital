import React, { useRef, useState } from "react";
import Side from "../components/Side";
import logo_img from "../assets/evergreenffs_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import "../styles/login.scss";
import { signin } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

let hasLoaded = false;

function Login() {
  const [seePass, setSeePass] = useState(false);
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [IsError, setError] = useState(false);
  const passwordInput = useRef("");
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

  const handleSubmit = (e) => {
    e.preventDefault();
    hasLoaded = true;
    dispatch(signin(email, password, navigate, toast));
  };
  const Authed = useSelector((state) => state.token);
  const userInform = useSelector((state) => state.userInformation);
  const { loading, error } = userInform;
  const getUser = () => {
    if (Authed != null) {
      navigate("/dashboard/home");
    }
  };
  useEffect(() => {
    getUser();
  }, []);

  useEffect(() => {
    if(hasLoaded && loading==false) setError(true);
    else setError(false);
  }, [loading]);

  return (
    <div className="auth_page_wrapper">
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
      <Side />

      <main className="login-main">
        <div className="login-main-content">
          <div className="logo_img">
            <img src={logo_img} alt="logo" />
          </div>
          <div className="header">
            <h2>Login to your account</h2>
            <p>Log into your dashboard to keep track of your earnings.</p>
            {IsError && <p id="form_error">Invalid Login</p>}
          </div>
          <form onSubmit={handleSubmit} autoComplete="off">
            <div>
              <p>Your email</p>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jeffbrown@example.com"
                required
              />
            </div>
            <div className="password">
              <p>Password</p>
              <input
                type="password"
                className="pass"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                ref={passwordInput}
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
            <a
              href="https://evergreenffx.com/old/password-reset"
              target="_blank"
              className="text-[#0088cc]"
            >
              Forgot Password
            </a>
            {!loading ? (
              <button type="submit">Login</button>
            ) : (
              <button>
                <ClipLoader size={22} />
              </button>
            )}
            <div className="last-content">
              <p>New on our platform?</p>
              <Link
                to="/create"
                style={{
                  textDecoration: "none",
                  color: "#0088cc",
                  fontFamily: "DM Sans",
                  fontWeight: "700",
                }}
              >
                Create an account
              </Link>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Login;
