import React, { useRef, useState } from "react";
import Side from "../components/Side";
import logo_img from "../assets/evergreenffs_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import "../styles/login.scss";
import { forgetPassword } from "../redux/actions/authAction";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { useEffect } from "react";

let hasLoaded = false;

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [IsError, setError] = useState(false);
  const [IsLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    hasLoaded = true;
    // console.log(IsLoading);
    if(IsLoading) return;

    setIsLoading(true);
    
    dispatch(forgetPassword(email, navigate, toast));
    setTimeout(()=> setIsLoading(false), 5000)
  };
  const Authed = useSelector((state) => state.token);
  const userInform = useSelector((state) => state.userInformation);
  const { loading, error } = userInform;

  // useEffect(() => {
  //   if(IsError) setIsLoading(false);
    
  //   if(IsError) setTimeout(()=> setError(false), 5000);
  // }, [IsError]);

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
            <h2>Forgot Password</h2>
            <p>Reset your Safehands Capital account password.</p>
            {/* {IsError && <p id="form_error">Invalid Email</p>} */}
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
            <Link
                to="/login"
                style={{
                    textDecoration: "none",
                    color: "#0088cc",
                    fontFamily: "DM Sans",
                    fontWeight: "700",
                }}
                >
                I have an account and I know my password?
            </Link>
            {!IsLoading ? (
              <button type="submit">Reset Password</button>
            ) : (
              <button>
                <ClipLoader size={22} />
              </button>
            )}
            
          </form>
          <p>New on our platform? 
                <Link
                to="/create"
                style={{
                    textDecoration: "none",
                    color: "#0088cc",
                    fontFamily: "DM Sans",
                    fontWeight: "700",
                }}
                >
                &nbsp; Create an account
                </Link>
            </p>
        </div>
      </main>
    </div>
  );
}

export default ForgotPassword;
