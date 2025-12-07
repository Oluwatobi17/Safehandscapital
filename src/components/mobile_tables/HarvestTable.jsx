import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import print from "../../assets/print_circle.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import plane from "../../assets/oc-plane.svg";

const HarvestTable = ({ harvest }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState([]);
  return (
    <section className="mobile_table">
      <div className="mobile_table_wrapper">
        {harvest?.length !== 0 ? (
          <div className="mobile_table_content">
            <div className="mobile_table_content_header ">
              <h2>Wallet Address</h2>
              <h2>Amount</h2>
            </div>

            <div className="mobile_table_content_body">
              {harvest
                ? harvest?.slice(0, 20).map((first, i) => {
                    const isActive = active.includes(i);

                    return (
                      <article key={i}>
                        <div className="mobile_table_content_body-header">
                          <div className="account_id ">
                            <div
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
                            </div>

                            <p>
                              {first.wallet_address.substring(0, 10)}
                              {first.wallet_address.length >= 10 && "..."}
                            </p>
                          </div>
                          <div className="account_action ">
                            <p>{`\$${first.amount}`}</p>
                          </div>
                        </div>
                        <div
                          className={`table-item ${
                            !isActive ? "collapsed" : ""
                          }`}
                        >
                          <div className="account_info_row ">
                            <p>Date</p>
                            <p>{first.date}</p>
                          </div>
                          <div className="account_info_row ">
                            <p>Status</p>
                            <p
                              style={{
                                color: `${
                                  first.status === "pending"
                                    ? "#F2CC33"
                                    : " #00C805"
                                }`,
                              }}
                            >
                              {first.status}
                            </p>
                          </div>
                        </div>
                      </article>
                    );
                  })
                : null}
            </div>
          </div>
        ) : (
          <div className="w-full text-center flex flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
            <img src={plane} alt="image" />
            <p className="text-center">Oops!</p>
            <p>You haven't made any Harvest yet.</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default HarvestTable;
