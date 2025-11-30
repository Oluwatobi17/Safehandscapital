import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import print from "../../assets/print_circle.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import people from "../../assets/oc-hi-five.svg";

const Mobile1stLevel = ({ firstLevel }) => {
  const navigate = useNavigate();
  const [active, setActive] = useState([]);

  const firstData = [
    {
      fullName: firstLevel?.data[0]?.fullname,
      userName: firstLevel?.data[0]?.username,
      referrals: firstLevel?.data[0]?.no_of_refs,
      status: firstLevel?.data[0]?.status,
    },
  ];
  return (
    <section className="mobile_table" style={{ padding: 0 }}>
      <div className="mobile_table_wrapper" style={{ padding: 0 }}>
        {/* <h1>Trade Settings</h1> */}
        {firstLevel?.length !== 0 ? (
          <div className="mobile_table_content">
            <div className="mobile_table_content_header ">
              <h2>Fullname</h2>
              <h2>Username</h2>
            </div>

            <div className="mobile_table_content_body">
              {firstLevel?.data
                ? firstLevel?.data.map((first, i) => {
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

                            <p>{first.fullname}</p>
                          </div>
                          <div className="account_action ">
                            {/* <div>
                            <img
                              src={print}
                              alt="print"
                              style={{ marginLeft: 0, marginRight: "34px" }}
                            />
                          </div> */}
                            <p>{first.username}</p>
                          </div>
                        </div>
                        <div
                          className={`table-item ${
                            !isActive ? "collapsed" : ""
                          }`}
                        >
                          <div className="account_info_row ">
                            <p>Status</p>
                            <p>{first.status}</p>
                          </div>
                          <div className="account_info_row ">
                            <p>No of Referrals</p>
                            <p>{first.no_of_refs}</p>
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
          <div className="w-full flex flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
            <img src={people} alt="image" />
            <p>Oops!</p>
            <p>You haven’t referred anyone yet!</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default Mobile1stLevel;
