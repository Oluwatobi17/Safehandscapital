import React from 'react';
import logo_img from '../assets/evergreenffs_logo.png'

function Logo({use_circles}) {
    return (
        <div>
            <img src={logo_img} alt="logo" />
                {use_circles &&
                    <div className="container">
                        <div className="circle circle-one">1</div>
                        <div className="dash"></div>
                        <div className="circle circle-two">2</div>
                        <div className="dash dash-two"></div>
                        <div className="circle circle-three">3</div>
                    </div>
                }
        </div>
    );
}

export default Logo;