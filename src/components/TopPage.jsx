import React from 'react';
import "../styles/top-page.scss";
import logo from "../assets/ever15 1.png";

function TopPage({headerText, pText}) {
    return (
        <div className='top-page'>
            <img src={logo} alt="logo" />
            <h2>{ headerText }</h2>
            <p>{ pText }</p>
        </div>
    );
}

export default TopPage;