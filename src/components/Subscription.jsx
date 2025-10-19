import React from "react";
import "../styles/subscription.scss";
import hands from "../assets/oc-plugging-in-dark.svg";
import { useNavigate } from "react-router-dom";

function Subscription({ invoice_id }) {
  const navigate = useNavigate();

  return (
    <div className="sub-parent">
      <div>
        <div>
          <h3>Your subscription is inactive</h3>
          <p>
            You can check your invoices tab for more details or click to
            subscribe.
          </p>
          <button onClick={() => navigate(`/dashboard/invoices/${invoice_id}`)}>
            Subscribe
          </button>
        </div>
        <div>
          <img src={hands} alt="image" />
        </div>
      </div>
    </div>
  );
}

export default Subscription;
