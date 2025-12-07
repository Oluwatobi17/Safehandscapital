import React from "react";

const ProfileContent = () => {
    return (
        <div className='profile-content'>
            <div>
                <p>Full Name</p>
                <input type="text" placeholder='jeff brown' />
            </div>

            <div>
                <p>Display Name</p>
                <input type="text" disabled placeholder='user255' />
            </div>

            <div>
                <p>Phone Number</p>
                <input type="number" placeholder='+123989374' />
            </div>

            <div>
                <button>Save changes</button>
            </div>
        </div>
    );
}


export default ProfileContent;