import React from 'react';
import { Link } from 'react-router-dom';
import MobileToolbar from "../components/toolbars/MobileToolbar";
import DesktopToolbar from "../components/toolbars/DesktopToolbar";
import { ToastContainer } from "react-toastify";

function NotFoundPage() {
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
        <MobileToolbar />
        <DesktopToolbar />
        <div style={{ textAlign: 'center', padding: '50px', 'margin-top':'50px' }}>
            <h1>404 - Page Not Found</h1>
            <p>Sorry, the page you are looking for does not exist.</p>
            <Link to="/">Go to Homepage</Link>
        </div>
    </>
    );
}

export default NotFoundPage;