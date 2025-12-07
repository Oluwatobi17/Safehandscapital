import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import print from "../../assets/print_circle.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import hand from "../../assets/hand-paper.svg";
import Position from "../Position";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../../assets/Evergreen Loader.json";
const MobileClosedPositions = ({ history, loadingHistory }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState([]);

  return (
    <section className="mobile_table">
      {!loadingHistory ? (
        <div className="mobile_table_wrapper">
          {/* <h1>Trade Settings</h1> */}
          {history?.length !== 0 ? (
            <div className="mobile_table_content ">
              <div className="mobile_table_content_header md:hidden flex">
                <h2>SYMBOL</h2>
                <h2>Side</h2>
              </div>

              <div className="mobile_table_content_body">
                {history.length!==0
                  ? history?.slice(0, 20).map((first, i) => {
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

                              <p>{first.symbol}</p>
                            </div>
                            <div className="account_action ">
                              {/* <div>
                            <img
                              src={print}
                              alt="print"
                              style={{ marginLeft: 0, marginRight: "34px" }}
                            />
                          </div> */}
                              <p>{first.side}</p>
                            </div>
                          </div>
                          <div
                            className={`table-item ${
                              !isActive ? "collapsed" : ""
                            }`}
                          >
                            <div className="account_info_row ">
                              <p>Time</p>
                              <p>{first.time}</p>
                            </div>
                            <div className="account_info_row ">
                              <p>PROFIT/LOSS</p>
                              <p
                                style={{
                                  color: `${
                                    first.profit_loss < 0
                                      ? "#FF0000"
                                      : " #00C805"
                                  }`,
                                }}
                              >
                                {first.profit_loss}%
                              </p>
                            </div>
                            {/* <div className="account_info_row bonus_row">
                          <p>Status</p>
                        </div> */}
                          </div>
                        </article>
                      );
                    })
                  : null}
              </div>
            </div>
          ) : (
            <div className="">
              <Position text="closed" head="Closed" />
            </div>
          )}
        </div>
      ) : (
        <div className="w-full flex justify-center items-center ">
          <Player
            src={animationData}
            className="w-32 h-32"
            speed={1}
            loop
            autoplay
          />
        </div>
      )}
    </section>
  );
};

export default MobileClosedPositions;
