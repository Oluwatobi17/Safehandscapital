import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Side from "../components/Side";
import "../styles/createaccount.scss";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { regEmail } from "../redux/actions/authAction";

function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const reg_email = useSelector((state) => state.registerEmail);
  const { loading } = reg_email;
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(regEmail(email, navigate, toast));
  };

  return (
    <>
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
      <div className="auth_page_wrapper">
        <Side />
        <main className="create-main">
          <div className="create-main-content">
            <Logo />
            <div className="main-content">
              <h2>Open new account</h2>
              <p>Join the community of a new generation of investors.</p>
            </div>
            <form action="" onSubmit={handleSubmit}>
              <div className="create-email">
                <p>Your email</p>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jeff.brown@example.com"
                  required
                />
              </div>
              <div className="create-container">
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">
                  I agree to Safehands{" "}
                  <span>
                    <a href="/privacy">Privacy Policy</a>
                  </span>{" "}
                  &{" "}
                  <span>
                    <a href="/t-and-c">Terms</a>
                  </span>
                </label>
                {/* <div>
                  <p>I agree to Safehands</p>
                  <p>Privacy Policy </p> &<p> Terms.</p>
                </div> */}
              </div>
              {!loading ? (
                <button type="submit">Proceed</button>
              ) : (
                <button>
                  <ClipLoader size={22} />
                </button>
              )}
            </form>
            <div className="ask">
              <p>Already Have an Account?</p>
              <Link
                style={{
                  textDecoration: "none",
                  color: "#0088cc",
                  fontFamily: "DM Sans",
                }}
                to="/login"
              >
                Login
              </Link>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CreateAccount;
