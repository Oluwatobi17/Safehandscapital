import React from 'react';
import Subscription from '../components/Subscription';
import Profit from '../components/Profit';
import Suspended from '../components/Suspended';
import "../styles/dashboard.scss";

function Heads() {
    return (
        <div style={{
            display: "flex",
            width: "100%"
        }}>
                <Profit />
                <Suspended />
                <Subscription />
            </div>
    );
}

export default Heads;