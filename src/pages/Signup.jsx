import React, { useEffect, useRef, useState } from "react";
import Side from "../components/Side";
import "../styles/signup.scss";
import { IoEyeOutline } from "react-icons/io5";
import { FiEyeOff } from "react-icons/fi";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { register } from "../redux/actions/authAction";
import { ClipLoader } from "react-spinners";
import Cookies from "js-cookie";
import { ToastContainer, toast } from "react-toastify";
import PhoneInputWithCountrySelect from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { MuiTelInput } from "mui-tel-input";
function Signup() {
  const [seePass, setSeePass] = useState(false);
  const [fullName, setFullName] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [refId, setRefId] = useState("");
  const [password, setPassword] = useState("");
  const passwordInput = useRef("");
  const strength = useRef("");
  const div1 = useRef("");
  const div2 = useRef("");
  const div3 = useRef("");

  const reg = useSelector((state) => state.register);
  const { loading } = reg;
  const phone = phoneNumber.replace(/\s+/g, "");
  const finalPhone = phone.replace(/\+/g, "");
  // console.log(finalPhone);
  // console.log(phone);
  const seePassword = () => {
    setSeePass(true);
    passwordInput.current.type = "text";
  };

  const hidePassword = () => {
    setSeePass(false);
    passwordInput.current.type = "password";
  };

  const handleInput = (e) => {
    if (e.target.value.length < 1) {
      div1.current.style.background = "#D1D1D1";
      if (strength.current.innerHTML == "Weak") {
        strength.current.innerHTML = "";
      }
    } else if (e.target.value.length < 6) {
      strength.current.innerHTML = "Weak";
      div1.current.style.background = "#00C805";
    }
    if (e.target.value.length >= 6 && /[A-Z]/.test(e.target.value)) {
      strength.current.innerHTML = "Medium";
      div2.current.style.background = "#00C805";
    } else {
      div2.current.style.background = "#D1D1D1";
      if (strength.current.innerHTML == "Medium") {
        strength.current.innerHTML = "Weak";
      }
    }
    if (
      e.target.value.length >= 6 &&
      /[A-Z]/.test(e.target.value) &&
      /[^a-zA-Z0-9]/.test(e.target.value)
    ) {
      strength.current.innerHTML = "Strong";
      div3.current.style.background = "#00C805";
    } else {
      div3.current.style.background = "#D1D1D1";
      if (strength.current.innerHTML == "Strong") {
        strength.current.innerHTML = "Medium";
      }
    }
  };

  const ref = Cookies.get("invite-code")
    ? JSON.parse(Cookies.get("invite-code"))
    : null;
  const ref2 = Cookies.get("invite_code")
    ? JSON.parse(Cookies.get("invite_code"))
    : null;
  useEffect(() => {
    setRefId(ref || ref2);
  }, []);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(
      register(fullName, userName, password, finalPhone, refId, navigate, toast)
    );
  };
  // console.log(ref2);

  return (
    <div className="parent">
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

      <main className="signup-main">
        <div className="signup-main-content">
          <Logo />
          <div className="header">
            <h2>Personal Details</h2>
            <p>Please fill your personal details below </p>
          </div>
          <form action="" onSubmit={handleSubmit}>
            <div>
              <p>REF ID</p>
              <input
                type="text"
                // value={}
                value={ref === "" ? ref : refId}
                onChange={(e) => setRefId(e.target.value)}
                // placeholder="we124edj"
                required
              />
            </div>
            <div>
              <p>Your name</p>
              <input
                type="text"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="jeff brown"
                required
              />
            </div>
            <div>
              <p>Username</p>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                placeholder="jeff brown"
                required
              />
            </div>
            <section className="weird">
              {/* <p>Phone number</p> */}
              <MuiTelInput
                value={phoneNumber}
                id="phoneNumber"
                label="Phone Number"
                defaultCountry="NG"
                onChange={(newNumber) => {
                  setPhoneNumber(newNumber);
                }}
                className=""
                // onBlur={formik.handleBlur}
                // error={formik.touched.phone && formik.errors.phone && true}
                // helperText={formik.touched.phone && formik.errors.phone}
                // sx={roundedInput}
              />
            </section>

            <div className="password">
              <p>Password</p>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onInput={handleInput}
                className="pass"
                ref={passwordInput}
              />
              <i>
                {seePass ? (
                  <FiEyeOff className="see-pass" onClick={hidePassword} />
                ) : (
                  <IoEyeOutline className="see-pass" onClick={seePassword} />
                )}
              </i>
            </div>
            <section className="strength">
              <p>Password Strength: </p>
              <p ref={strength}></p>
            </section>
            <section className="lines">
              <div ref={div1}></div>
              <div ref={div2}></div>
              <div ref={div3}></div>
            </section>
            {!loading ? (
              <button className="btns" type="button" onClick={handleSubmit}>
                Create account
              </button>
            ) : (
              <button className="btns" type="button">
                <ClipLoader size={22} />
              </button>
            )}
          </form>
        </div>
      </main>
    </div>
  );
}

export default Signup;
