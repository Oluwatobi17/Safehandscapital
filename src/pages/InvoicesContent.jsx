import React, { useEffect, useState } from "react";
import "../styles/invoice-content.scss";
import img from "../assets/printer.png";
import search from "../assets/search-normal.png";
import { useNavigate } from "react-router-dom";

export const Table = ({ invoice_list }) => {
  const [width, setWidth] = useState(false);

  useEffect(() => {
    if (window.innerWidth <= 400) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  });

  const navigate = useNavigate();

  return (
    <div className="table-parent">
      <div className="invoice-search">
        <h3>All Invoices</h3>
        <div>
          <input type="text" placeholder="Search by Invoice ID" />
          <img src={search} alt="image" />
        </div>
      </div>

      <table>
        <tbody>
          <tr>
            <th>Invoice ID</th>
            <th>Date</th>
            <th>Amount</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
          {invoice_list.map((invoice, i) => {
            return (
              <tr key={i}>
                <td>{invoice.invoice_id.toUpperCase()}</td>
                <td>{invoice.date}</td>
                <td>${invoice.amount}</td>
                <td
                  style={{
                    color: invoice.status === "pending" ? "#F2CC33" : "#00C805",
                    fontWeight: 700,
                  }}
                >
                  {invoice.status}
                </td>
                <td>
                  <div className="flex justify-center items-center space-x-2">
                    <img src={img} alt="image" />
                    <button
                      className="w-[63px] rounded-[8px] bg-[#00C805] button-shadow h-[36px]"
                      onClick={() =>
                        navigate(`/dashboard/invoices/${invoice.invoice_id}`)
                      }
                    >
                      View
                    </button>
                  </div>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

function InvoicesContent() {
  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      <div
        style={{
          width: "100%",
        }}
      >
        <Table />
      </div>
    </div>
  );
}

export default InvoicesContent;
