import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import DisableModal from "../modals/DisableModal";
import DeleteAcctModal from "../modals/DeleteAcctModal";
import { useState } from "react";
import Migrate from "../modals/MigrateToGiant";

const MobileTradeTable = ({
  data,
  statusTwo,
  toggleStatus,
  enableAcct,
  disableAcct,
  handleAcctState,
  user_id,
  token,
  loadingEnable,
  loadingDisable,
  checked,
  setChecked,
  showDisableModal,
  showEnableModal,
  setShowEnableModal,
  setShowDisableModal,
  deleteAcct,
  setIsDeleteYes,
  isOpenDel,
  invoice_id2,
  setIsOpenDel,
  statusNotif,
  loadingDelete,
  prDays,
  bg2,
  shadow,
  cursor,
  disabled,
}) => {
  const [active, setActive] = useState([]);
  return (
    <section className="mobile_table">
      <div className="mobile_table_wrapper">
        <h1>Trade Settings</h1>
        <Migrate
          // btnColor=" "
          // bg={bg}
          bg2={bg2}
          shadow="2px 2px black"
          disabled={disabled}
          cursor={cursor}
        />
        <p className="mt-3">
          Kindly allow 5-10minutes after using the toggle button to ensure your
          trading account connects/disconnects properly
        </p>
        <div className="mobile_table_content">
          <div className="mobile_table_content_header">
            <h2>Account ID</h2>
            <h2>Action</h2>
          </div>
          <div className="mobile_table_content_body">
            {data
              ? data.map((info, i) => {
                  const isActive = active.includes(i);
                  const { account_id, broker, status, date, msg } = info;
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

                          <p>{account_id}</p>
                        </div>
                        <div className="account_action">
                          {statusTwo !== "owing" && prDays < 0 ? (
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
                              {" "}
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
                                  setShowEnableModal={setShowEnableModal}
                                  setShowDisableModal={setShowDisableModal}
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
                            invoice_id2={invoice_id2}
                            loadingDelete={loadingDelete}
                            statusTwo={statusTwo}
                          />
                          {loadingEnable && (
                            <ClipLoader className="ml-4" size={14} />
                          )}
                        </div>
                      </div>
                      <div
                        className={`table-item ${!isActive ? "collapsed" : ""}`}
                      >
                        <div className="account_info_row">
                          <p>Broker</p>
                          <p>{broker}</p>
                        </div>
                        <div className="account_info_row">
                          <p>Added on</p>
                          <p>{date}</p>
                        </div>
                        <div className="account_info_row">
                          <p>Login State</p>
                          <p
                            style={{
                              color:
                                statusNotif === "enabled" &&
                                statusTwo !== "owing" &&
                                prDays > 0
                                  ? "#00C805"
                                  : "red",
                              fontWeight: 700,
                            }}
                          >
                            {statusTwo !== "owing" &&
                            prDays > 0 &&
                            status === "enabled"
                              ? "connected"
                              : "disconneccted"}
                          </p>
                        </div>
                        <div className="account_info_row">
                          <p>Message</p>
                          <p>{msg}</p>
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

export default MobileTradeTable;
