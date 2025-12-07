import React, { useState } from "react";
import "../styles/invoice-view.scss";
import printer from "../assets/printer-dark.png";
import arrow from "../assets/backarrow.png";
import logo from "../assets/evergreenffs_logo.png";
import call from "../assets/call.png";
import message from "../assets/message-2.png";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  handleCoupon,
  handleGetSingleInvoice,
  makePayment,
} from "../redux/actions/invoiceAction";
import Cookies from "js-cookie";
import { useEffect } from "react";
import DepositModal from "../components/modals/DepositModal";
import MobileSingleInvoice from "../components/mobile_tables/MobileSingleInvoice";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { useRef } from "react";
import { useParams } from "react-router-dom";
import { ClipLoader, SyncLoader } from "react-spinners";
import { useWindowSize } from "react-use";
import { toast, ToastContainer } from "react-toastify";

const Table = () => {
  const { single_invoice } = useSelector((state) => state.getSingleInvoice);

  const payment = single_invoice?.data[0]?.payment_info;
  const itemID = payment?.quantity;
  const desc = payment?.description;
  const qty = payment?.quantity;
  const amount = payment?.amount;
  const price = payment?.price;

  return (
    <table className="view-table">
      <tbody>
        <tr>
          <th>Item ID</th>
          <th>Description</th>
          <th>Price</th>
          <th>Quantity</th>
          <th>Amount</th>
        </tr>

        <tr>
          <td>{itemID}</td>
          <td>{desc}</td>
          <td>${price}</td>
          <td className="text">{qty}</td>
          <td>${amount}</td>
        </tr>
      </tbody>
    </table>
  );
};

const BottomTable = () => {
  const { single_invoice } = useSelector((state) => state.getSingleInvoice);
  const { loadingInvoices } = useSelector((state) => state.getSingleInvoice);
  const sum = single_invoice?.data[0]?.summation;
  const subTotal = sum?.subtotal;
  const discount = sum?.discount;
  const total = sum?.total;

  return (
    <table className="bottom-table">
      <tbody>
        <tr>
          <th>
            <p>Subtotal</p>
            <p>Discount (5%)</p>
          </th>
          <td>
            <p>
              {loadingInvoices ? <SyncLoader size={10} /> : <> ${subTotal}</>}
            </p>
            <p>
              {loadingInvoices ? <SyncLoader size={10} /> : <> ${discount}</>}
            </p>
          </td>
        </tr>
        <tr>
          <td>Total</td>
          <td>{loadingInvoices ? <SyncLoader size={10} /> : <> ${total}</>}</td>
        </tr>
      </tbody>
    </table>
  );
};

const DownloadInvoice = ({ id, fileName, height, width }) => {
  const downloadInvoice = () => {
    const input = document.getElementById(id);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("portrait", "pt", "a2");
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

function InvoicesView() {
  let user_id;
  let token;
  let invoice_id;

  const { id } = useParams();
  invoice_id = id;

  const navigate = useNavigate();
  let [isOpen, setIsOpen] = useState(false);
  const [inner_width, setWidth] = useState(window.innerWidth);
  const [invoiceHeight, setInvoiceHeight] = useState();
  const [invoiceWidth, setInvoiceWidth] = useState();
  const [coupon, setCoupon] = useState("");
  const invoiceRef = useRef(null);

  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInformation);
  const { loadingCoupon } = useSelector((state) => state.couponRed);
  console.log(loadingCoupon);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { loadingInvoices } = useSelector((state) => state.getSingleInvoice);

  const { width, height } = useWindowSize();

  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }

  const { single_invoice } = useSelector((state) => state.getSingleInvoice);
  const payment = single_invoice?.data[0]?.payment_info;
  const itemID = payment?.quantity;
  const desc = payment?.description;
  const qty = payment?.quantity;
  const amount = payment?.amount;
  const price = payment?.price;

  const bill = single_invoice?.data[0]?.bill_to;
  const name = bill?.name;
  const username = bill?.username;
  const phone = bill?.phone;

  const date = single_invoice?.data[0]?.date;
  const invoiceID = single_invoice?.data[0]?.invoice_id;
  const invoiceStatus = single_invoice?.data[0]?.status;

  const sum = single_invoice?.data[0]?.summation;
  const total = sum?.total;
  const subtotal = sum?.subtotal;
  const discount = sum?.discount;

  const make_payment = () => {
    dispatch(
      makePayment(user_id, invoice_id, amount, token, setIsOpen, isOpen)
    );
  };

  const checkSize = () => {
    setWidth(window.innerWidth);
  };

  useEffect(() => {
    dispatch(handleGetSingleInvoice(user_id, token, invoice_id));
  }, []);

  useEffect(() => {
    window.addEventListener("resize", checkSize);
    const invoiceHeight = invoiceRef.current?.getBoundingClientRect().height;
    const coupon = invoiceRef.current?.getBoundingClientRect().width;
    if (inner_width > 580) {
      setInvoiceHeight(invoiceHeight);
      setInvoiceWidth(invoiceWidth);
    }
    return () => {
      window.removeEventListener("resize", checkSize);
    };
  }, [inner_width]);
  const handleCoupons = () => {
    dispatch(handleCoupon(user_id, token, invoice_id, coupon, amount, toast));
  };
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
      <div
        style={{
          width: "100%",
        }}
        className="single_invoice_table_action"
      >
        <div
          style={{
            width: "100%",
          }}
        >
          <div className="view-container">
            <div className="view-header">
              <div>
                <img
                  style={{ cursor: "pointer" }}
                  src={arrow}
                  alt="image"
                  onClick={() => navigate("/dashboard/invoices")}
                />
                <h3>
                  Invoice{" "}
                  <span style={{ textTransform: "uppercase" }}>
                    {loadingInvoices ? (
                      <SyncLoader size={10} />
                    ) : (
                      <> #{invoiceID}</>
                    )}
                  </span>
                </h3>
              </div>
              <DownloadInvoice
                id={"invoice"}
                fileName="invoice_summary"
                height={invoiceHeight}
                width={invoiceWidth}
              />
            </div>

            <div className="view-content" ref={invoiceRef} id="invoice">
              <div className="view-content-header">
                <div>
                  <img src={logo} alt="" />
                </div>

                <div>
                  <div>
                    <p>Invoice ID</p>
                    <p>Issue Date</p>
                    <p>Status</p>
                  </div>

                  <div>
                    <p style={{ textTransform: "uppercase" }}>
                      {loadingInvoices ? (
                        <SyncLoader size={10} />
                      ) : (
                        <> #{invoiceID}</>
                      )}
                    </p>

                    <p>
                      {loadingInvoices ? (
                        <SyncLoader size={10} />
                      ) : (
                        <> {date}</>
                      )}
                    </p>
                    <p
                      style={{
                        fontWeight: 700,
                        color:
                          invoiceStatus === "pending" ? "#F2CC33" : "#00C805",
                      }}
                    >
                      {loadingInvoices ? (
                        <SyncLoader size={10} />
                      ) : (
                        <> {invoiceStatus}</>
                      )}
                    </p>
                  </div>
                </div>
              </div>

              <div className="view-pay">
                <div>
                  <p>Bill To:</p>
                  <p>
                    {loadingInvoices ? <SyncLoader size={10} /> : <> {name}</>}
                  </p>
                  <div>
                    <img src={message} alt="image" />
                    <p>
                      {loadingInvoices ? (
                        <SyncLoader size={10} />
                      ) : (
                        <> {username}</>
                      )}
                    </p>
                  </div>
                  <div>
                    <img src={call} alt="image" />
                    <p>
                      {loadingInvoices ? (
                        <SyncLoader size={10} />
                      ) : (
                        <> {phone}</>
                      )}
                    </p>
                  </div>
                </div>
                <div>
                  <p>Total Due:</p>
                  <p>
                    {loadingInvoices ? (
                      <SyncLoader size={10} />
                    ) : (
                      <> ${total}</>
                    )}
                  </p>
                  <DepositModal
                    makePayment={make_payment}
                    setIsOpen={setIsOpen}
                    isOpen={isOpen}
                    invoiceStatus={invoiceStatus}
                    width={width}
                    height={height}
                  />
                </div>
              </div>
              <div className="space-x-4">
                <input
                  type="text"
                  onChange={(e) => setCoupon(e.target.value)}
                  className="border h-12 rounded-lg px-2 border-gray-400 outline-none text-[16px] w-60"
                />
                <button
                  onClick={handleCoupons}
                  className="bg-[#00C805] w-[150px]  button-shadow px-3 py-1 rounded-[8px]"
                >
                  {!loadingCoupon ? "Apply Coupon" : <ClipLoader size={14} />}
                </button>
              </div>
              <Table />
              <BottomTable />
            </div>
          </div>
        </div>
      </div>
      <MobileSingleInvoice
        amount={amount}
        name={name}
        phone={phone}
        date={date}
        invoiceID={invoiceID}
        invoiceStatus={invoiceStatus}
        total={total}
        qty={qty}
        itemID={itemID}
        desc={desc}
        price={price}
        subtotal={subtotal}
        discount={discount}
        status={status}
        makePayment={make_payment}
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        username={username}
        loadingInvoices={loadingInvoices}
        handleCoupons={handleCoupons}
        setCoupon={setCoupon}
        loadingCoupon={loadingCoupon}
      />
    </>
  );
}

export default InvoicesView;
