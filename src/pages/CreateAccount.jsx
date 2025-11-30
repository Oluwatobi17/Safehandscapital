import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import Side from "../components/Side";
import "../styles/createaccount.scss";
import "../styles/login.scss";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { toast, ToastContainer } from "react-toastify";
import { register } from "../redux/actions/authAction";

function CreateAccount() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [seePass, setSeePass] = useState(false);
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [phoneno, setPhoneno] = useState("");
  const passwordInput = useRef("");
  const reg_email = useSelector((state) => state.registerEmail);
  const { loading } = reg_email;
  let refID = 1;

  useEffect(()=>{
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has('refID')) refID = searchParams.get('refID'); 
  }, []);

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
    dispatch(register(fullName, email, password, phoneno, refID, navigate, toast));
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
        <main className="login-main">
          <div className="login-main-content">
            <Logo use_circles={false} />
            <div className="header">
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
              <div>
                <p>Full Name</p>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Jeff Brown"
                  required
                />
              </div>
              <div>
                <p>Password</p>
                <input
                  type="password"
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
              <div>
                <p>Phone Number</p>
                <input
                  type="text"
                  value={phoneno}
                  onChange={(e) => setPhoneno(e.target.value)}
                  placeholder="+2348181002500"
                  required
                />
              </div>
              <div className="create-container">
                <input type="checkbox" id="agree" required />
                <label htmlFor="agree">
                  {" "} I agree to Safehands{" "}
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
                <button type="submit">Create Account</button>
              ) : (
                <button>
                  <ClipLoader size={22} />
                </button>
              )}
            </form>
            <div className="ask">
              <p>Already Have an Account?
              <Link
                style={{
                  textDecoration: "none",
                  color: "#0088cc",
                  fontFamily: "DM Sans",
                }}
                to="/login"
              >
                <b> Login</b>
              </Link>
              </p>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default CreateAccount;
