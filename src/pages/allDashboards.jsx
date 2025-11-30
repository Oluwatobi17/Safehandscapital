import React from 'react';
import Position from '../components/Position';
import SideBar from '../components/SideBar';
import Subscription from '../components/Subscription';
import Suspended from '../components/Suspended';
import Topbar from '../components/Topbar';
import "../styles/dashboard.scss";

function Dashboard() {
    return (
        <div style={{
            display: "flex",
            width: "100%"
        }}>
            <SideBar />
            <div style={{
                width: "100%"
            }}>
                <Topbar title="Dashboard" />
                <Subscription />
                <Suspended />
                <Position text="open" head="Open" />
                <Position text="closed" head="Closed" />
            </div>
        </div>
    );
}

const OpenContent = () => {
    return (
        <div className='content-parent'>
            <h3>Open Positions</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Account ID</th>
                        <th>Side</th>
                        <th>Symbol</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>49503</td>
                        <td style={{
                            color: "#00C805"
                        }}>Buy</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 8:30 am</td>
                    </tr>
                    <tr>
                        <td>95884</td>
                        <td style={{
                            color: "#E74F48"
                        }}>Sell</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 9:30 am</td>
                    </tr>
                    <tr>
                        <td>32345</td>
                        <td style={{
                            color: "#E74F48"
                        }}>Sell</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 9:00 am</td>
                    </tr>
                    <tr>
                        <td>58339</td>
                        <td style={{
                            color: "#00C805"
                        }}>Buy</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 8:00 am</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

const CloseContent = () => {
    return (
        <div className='content-parent'>
            <h3>Closed Positions</h3>
            <table>
                <tbody>
                    <tr>
                        <th>Account ID</th>
                        <th>Side</th>
                        <th>Symbol</th>
                        <th>Time</th>
                    </tr>
                    <tr>
                        <td>49503</td>
                        <td style={{
                            color: "#00C805"
                        }}>Buy</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 8:30 am</td>
                    </tr>
                    <tr>
                        <td>95884</td>
                        <td style={{
                            color: "#E74F48"
                        }}>Sell</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 9:30 am</td>
                    </tr>
                    <tr>
                        <td>32345</td>
                        <td style={{
                            color: "#E74F48"
                        }}>Sell</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 9:00 am</td>
                    </tr>
                    <tr>
                        <td>58339</td>
                        <td style={{
                            color: "#00C805"
                        }}>Buy</td>
                        <td>USD/EUR</td>
                        <td>15 May 2022 8:00 am</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

function allDashboards() {
    return (
         <div style={{
            display: "flex",
            width: "100%"
        }}>
            <SideBar />
            <div style={{
                width: "100%"
            }}>
                <Topbar title="Dashboard" />
                <OpenContent />
                <CloseContent />
            </div>
        </div>
    );
}

export default allDashboards;
export default Dashboard;