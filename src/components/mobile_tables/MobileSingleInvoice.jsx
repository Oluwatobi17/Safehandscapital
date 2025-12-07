import React, { useState } from "react";
import "../../styles/singleinvoicemobile.css";
import backarrow from "../../assets/backarrow.png";
import printer from "../../assets/printer-dark.png";
import logo from "../../assets/evergreenffs_logo.png";
import message from "../../assets/message-2.png";
import call from "../../assets/call.png";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import DepositModal from "../modals/DepositModal";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useRef } from "react";
import { SyncLoader, ClipLoader } from "react-spinners";
import { useSelector } from "react-redux";
import { useWindowSize } from "react-use";

const DownloadInvoice = ({ id, fileName, height, width }) => {
  const downloadInvoice = () => {
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a4");
      pdf.addImage(imgData, "JPEG", 0, 0, width, height);
      pdf.save(`${fileName}`);
    });
  };
  return (
    <button onClick={downloadInvoice} className="cta_btn print_btn">
      <img src={printer} alt="printer" /> Print
    </button>
  );
};

const MobileSingleInvoice = ({
  amount,
  name,
  phone,
  date,
  invoiceID,
  invoiceStatus,
  total,
  qty,
  itemID,
  desc,
  price,
  subtotal,
  discount,
  makePayment,
  username,
  setIsOpen,
  isOpen,
  handleCoupons,
  loadingCoupon,
  setCoupon,
}) => {
  let single_invoice_data = [
    {
      itemID: itemID && itemID,
      qty: qty && qty,
      desc: desc & desc,
      price: price && price,
      amount: amount && amount,
    },
  ];
  const [active, setActive] = useState([]);
  const [invoiceHeight, setInvoiceHeight] = useState();
  const [invoiceWidth, setInvoiceWidth] = useState();
  const { loadingInvoices } = useSelector((state) => state.getSingleInvoice);
  const invoiceRef = useRef(null);
  const navigate = useNavigate();
  const { width, height } = useWindowSize();

  useEffect(() => {
    const invoiceHeight = invoiceRef.current?.getBoundingClientRect().height;
    const invoiceWidth = invoiceRef.current?.getBoundingClientRect().width;
    if (width === 580 || width < 580) {
      setInvoiceHeight(invoiceHeight);
      setInvoiceWidth(invoiceWidth);
    }
  }, [width]);

  return (
    <section className="single_invoice_section">
      <div className="single_invoice_content">
        <div className="single_invoice_content-topbar">
          <div>
            <button onClick={() => navigate("/dashboard/invoices")}>
              <img src={backarrow} alt="back_arrow" />
            </button>
            <p>
              invoice{" "}
              <span style={{ textTransform: "uppercase" }}>#{invoiceID}</span>
            </p>
          </div>
          <DownloadInvoice
            id={"invoice2"}
            fileName="invoice_summary"
            height={invoiceHeight}
            width={invoiceWidth}
          />
        </div>

        <div className="single_invoice_content_body" id="invoice2">
          <div ref={invoiceRef}>
            <div className="single_invoice_content_body-header">
              <div className="s_i_c_b-h-logo">
                <img src={logo} alt="logo" />
              </div>
              <div className="s_i_c_b-h-info">
                <div className="s_i_c_b-h-info-row">
                  <p>Invoice ID</p>
                  <p style={{ textTransform: "uppercase" }}>
                    {" "}
                    {loadingInvoices ? (
                      <SyncLoader size={8} />
                    ) : (
                      <> #{invoiceID}</>
                    )}
                  </p>
                </div>
                <div className="s_i_c_b-h-info-row">
                  <p>Issue Date</p>
                  <p>
                    {loadingInvoices ? <SyncLoader size={8} /> : <> {date}</>}
                  </p>
                </div>
                <div className="s_i_c_b-h-info-row">
                  <p>Status</p>
                  <p style={{ color: "#F2CC33" }}>
                    {loadingInvoices ? (
                      <SyncLoader size={10} />
                    ) : (
                      <> {invoiceStatus}</>
                    )}
                  </p>
                </div>
              </div>
            </div>

            <div className="single_invoice_user_info">
              <h2 className="info_tag">Bill to:</h2>
              <p className="user_contact_name">
                {" "}
                {loadingInvoices ? <SyncLoader size={10} /> : <> {name}</>}
              </p>
              <div className="single_invoice_user_contact_info">
                <div className="single_invoice_user_contact_info-row">
                  <img src={message} alt="message" />
                  <p>
                    {" "}
                    {loadingInvoices ? (
                      <SyncLoader size={10} />
                    ) : (
                      <> {username}</>
                    )}
                  </p>
                </div>
                <div className="single_invoice_user_contact_info-row">
                  <img src={call} alt="call" />
                  <p>
                    {" "}
                    {loadingInvoices ? <SyncLoader size={10} /> : <> {phone}</>}
                  </p>
                </div>
              </div>
            </div>

            <div className="single_invoice_bill_summary">
              <p>Total due:</p>
              <h3>
                {" "}
                {loadingInvoices ? <SyncLoader size={10} /> : <> ${total}</>}
              </h3>
              <DepositModal
                makePayment={makePayment}
                setIsOpen={setIsOpen}
                isOpen={isOpen}
                invoiceStatus={invoiceStatus}
                width={width}
                height={height}
              />
            </div>
            <div className="space-y-2 flex flex-col">
              <input
                type="text"
                onChange={(e) => setCoupon(e.target.value)}
                className="border h-12 rounded-lg px-2 border-gray-400 outline-none text-[16px] w-full"
              />
              <button
                onClick={handleCoupons}
                className="bg-[#00C805] w-[150px]  button-shadow px-3 py-1 rounded-[8px]"
              >
                {!loadingCoupon ? "Apply Coupon" : <ClipLoader size={14} />}
              </button>
            </div>
            <div
              className="mobile_table_content"
              style={{ marginBottom: "34px" }}
            >
              <div className="mobile_table_content_header">
                <h2>Item ID</h2>
                <h2>Amount</h2>
              </div>

              <div className="mobile_table_content_body">
                {single_invoice_data
                  ? single_invoice_data.map((invoice, i) => {
                      const isActive = active.includes(i);
                      const { itemID, qty, desc, price, amount } = invoice;
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

                              <p>
                                {" "}
                                {loadingInvoices ? (
                                  <SyncLoader size={10} />
                                ) : (
                                  <> {itemID}</>
                                )}
                              </p>
                            </div>
                            <div className="account_action">
                              <p>
                                {" "}
                                {loadingInvoices ? (
                                  <SyncLoader size={10} />
                                ) : (
                                  <> ${amount}</>
                                )}
                              </p>
                            </div>
                          </div>
                          <div
                            className={`table-item ${
                              !isActive ? "collapsed" : ""
                            }`}
                          >
                            <div className="account_info_row">
                              <p>Description</p>
                              <p>
                                {" "}
                                {loadingInvoices ? (
                                  <SyncLoader size={10} />
                                ) : (
                                  <> {desc}</>
                                )}
                              </p>
                            </div>
                            <div className="account_info_row">
                              <p>Price</p>
                              <p>
                                {" "}
                                {loadingInvoices ? (
                                  <SyncLoader size={10} />
                                ) : (
                                  <> ${price}</>
                                )}
                              </p>
                            </div>
                            <div className="account_info_row">
                              <p>Quantity</p>
                              <p>
                                {" "}
                                {loadingInvoices ? (
                                  <SyncLoader size={10} />
                                ) : (
                                  <> {qty}</>
                                )}
                              </p>
                            </div>
                          </div>
                        </article>
                      );
                    })
                  : null}
              </div>
            </div>

            <div className="single_invoice_bill_breakdown">
              <div className="single_invoice_fees">
                <div className="single_invoice_fees_row">
                  <p>Subtotal</p>
                  <p>${subtotal}</p>
                </div>
                <div className="single_invoice_fees_row">
                  <p>Discount (5%)</p>
                  <p>${discount}</p>
                </div>
              </div>
              <div className="single_invoice_fees_row single_invoice_total">
                <p>Total</p>
                <p>${total}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MobileSingleInvoice;
