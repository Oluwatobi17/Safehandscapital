import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { update_profile } from "../../../redux/actions/updateDetails";

const ProfileSettings = ({ closeModal }) => {
  const [fullName, setFullname] = useState("");
  const [phoneno, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInformation);
  const { loadingUpdatePro } = useSelector((state) => state.updateProfile);
  const tokenVal = useSelector((state) => state.token);
  let user_id;
  let token;
  if (userInfo.info) {
    user_id = userInfo.info?.id;
  } else {
    user_id = userInfo.userInfo?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  // const handleSubmit = () => {
  //   dispatch(update_profile(fullName, phoneno, user_id, token, navigate, toast));
  // };

  return (
    <div className="">
      <form className="profile-content">
        <div>
          <p>Full Name</p>
          <input
            value={fullName}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            disabled
            placeholder={
              userInfo.info
                ? `${userInfo.info?.fullName}`
                : `${userInfo.userInfo?.fullName}`
            }
          />
        </div>

        <div>
          <p>Email</p>
          <input
            type="text"
            disabled
            placeholder={
              userInfo.info
                ? `${userInfo.info?.email}`
                : `${userInfo.userInfo?.email}`
            }
          />
        </div>

        <div>
          <p>Phone Number</p>
          <input
            value={phoneno}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            disabled
            placeholder={
              userInfo?.info
                ? `${userInfo.info?.phoneno}`
                : `${userInfo.userInfo?.phoneno}`
            }
          />
        </div>

        {/*<div>
          {!loadingUpdatePro ? (
            <button onClick={handleSubmit} type="button">
              Save changes
            </button>
          ) : (
            <button disabled type="button">
              <ClipLoader size={22} />
            </button>
          )}
        </div>*/}
      </form>
    </div>
  );
};

export default ProfileSettings;
