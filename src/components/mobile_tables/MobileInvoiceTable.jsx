import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import print from "../../assets/print_circle.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const MobileInvoiceTable = ({ invoice_list }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState([]);

  return (
    <section className="mobile_table" style={{ marginTop: "24px" }}>
      <div className="mobile_table_wrapper">
        <h1>All Invoices</h1>
        <div className="mobile_table_content">
          <div className="mobile_table_content_header">
            <h2>Account ID</h2>
            <h2>Action</h2>
          </div>

          <div className="mobile_table_content_body">
            {invoice_list
              ? invoice_list.map((invoice, i) => {
                  const isActive = active.includes(i);
                  const { invoice_id, date, amount, status } = invoice;
                  return (
                    <article key={i}>
                      <div className="mobile_table_content_body-header">
                        <div className="account_id">
                          <button
                            onClick={() =>
                              setActive(
                                isActive
                                  ? active.filter((current) => {
                                      return current !== i;
                                    })
                                  : [...active, i]
                              )
                            }
                          >
                            {isActive ? (
                              <img src={minus} alt="minus btn" />
                            ) : (
                              <img src={plus} alt="plus btn" />
                            )}
                          </button>

                          <p>{invoice_id.toUpperCase()}</p>
                        </div>
                        <div className="account_action">
                          <button>
                            <img
                              src={print}
                              alt="print"
                              style={{
                                marginLeft: 0,
                                marginRight: "34px",
                              }}
                            />
                          </button>
                          <button
                            className="cta_btn"
                            onClick={() =>
                              navigate(`/dashboard/invoices/${invoice_id}`)
                            }
                          >
                            View
                          </button>
                        </div>
                      </div>
                      <div
                        className={`table-item ${!isActive ? "collapsed" : ""}`}
                      >
                        <div className="account_info_row">
                          <p>Amount</p>
                          <p>${amount}</p>
                        </div>
                        <div className="account_info_row">
                          <p>Date</p>
                          <p>{date}</p>
                        </div>
                        <div className="account_info_row">
                          <p>Status</p>
                          <p
                            style={{
                              fontWeight: 700,
                              color:
                                status === "pending" ? "#F2CC33" : "#00C805",
                            }}
                          >
                            {status}
                          </p>
                        </div>
                      </div>
                    </article>
                  );
                })
              : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileInvoiceTable;
