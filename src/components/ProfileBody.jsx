import React, { useContext, useEffect } from 'react';
import "../styles/profile-body.scss";
import { FaTimes } from 'react-icons/fa';
import NavContext from "../context/NavContext";
import ProfileContent from './ProfileContent';
import AccountContent from './AccountContent';

const ProfileBody = () => {

    const { prof, account, profileParent, render, setRender } = useContext(NavContext);


    return (
        <div className='profile-parent' ref={profileParent}>
            <div>
                <h3>User Profile</h3>
                <i onClick={() => {
                    profileParent.current.style.display = "none";
                }} style={{
                    backgroundColor: "rgb(237, 232, 232)",
                    borderRadius: "50%",
                    textAlign: "center",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    padding: "8px",
                    cursor: "pointer"
                }}><FaTimes /></i>
            </div>
            <div>
                <p ref={prof} onClick={() => {
                    setRender(<ProfileContent />);
                    if (!prof.current.classList.contains("active")) {
                        prof.current.classList.add("active");
                        prof.current.classList.add("paddings");
                        account.current.classList.remove("active");
                        account.current.classList.remove("paddings");
                    }
                    }} className='active paddings'>Profile</p>
                <p ref={account} onClick={() => {
                    setRender(<AccountContent />);
                    if (!account.current.classList.contains("active")) {
                        account.current.classList.add("active");
                        account.current.classList.add("paddings");
                        prof.current.classList.remove("active");
                        prof.current.classList.remove("paddings");
                    }
                    }}>Account</p>
            </div>
            {render}
        </div>
    );
}

export default ProfileBody;