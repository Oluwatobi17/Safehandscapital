import React from "react";
import "../../styles/mobiletable.css";
import plus from "../../assets/plus_circle.png";
import minus from "../../assets/minu_circle.png";
import { ClipLoader } from "react-spinners";
import print from "../../assets/print_circle.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import WithdrawBonuses from "../modals/WithdrawBonuses";
import axios from "axios";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

const MobileRankingTable = ({ rankingStats, bonusWithdraw, loadingWith }) => {
  let user_id;
  let token;
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const rankingData = [
    {
      name: "LEADER",
      percentage: rankingStats?.leader_percentage,
      butt: rankingStats?.leader,
      amount: "$100",
      pay_id: 1,
    },
    {
      name: "BUSINESS BUILDER",
      percentage: rankingStats?.business_builder_percentage,
      butt: rankingStats?.business_builder,
      amount: "$300",
      pay_id: 2,
    },
    {
      name: "SAPPHIRE EXECUTIVE",
      percentage: rankingStats?.sapphire_executive_percentage,
      butt: rankingStats?.sapphire_executive,
      amount: "$700",
      pay_id: 3,
    },
    {
      name: "SAPPHIRE DIRECTOR",
      percentage: rankingStats?.sapphire_director_percentage,
      butt: rankingStats?.sapphire_director,
      amount: "$1,500",
      pay_id: 4,
    },
    // {
    //   name: "RUBY EXECUTIVE",
    //   percentage: rankingStats?.ruby_executive_percentage,
    //   butt: rankingStats?.ruby_executive,
    //   amount: "$7,000",
    //   pay_id: 5,
    // },
    // {
    //   name: "RUBY DIRECTOR",
    //   percentage: rankingStats?.ruby_directror_percentage,
    //   butt: rankingStats?.ruby_directror,
    //   amount: "$20,000",
    //   pay_id: 6,
    // },
    // {
    //   name: "DIAMOND EXECUTIVE",
    //   percentage: rankingStats?.diamond_executive_percentage,
    //   butt: rankingStats?.diamond_executive,
    //   amount: "$40,000",
    //   pay_id: 7,
    // },
    {
      name: "DIAMOND DIRECTOR",
      percentage: rankingStats?.diamond_director_percentage,
      butt: rankingStats?.diamond_director,
      amount: "$4,000",
      pay_id: 8,
    },
    {
      name: "EVERGREEN AMBASSADOR",
      percentage: rankingStats?.evergreen_ambassador_percentage,
      butt: rankingStats?.evergreen_ambassador,
      amount: "$10,000",
      pay_id: 9,
    },
  ];
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
  // const [loadingWith, setLoadingWith] = useState(false);

  const [active, setActive] = useState([]);
  // const handlebonusWithdraw = async (pay_id, toast) => {
  //   try {
  //     setLoadingWith(true);

  //     const data = await axios.post(
  //       `https://brain.evergreenffx.com/v2/?action=bonus_withdrawal&user_id=${user_id}&pay_id=${pay_id}`,
  //       {},
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (data.data.status_code === 200) {
  //       toast.success("Your withdrawal has been processed");
  //       Cookies.set("confetti", confetti, { expires: 2 / (60 * 24) });
  //       window.location = "/dashboard/bonuses";
  //     }
  //     setLoadingWith(false);
  //   } catch (error) {
  //     toast.error(
  //       error.response && error.response.data.message
  //         ? error.response.data.message
  //         : error.data
  //     );
  //     setLoadingWith(false);
  //   }
  // };
  let con;
  // console.log(confetti, "so");
  if (Cookies.get("confetti") === null) {
  } else {
    con = Cookies.get("confetti");
  }
  return (
    <section className="mobile_table" style={{ padding: 0 }}>
      <div className="mobile_table_wrapper" style={{ padding: 0 }}>
        {/* <h1>Trade Settings</h1> */}
        <div className="mobile_table_content">
          <div className="mobile_table_content_header bonus">
            <h2>Rank</h2>
            <h2>Action</h2>
          </div>

          <div className="mobile_table_content_body">
            {rankingData
              ? rankingData?.map((ranking, i) => {
                  const isActive = active.includes(i);

                  return (
                    <article key={i}>
                      <div className="mobile_table_content_body-header">
                        <div className="account_id bonus_rank">
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

                          <span className="font-[700] text-[14px]">
                            {ranking.name}
                          </span>
                        </div>
                        <div className="account_action bonus_action">
                          {/* <div>
                            <img
                              src={print}
                              alt="print"
                              style={{ marginLeft: 0, marginRight: "34px" }}
                            />
                          </div> */}
                          <WithdrawBonuses
                            rankingStats={rankingStats}
                            bonusWithdraw={bonusWithdraw}
                            pay_id={ranking.pay_id}
                            loadingWith={loadingWith}
                            typeOfUser={ranking.butt}
                          />
                        </div>
                      </div>
                      <div
                        className={`table-item ${!isActive ? "collapsed" : ""}`}
                      >
                        <div className="account_info_row bonus_row">
                          <p>Amount</p>
                          <p>{ranking.amount}</p>
                        </div>
                        <div className="account_info_row bonus_row">
                          <p>Progress</p>
                          <p>{ranking.percentage}%</p>
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
          {/* {con && (
            <div className="w-full left-[5%] absolute top-[50%] flex justify-center items-center">
              <Player
                src={animationConfetti}
                className="w-32 h-32"
                speed={1}
                loop
                autoplay
              />
            </div>
          )} */}
        </div>
      </div>
    </section>
  );
};

export default MobileRankingTable;
