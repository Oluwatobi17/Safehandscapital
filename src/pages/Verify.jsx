import React, { useEffect, useState } from "react";
import Side from "../components/Side";
import "../styles/verify.scss";
import Logo from "../components/Logo";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ClipLoader } from "react-spinners";
import { otpAction } from "../redux/actions/authAction";
import { toast, ToastContainer } from "react-toastify";
import OTPInput, { ResendOTP } from "otp-input-react";
function Verify() {
  const [otp, setOtp] = useState("");
  const id = useSelector((state) => state.registerEmail);
  const { userId } = id;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [whenEntered, setWhenEntered] = useState(false);
  const otpState = useSelector((state) => state.otpReducer);
  const { loading } = otpState;
  const user_id = userId?.data[0].user_id;
  // const handleChange = (element, index) => {
  //   //check if input is a number
  //   // if (isNaN(element.value)) return false;
  //   setOtp([...otp.map((d, idx) => (idx === index ? element.value : d))]);

  //   //focus on next input
  //   if (element.nextSibling) {
  //     element.nextSibling.focus();
  //   }
  // };

  useEffect(() => {
    if (user_id === undefined) {
      navigate("/");
    }
  }, []);
  const handleSubmit = async () => {
    // const code = otp.join("");

    dispatch(otpAction(user_id, otp, navigate, toast));
  };

  // console.log(otp);
  useEffect(() => {
    if (otp.length === 6) {
      handleSubmit();
    }
  }, [otp]);

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
      <div className="parent">
        <Side />
        <main className="verify-main">
          <div className="verify-main-content">
            <Logo />
            <div className="main-content">
              <div className="main-content-header">
                <h2>Email Verification</h2>
                <p>
                  Verify your email to help us confirm your access to the email
                  provided.
                </p>
              </div>
              <p
                style={{
                  fontWeight: 700,
                  fontSize: "14px",
                  marginTop: "7px",
                  color: "#696969",
                  textAlign: "left",
                }}
              >
                Not your email?{" "}
                <a
                  href="/create"
                  style={{
                    color: "#00C805",
                  }}
                >
                  Go back
                </a>
              </p>
              <form
                action=""
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="w-full flex justify-center ">
                  {/* {otp.map((data, index) => {
                    return (
                      <input
                        type="text"
                        name="otp"
                        maxLength="1"
                        key={index}
                        value={data}
                        onChange={(e) => handleChange(e.target, index)}
                        onFocus={(e) => e.target.select()}
                      />
                    );
                  })} */}
                  <OTPInput
                    value={otp}
                    onChange={setOtp}
                    autoFocus
                    OTPLength={6}
                    otpType="number"
                    disabled={false}
                    // secure
                    // inputClassName="border-green-400 border"
                    // className=""
                    inputStyles={{
                      border: "1px solid #00c805",
                      // width: "40px",
                      // height: "40px",
                      marginLeft: "-3px",
                    }}
                    style={{
                      width: "100%",
                      // background: "red",
                      // gap: "-49px",
                      display: "flex",
                      // justifyContent: "center",
                      // marginLeft: "8px",
                    }}
                  />
                </div>
                <button onClick={() => navigate("/create")}>
                  Re-enter email
                </button>{" "}
                <br />
                {!loading ? (
                  <button onClick={handleSubmit}>Verify</button>
                ) : (
                  <button>
                    <ClipLoader size={22} />
                  </button>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Verify;
