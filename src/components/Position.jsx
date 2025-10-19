import React from 'react';
import "../styles/position.scss";
import img from "../assets/oc-lost.svg";

function Position({text, head}) {
    return (
        <div className='open-parent'>
            <div>
                <h2>{head} Positions</h2>
            </div>

            <div>
                <img src={img} alt="image" />
                <p>You have no {text} position(s)</p>
            </div>
        </div>
    );
}

export default Position;