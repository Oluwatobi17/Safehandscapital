import React from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import { ToastContainer, toast } from "react-toastify";
import { update_profile } from "../../../redux/actions/updateDetails";

const ProfileSettings = ({ closeModal }) => {
  const [fullname, setFullname] = useState("");
  const [phone, setPhone] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const userInfo = useSelector((state) => state.userInformation);
  const { loadingUpdatePro } = useSelector((state) => state.updateProfile);
  const tokenVal = useSelector((state) => state.token);
  let user_id;
  let token;
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  const handleSubmit = () => {
    dispatch(update_profile(fullname, phone, user_id, token, navigate, toast));
  };

  return (
    <div className="">
      <form className="profile-content">
        <div>
          <p>Full Name</p>
          <input
            value={fullname}
            onChange={(e) => setFullname(e.target.value)}
            type="text"
            placeholder={
              userInfo.info
                ? `${userInfo.info[0]?.fullname}`
                : `${userInfo.userInfo?.data[0]?.fullname}`
            }
          />
        </div>

        <div>
          <p>Username</p>
          <input
            type="text"
            disabled
            placeholder={
              userInfo.info
                ? `${userInfo.info[0]?.username}`
                : `${userInfo.userInfo?.data[0]?.username}`
            }
          />
        </div>

        <div>
          <p>Phone Number</p>
          <input
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            type="text"
            placeholder={
              userInfo.info
                ? `${userInfo.info[0]?.phone}`
                : `${userInfo.userInfo?.data[0]?.phone}`
            }
          />
        </div>

        <div>
          {!loadingUpdatePro ? (
            <button onClick={handleSubmit} type="button">
              Save changes
            </button>
          ) : (
            <button disabled type="button">
              <ClipLoader size={22} />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default ProfileSettings;
