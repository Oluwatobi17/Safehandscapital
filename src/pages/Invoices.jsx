import React, { useEffect } from "react";
import note from "../assets/oc-taking-note.svg";
import { useDispatch, useSelector } from "react-redux";
import { handleGetInvoiceList } from "../redux/actions/invoiceAction";
import { Table } from "../pages/InvoicesContent";
import { handleCheckBalance } from "../redux/actions/checkActions";
import { GridLoader } from "react-spinners";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import Cookies from "js-cookie";
import MobileInvoiceTable from "../components/mobile_tables/MobileInvoiceTable";
function Invoices() {
  let user_id;
  let token;
  const dispatch = useDispatch();

  const { loading } = useSelector((state) => state.checkBalance);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { invoice_list, loadingInvoice } = useSelector(
    (state) => state.getInvoiceList
  );

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

  useEffect(() => {
    Cookies.set("INVOICE_LIST", JSON.stringify(invoice_list));
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleGetInvoiceList(user_id, token));
  }, []);

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
        <>
          {!loadingInvoice ? (
            <>
              {" "}
              {invoice_list ? (
                <>
                  <Table invoice_list={invoice_list} />
                  <MobileInvoiceTable invoice_list={invoice_list} />
                </>
              ) : (
                <div className="history">
                  <div>
                    <h3>All Invoices</h3>
                  </div>

                  <div>
                    <img src={note} alt="image" />
                    <p>There is nothing to see here</p>
                    <p>You haven't generated an invoice.</p>
                  </div>
                </div>
              )}
            </>
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Player
                src={animationData}
                className="w-32 h-32"
                speed={1}
                loop
                autoplay
              />
            </div>
          )}
        </>
      </div>
    </div>
  );
}

export default Invoices;
