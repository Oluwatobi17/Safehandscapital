import React, { useEffect, useState } from "react";
import "../styles/suspended.scss";
import warn from "../assets/warn.png";
import hands from "../assets/oc-plugging-in.svg";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Cookies from "js-cookie";
import {
  handleGetInvoiceList,
  handleGetSingleInvoice,
} from "../redux/actions/invoiceAction";
export function Suspended({ prAmt, invoice_id2 }) {
  let user_id;
  let token;
  let invoice;
  let invoice_id;
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { single_invoice, loading } = useSelector(
    (state) => state.getSingleInvoice
  );
  const { invoice_list } = useSelector((state) => state.getInvoiceList);
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  // if (invoice_list.invoice_list) {
  //   invoice = invoice_list.invoice_list[0]?.id;
  // } else {
  //   invoice = invoice_list.invoice_list?.data[0]?.id;
  // }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  // console.log(invoice_list?.invoice_list);
  const payment = invoice_list?.filter((x) => x.invoice_id === invoice_id2);
  const desc = payment?.description;
  const qty = payment?.quantity;
  const amount = payment?.map((x) => {
    return x.amount;
  });
  const price = payment?.price;
  useEffect(() => {
    if (status) {
      invoice_id = status.invoice_id;
      Cookies.set("invoice_id", invoice_id);
    }
    const INVOICE_ID = Cookies.get("INVOICE_ID")
      ? JSON.parse(Cookies.get("INVOICE_ID"))
      : null;
    if (INVOICE_ID) {
      invoice_id = INVOICE_ID;
    }
    Cookies.set("INVOICE_LIST", JSON.stringify(invoice_list));
    dispatch(handleGetInvoiceList(user_id, token));
    dispatch(handleGetSingleInvoice(user_id, token, invoice_id));
  }, []);
  // const make_payment = () => {
  //   dispatch(makePayment(user_id, invoice_id, amount, token)).then(() => {
  //     setModal(!open);
  //   });
  // };
  // console.log(prAmt);
  const navigate = useNavigate();
  return (
    <div className="suspended">
      <div>
        <div>
          <img src={warn} alt="image" />
          <div>
            <h3>Your trading account has been suspended.</h3>
            <p>
              This is due to your defaulting of the 20% profit sharing of $
              {amount}. Check the invoice tab for more details.
            </p>
          </div>
        </div>
        <img src={hands} alt="image" />
        <div>
          <button
            onClick={() => navigate(`/dashboard/invoices/${invoice_id2}`)}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default Suspended;
