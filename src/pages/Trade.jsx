import React, { useContext, useEffect, useState } from "react";
import Subscription from "../components/Subscription";
import Settings from "../components/Settings";
import add from "../assets/add.png";
import { useDispatch, useSelector } from "react-redux";
import {
  handleCheckBalance,
  handleCheckSub,
  handlePrPay,
} from "../redux/actions/checkActions";
import {
  handleCheckTradeAcct,
  handleDeleteTradeAcct,
} from "../redux/actions/tradeActions";
import add2 from "../assets/add-dark.png";
// import AddAccount from "../components/AddAccount";
import Cookies from "js-cookie";
import {
  handleDisableTradeAcct,
  handleEnableTradeAcct,
} from "../redux/actions/tradeActions";
import DisableModal from "../components/modals/DisableModal";
import DeleteAcctModal from "../components/modals/DeleteAcctModal";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import Suspended from "../components/Suspended";
import { ClimbingBoxLoader, ClipLoader } from "react-spinners";
import MobileTradeTable from "../components/mobile_tables/MobileTradeTable";
import Profit from "../components/Profit";
// import AddAccount from "../components/modals/AddAccount";
import { toast } from "react-toastify";
import Migrate from "../components/modals/MigrateToGiant";
import axios from "axios";

function Trade() {
  let user_id;
  let token;

  const dispatch = useDispatch();
  const [showAddAcctForm, setShowAddAcctForm] = useState(false);
  const [tradeAcctInfo, setTradeAccInfo] = useState({});
  let [isOpenDel, setIsOpenDel] = useState(false);

  const [showDisableModal, setShowDisableModal] = useState(false);
  const [showEnableModal, setShowEnableModal] = useState(false);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const checkTradeAcct = useSelector((state) => state.checkTradeAcct);
  const { loading } = checkTradeAcct;
  const deleteTradeAcct = useSelector((state) => state.deleteTradeAcct);
  const { loadingDelete } = useSelector((state) => state.deleteTradeAcct);
  const { acct, loadingDisable } = useSelector(
    (state) => state.disableTradeAcct
  );
  const enableTradeAcct = useSelector((state) => state.enableTradeAcct);
  const { loadingEnable } = useSelector((state) => state.enableTradeAcct);
  const tradeAcctStatus = checkTradeAcct.acctStatus;
  const prPay = useSelector((state) => state.checkPrpay);
  const accountID = checkTradeAcct.acctInfo?.account_id;
  const broker = checkTradeAcct.acctInfo?.broker;
  const msg = checkTradeAcct.acctInfo?.msg;
  const statusNotif = checkTradeAcct.acctInfo?.status;
  const date = checkTradeAcct.acctInfo?.date;
  const [checked, setChecked] = useState(statusNotif == "enabled");
  const [isDeleteYes, setIsDeleteYes] = useState(false);
  const prDays = prPay.status?.days_left;
  const statusTwo = prPay.status?.status;
  const invoice_id1 = status?.invoice_id;
  const invoice_id2 = prPay.status?.invoice_id;
  let tradeAcctData = [
    {
      account_id: accountID,
      broker: broker,
      status: statusNotif,
      date: date,
      msg: msg,
    },
  ];
  // console.log(checkTradeAcct);
  if (userInfo.info) {
    user_id = userInfo.info?.id;
  } else {
    user_id = userInfo.userInfo?.data?.id;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }

  const disableAcct = (user_id, token) => {
    dispatch(handleDisableTradeAcct(user_id, token));
  };
  const enableAcct = (user_id, token) => {
    dispatch(handleEnableTradeAcct(user_id, token));
  };
  const deleteAcct = (user_id, token) => {
    dispatch(
      handleDeleteTradeAcct(user_id, token, setIsOpenDel, isOpenDel, toast)
    );
  };

  const disableSuccess = acct?.status;
  const enableSuccess = enableTradeAcct.acct?.data?.status;
  const deleteStatus = deleteTradeAcct.acct?.status_code;
  let toggleStatus =
    checkTradeAcct.acctInfo?.status == "enabled"
      ? true
      : checkTradeAcct.acctInfo?.status == "disabled" && false;

  const handleAcctState = () => {
    if (checked) {
      setShowDisableModal(true);
    }
  };
  useEffect(() => {
    if (checkTradeAcct) {
      setTradeAccInfo(checkTradeAcct?.acctInfo);
    } else {
      const info = Cookies.get("TRADE_ACCT_INFO")
        ? JSON.parse(Cookies.get("TRADE_ACCT_INFO"))
        : null;

      setTradeAccInfo(info);
    }
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleCheckSub(user_id, token));
    dispatch(handlePrPay(user_id, token));
    dispatch(handleCheckTradeAcct(user_id, token));
    Cookies.set("checkValue", JSON.stringify(toggleStatus));
    const getToggleStatus = Cookies.get("checkValue")
      ? JSON.parse(Cookies.get("checkValue"))
      : null;
    if (getToggleStatus) {
      toggleStatus = getToggleStatus;
    }

    const GET_TRADE_ACCT_INFO = Cookies.get("TRADE_ACCT_INFO")
      ? JSON.parse(Cookies.get("TRADE_ACCT_INFO"))
      : null;
    if (GET_TRADE_ACCT_INFO) {
      tradeAcctData = GET_TRADE_ACCT_INFO;
    }
  }, []);

  useEffect(() => {
    if (disableSuccess == "success") {
      setShowDisableModal(!showDisableModal);
      window.location.href = "/dashboard/trade";
    }
  }, [disableSuccess]);

  useEffect(() => {
    if (enableSuccess == "enabled") {
      if (!toggleStatus) {
        window.location.href = "/dashboard/trade";
      }
    }
  }, [enableSuccess]);

  useEffect(() => {
    if (isDeleteYes && deleteStatus == 204) {
      tradeAcctData = [];
      window.location.href = "/dashboard/trade";
    } else {
      const GET_TRADE_ACCT_INFO = Cookies.get("TRADE_ACCT_INFO")
        ? JSON.parse(Cookies.get("TRADE_ACCT_INFO"))
        : null;
      tradeAcctData = GET_TRADE_ACCT_INFO;
    }
  }, [deleteStatus, isDeleteYes]);
  const target = prPay.status?.date;
  const prDate = new Date(target).getTime();
  return (
    <>
      {status?.status == "owing" ? (
        <Subscription invoice_id={invoice_id1} />
      ) : (
        ""
      )}
      {/* {statusTwo == "owing" ? <Profit invoice_id={invoice_id2} /> : ""} */}
      {statusTwo == "owing" && prDays == 0 ? (
        <Suspended invoice_id2={invoice_id2} />
      ) : (
        ""
      )}
      {statusTwo == "owing" && prDays > 0 ? (
        <Profit prDays={prDays} prDate={prDate} invoice_id={invoice_id2} />
      ) : (
        ""
      )}
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
        className="trade_page"
      >
        {!loading ? (
          <div
            style={{
              width: "100%",
            }}
          >
            {tradeAcctStatus ? (
              <>
                <div className="table-parent trade_table_parent">
                  <div>
                    <h3 className="mb-3">Trade Settings</h3>
                    <Migrate
                      // btnColor=" "
                      // bg={bg}
                      bg2="#e4b003"
                      // setShowAddAcctForm={setShowAddAcctForm}
                      disabled={false}
                      cursor="pointer"
                      user_id={user_id}
                      className="mt-3"
                    />
                    <p className="mt-3">
                      Kindly allow 5-10minutes after using the toggle button to
                      ensure your trading account connects/disconnects properly
                    </p>
                  </div>
                  <table>
                    <tbody>
                      <tr>
                        <th>Acount ID</th>
                        <th>Broker</th>
                        <th>Added On</th>
                        <th>Login State</th>
                        <th>Action</th>
                        <th>Message</th>
                      </tr>
                      {tradeAcctData
                        ? tradeAcctData.map((acct, i) => {
                            const account_id = acct.account_id;
                            const broker = acct.broker;
                            const status = acct.status;
                            const date = acct.date;
                            const msg = acct.msg;
                            return (
                              <tr key={i}>
                                <td>{account_id}</td>
                                <td>{broker}</td>
                                <td>{date} </td>

                                <td
                                  style={{
                                    color:
                                      statusNotif == "enabled"
                                        ? "#00C805"
                                        : "red",
                                    fontWeight: 700,
                                  }}
                                >
                                  {statusTwo == "owing" && prDays > 0 ? (
                                    <label>
                                      {" "}
                                      {statusNotif == "enabled"
                                        ? "connected"
                                        : "disconnected"}
                                    </label>
                                  ) : (
                                    <label>
                                      {" "}
                                      {statusNotif == "enabled"
                                        ? "connected"
                                        : "disconnected"}
                                    </label>
                                  )}
                                </td>
                                <td className="flex justify-center items-center">
                                  {statusTwo == "owing" && prDays <= 0 ? (
                                    <label
                                      className="switch"
                                      style={{
                                        background: "#ccc",
                                      }}
                                    >
                                      <span
                                        className="slider"
                                        style={{
                                          left: "0px",
                                        }}
                                      ></span>
                                    </label>
                                  ) : (
                                    <label>
                                      {!toggleStatus ? (
                                        <label
                                          onClick={() => {
                                            enableAcct(user_id, token);
                                            handleAcctState;
                                          }}
                                          className="switch"
                                          style={{
                                            background: toggleStatus
                                              ? "#0ACA0F"
                                              : "#ccc",
                                          }}
                                        >
                                          <span
                                            className="slider"
                                            style={{
                                              right: toggleStatus && "22px",
                                              left: !toggleStatus && "0px",
                                            }}
                                          ></span>
                                        </label>
                                      ) : (
                                        <DisableModal
                                          checked={checked}
                                          setChecked={setChecked}
                                          handleAcctState={handleAcctState}
                                          showDisableModal={showDisableModal}
                                          showEnableModal={showEnableModal}
                                          setShowEnableModal={
                                            setShowEnableModal
                                          }
                                          setShowDisableModal={
                                            setShowDisableModal
                                          }
                                          enableAcct={enableAcct}
                                          token={token}
                                          user_id={user_id}
                                          disableAcct={disableAcct}
                                          toggleStatus={toggleStatus}
                                          loadingDisable={loadingDisable}
                                        />
                                      )}
                                    </label>
                                  )}

                                  <DeleteAcctModal
                                    deleteAcct={deleteAcct}
                                    token={token}
                                    user_id={user_id}
                                    setIsDeleteYes={setIsDeleteYes}
                                    isOpenDel={isOpenDel}
                                    setIsOpenDel={setIsOpenDel}
                                    statusTwo={statusTwo}
                                    loadingDelete={loadingDelete}
                                    statusNotif={statusNotif}
                                    invoice_id2={invoice_id2}
                                  />
                                  {loadingEnable && <ClipLoader size={14} />}
                                </td>
                                <td>{msg} </td>
                              </tr>
                            );
                          })
                        : null}
                    </tbody>
                  </table>
                </div>
                <MobileTradeTable
                  data={tradeAcctData}
                  invoice_id2={invoice_id2}
                  loadingDelete={loadingDelete}
                  statusTwo={statusTwo}
                  toggleStatus={toggleStatus}
                  enableAcct={enableAcct}
                  disableAcct={disableAcct}
                  handleAcctState={handleAcctState}
                  user_id={user_id}
                  token={token}
                  loadingEnable={loadingEnable}
                  checked={checked}
                  setChecked={setChecked}
                  loadingDisable={loadingDisable}
                  showDisableModal={showDisableModal}
                  showEnableModal={showEnableModal}
                  setShowEnableModal={setShowEnableModal}
                  setShowDisableModal={setShowDisableModal}
                  deleteAcct={deleteAcct}
                  setIsDeleteYes={setIsDeleteYes}
                  isOpenDel={isOpenDel}
                  setIsOpenDel={setIsOpenDel}
                  statusNotif={statusNotif}
                  prDays={prDays}
                  bg2="#e4b003"
                  disabled={false}
                  cursor="pointer"
                />
              </>
            ) : (
              <>
                {status?.status === "owing" ||
                statusTwo === "owing" ||
                (statusTwo === "owing" && prDays == 0) ||
                (statusTwo === "owing" && prDays > 0) ? (
                  <Settings
                    addImg={add2}
                    cursor="not allowed"
                    disabled={true}
                    statusTwo={statusTwo}
                    status={status}
                    prDays={prDays}
                    background="#ddd"
                  />
                ) : (
                  <Settings
                    addImg={add2}
                    btnColor=" #191919"
                    bg="#00C805"
                    bg2="#e4b003"
                    statusTwo={statusTwo}
                    status={status}
                    prDays={prDays}
                    setShowAddAcctForm={setShowAddAcctForm}
                    disabled={false}
                    cursor="pointer"
                  />
                )}
              </>
            )}
          </div>
        ) : (
          <div className="w-full flex justify-center items-center h-[40rem]">
            <Player
              src={animationData}
              className="w-32 h-32"
              speed={1}
              loop
              autoplay
            />
          </div>
        )}
      </div>
    </>
  );
}

export default Trade;
