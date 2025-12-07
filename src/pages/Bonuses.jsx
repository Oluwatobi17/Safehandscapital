import React, { useContext, useRef, useState, useEffect } from "react";
import Rank from "../components/Rank";
import "../styles/bonuses.scss";
import NavContext from "../context/NavContext";
import { handleCheckBalance } from "../redux/actions/checkActions";
// import { Player } from "@lottiefiles/react-lottie-player";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import people from "../assets/oc-hi-five.svg";
import {
  handleBonusStats,
  handleCurrentRank,
  handleFirstLevel,
  handleRankingStats,
  handleSecondLevel,
  handleThirdLevel,
} from "../redux/actions/bonusesActions";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import { signout } from "../redux/actions/authAction";
import MobileRankingTable from "../components/mobile_tables/MobileBonusesTable";
import Mobile1stLevel from "../components/mobile_tables/Mobile1stLevel";
import Mobile2ndLevel from "../components/mobile_tables/Mobile2ndLevel";
import Mobile3rdLevel from "../components/mobile_tables/Mobile3rdLevel";
import WithdrawBonuses from "../components/modals/WithdrawBonuses";
import animationConfetti from "../assets/Evergreen Confetti.json";

import axios from "axios";
import { toast } from "react-toastify";
import Cookies from "js-cookie";

const CustomDiv = ({ text, number, bonusStats }) => {
  return (
    <div>
      <p>{text}</p>
      <p>{bonusStats}</p>
    </div>
  );
};

const Ranking = ({
  rankingStats,
  bonusWithdraw,
  confetti,
  pay_id,
  loadingWith,
}) => {
  return (
    <>
      <table className="ranking">
        <tbody>
          <tr>
            <th>Rank</th>
            <th>Progress</th>
            <th>Amount</th>
            <th>Action</th>
          </tr>
          <tr>
            <td>LEADER</td>
            <td>{rankingStats?.leader_percentage}%</td>
            <td>$100</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.leader}
                pay_id={1}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>BUSINESS BUILDER</td>
            <td>{rankingStats?.business_builder_percentage}%</td>
            <td>$300</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.business_builder}
                pay_id={2}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>SAPPHIRE EXECUTIVE</td>
            <td>{rankingStats?.sapphire_executive_percentage}%</td>
            <td>$700</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.sapphire_executive}
                pay_id={3}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>SAPPHIRE DIRECTOR</td>
            <td>{rankingStats?.sapphire_director_percentage}%</td>
            <td>$1,500</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.sapphire_director}
                pay_id={4}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          {/* <tr>
            <td>RUBY EXECUTIVE</td>
            <td>{rankingStats?.ruby_executive_percentage}%</td>
            <td>$7,000</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.ruby_executive}
                pay_id={5}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>RUBY DIRECTOR</td>
            <td>{rankingStats?.ruby_directror_percentage}%</td>
            <td>$20,000</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.ruby_directror}
                pay_id={6}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>DIAMOND EXECUTIVE</td>
            <td>{rankingStats?.diamond_executive_percentage}%</td>
            <td>$40,000</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.diamond_executive}
                pay_id={7}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr> */}
          <tr>
            <td>DIAMOND DIRECTOR</td>
            <td>{rankingStats?.diamond_director_percentage}%</td>
            <td>$4,000</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                bonusWithdraw={bonusWithdraw}
                typeOfUser={rankingStats?.diamond_director}
                pay_id={8}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
          <tr>
            <td>EVERGREEN AMBASSADOR</td>
            <td>{rankingStats?.evergreen_ambassador_percentage}%</td>
            <td>$10,000</td>
            <td>
              <WithdrawBonuses
                rankingStats={rankingStats}
                typeOfUser={rankingStats?.evergreen_ambassador}
                bonusWithdraw={bonusWithdraw}
                pay_id={9}
                loadingWith={loadingWith}
                confetti={confetti}
              />
            </td>
          </tr>
        </tbody>
      </table>
      <MobileRankingTable
        bonusWithdraw={bonusWithdraw}
        loadingWith={loadingWith}
        rankingStats={rankingStats}
      />
    </>
  );
};

const FirstLevel = ({ firstLevel }) => {
  return (
    <div className="content-parent">
      {firstLevel?.data.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Username</th>
              <th>Staus</th>
              <th>No. of Referrals</th>
            </tr>
          </thead>
          <tbody>
            <>
              {firstLevel?.data.map((second, index) => {
                return (
                  <tr key={index}>
                    <td>{second?.fullname}</td>
                    <td>{second?.username}</td>
                    <td>{second?.status}</td>
                    <td>{second?.no_of_refs}</td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      ) : (
        <div className="w-full md:flex hidden flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
          <img src={people} alt="image" />
          <p>Oops!</p>
          <p>You haven’t referred anyone yet!</p>
        </div>
      )}
      <Mobile1stLevel firstLevel={firstLevel} />
    </div>
  );
};

const SecondLevel = ({ secondLevel }) => {
  return (
    <div className="content-parent">
      {secondLevel?.data.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Username</th>
              <th>Staus</th>
              <th>No. of Referrals</th>
            </tr>
          </thead>
          <tbody>
            <>
              {secondLevel?.data.map((second, index) => {
                return (
                  <tr key={index}>
                    <td>{second?.fullname}</td>
                    <td>{second?.username}</td>
                    <td>{second?.status}</td>
                    <td>{second?.no_of_refs}</td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      ) : (
        <div className="w-full md:flex hidden flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
          <img src={people} alt="image" />
          <p>Oops!</p>
          <p>You haven’t referred anyone yet!</p>
        </div>
      )}
      <Mobile2ndLevel secondLevel={secondLevel} />
    </div>
  );
};

const ThirdLevel = ({ thirdLevel }) => {
  return (
    <div className="content-parent">
      {thirdLevel?.data.length !== 0 ? (
        <table>
          <thead>
            <tr>
              <th>Fullname</th>
              <th>Username</th>
              <th>Staus</th>
              <th>No. of Referrals</th>
            </tr>
          </thead>
          <tbody>
            <>
              {thirdLevel?.data.map((second, index) => {
                return (
                  <tr key={index}>
                    <td>{second?.fullname}</td>
                    <td>{second?.username}</td>
                    <td>{second?.status}</td>
                    <td>{second?.no_of_refs}</td>
                  </tr>
                );
              })}
            </>
          </tbody>
        </table>
      ) : (
        <div className="w-full md:flex hidden flex-col space-x-4 mt-14 py-5 max-w-[94%] mx-auto bg-white justify-center items-center">
          <img src={people} alt="image" />
          <p>Oops!</p>
          <p>You haven’t referred anyone yet!</p>
        </div>
      )}
      <Mobile3rdLevel thirdLevel={thirdLevel} />
    </div>
  );
};

// const Content = ({ rankingStats, firstLevel, secondLevel, thirdLevel }) => {
//   console.log(rankingStats, "fjsp");
//   const [render, setRender] = useState(<Ranking rankingStats={rankingStats} />);

//   const { setToPeople, setToMegaphone } = useContext(NavContext);

//   const ranking = useRef("");
//   const first = useRef("");
//   const second = useRef("");
//   const third = useRef("");

//   return (
//     <div className="history-content bonuses-parent">
//       <div className="bonuses-header">
//         <p
//           ref={ranking}
//           className="active not-active"
//           onClick={() => {
//             if (!ranking.current.classList.contains("active")) {
//               ranking.current.classList.add("active");
//               ranking.current.classList.add("not-active");
//               first.current.classList.remove("active");
//               second.current.classList.remove("active");
//               third.current.classList.remove("active");
//               first.current.classList.remove("not-active");
//               second.current.classList.remove("not-active");
//               third.current.classList.remove("not-active");
//               setRender(<Ranking rankingStats={rankingStats} />);
//               setToPeople();
//             }
//           }}
//         >
//           Ranking
//         </p>
//         <p
//           onClick={() => {
//             if (!first.current.classList.contains("active")) {
//               first.current.classList.add("active");
//               first.current.classList.add("not-active");
//               ranking.current.classList.remove("active");
//               second.current.classList.remove("active");
//               third.current.classList.remove("active");
//               ranking.current.classList.remove("not-active");
//               second.current.classList.remove("not-active");
//               third.current.classList.remove("not-active");
//               setRender(<FirstLevel firstLevel={firstLevel} />);
//               setToMegaphone();
//             }
//           }}
//           ref={first}
//         >
//           1st Level
//         </p>
//         <p
//           onClick={() => {
//             if (!second.current.classList.contains("active")) {
//               second.current.classList.add("active");
//               second.current.classList.add("not-active");
//               ranking.current.classList.remove("active");
//               first.current.classList.remove("active");
//               third.current.classList.remove("active");
//               ranking.current.classList.remove("not-active");
//               first.current.classList.remove("not-active");
//               third.current.classList.remove("not-active");
//               setRender(<SecondLevel secondLevel={secondLevel} />);
//               setToMegaphone();
//             }
//           }}
//           ref={second}
//         >
//           2nd Level
//         </p>
//         <p
//           onClick={() => {
//             if (!third.current.classList.contains("active")) {
//               third.current.classList.add("active");
//               third.current.classList.add("not-active");
//               ranking.current.classList.remove("active");
//               second.current.classList.remove("active");
//               first.current.classList.remove("active");
//               ranking.current.classList.remove("not-active");
//               first.current.classList.remove("not-active");
//               second.current.classList.remove("not-active");
//               setRender(<ThirdLevel thirdLevel={thirdLevel} />);
//               setToMegaphone();
//             }
//           }}
//           ref={third}
//         >
//           3rd Level
//         </p>
//       </div>

//       {render}
//     </div>
//   );
// };

function Bonuses() {
  let user_id;
  let token;
  let pay_id;
  const [confetti, setConfetti] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [loadingWith, setLoadingWith] = useState(false);
  const userInfo = useSelector((state) => state.userInformation);
  const tokenVal = useSelector((state) => state.token);
  const { status } = useSelector((state) => state.checkSub);
  const { rank } = useSelector((state) => state.rank);
  const { bonusStats, loading } = useSelector((state) => state.bonusStats);
  const { rankingStats } = useSelector((state) => state.rankingStats);
  const rankingStat = useSelector((state) => state.rankingStats);
  const { firstLevel } = useSelector((state) => state.firstLevel);
  const { secondLevel } = useSelector((state) => state.secondLevel);
  const { thirdLevel } = useSelector((state) => state.thirdLevel);
  const prPay = useSelector((state) => state.checkPrpay);
  const tradeAcct = useSelector((state) => state.checkTradeAcct);
  const subStatus = status?.status;
  const prStatus = prPay.status?.status;
  if (userInfo.info) {
    user_id = userInfo.info[0]?.id;
  } else {
    user_id = userInfo.userInfo?.data[0]?.id;
  }

  let rankingSta;
  if (rankingStat.rank) {
    rankingSta = rankingStat?.rank;
  } else {
    rankingSta = rankingStat?.rankingStats;
  }

  if (tokenVal.userInfo) {
    token = tokenVal.userInfo?.token;
  } else {
    token = tokenVal;
  }
  // console.log(rankingStats);
  const handlebonusWithdraw = async (pay_id, toast) => {
    try {
      setLoadingWith(true);

      const data = await axios.post(
        `https://brain.evergreenffx.com/v2/?action=bonus_withdrawal&user_id=${user_id}&pay_id=${pay_id}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (data.data.status_code === 200) {
        toast.success("Your withdrawal has been processed");
        // setConfetti(true);

        Cookies.set("confetti", confetti, { expires: 2 / (60 * 24) });
        window.location = "/dashboard/bonuses";
        // console.log(data);
      }

      setLoadingWith(false);
    } catch (error) {
      toast.error(error);
      // console.log(error);
      setLoadingWith(false);
    }
  };
  let con;
  // console.log(confetti, "so");
  if (Cookies.get("confetti") === null) {
  } else {
    con = Cookies.get("confetti");
  }
  const TabTitles = ["Ranking", "1st Level", "2nd Level", "3rd Level"];
  const PageDisplay = () => {
    if (page === 0) {
      return (
        <Ranking
          rankingStats={rankingStats}
          bonusWithdraw={handlebonusWithdraw}
          pay_id={pay_id}
          loadingWith={loadingWith}
          confetti={confetti}
        />
      );
    } else if (page === 1) {
      return <FirstLevel firstLevel={firstLevel} />;
    } else if (page === 2) {
      return <SecondLevel secondLevel={secondLevel} />;
    } else {
      return <ThirdLevel thirdLevel={thirdLevel} />;
    }
  };

  useEffect(() => {
    dispatch(handleCheckBalance(user_id, token));
    dispatch(handleCurrentRank(user_id, token));
    dispatch(handleBonusStats(user_id, token));
    dispatch(handleRankingStats(user_id, token));
    dispatch(handleFirstLevel(user_id, token));
    dispatch(handleSecondLevel(user_id, token));
    dispatch(handleThirdLevel(user_id, token));
  }, []);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
      }}
    >
      {!loading ? (
        <div
          style={{
            width: "100%",
          }}
        >
          <Rank rank={rank} />
          <div className="referral-custom bonuses-div">
            <h2>Earnings</h2>
            <div>
              <CustomDiv
                bonusStats={bonusStats?.total}
                text="Total Referrals"
                number="1,156"
              />
              <CustomDiv
                bonusStats={bonusStats?.first_level}
                text="First Level"
                number="100"
              />
              <CustomDiv
                bonusStats={bonusStats?.second_level}
                text="Second Level"
                number="36"
              />
              <CustomDiv
                bonusStats={bonusStats?.third_level}
                text="Third Level"
                number="7"
              />
            </div>
          </div>

          <div className="history-content bonuses-parent">
            <div className="w-full flex lg:overflow-hidden border-b-[#aeaeae] border-b overflow-scroll space-x-5 lg:max-w-[100%]  max-w-[94%]">
              {TabTitles.map((title, index) => {
                return (
                  <div className="lg:w-16 " key={index}>
                    <p
                      onClick={() => setPage(index)}
                      className={`${
                        index === page
                          ? "border-b-[#00C805] cursor-pointer text-[#00C805] border-b-2 font-bold"
                          : ""
                      } text-lg cursor-pointer`}
                    >
                      {title}
                    </p>
                  </div>
                );
              })}
            </div>
            <div className="table_parent">{PageDisplay()}</div>
          </div>
          {/* <Content
            rankingStats={rankingSta}
            firstLevel={firstLevel}
            secondLevel={secondLevel}
            thirdLevel={thirdLevel}
          /> */}
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
      {con && (
        <div className="w-full left-[5%] absolute top-[50%] flex justify-center items-center">
          <Player
            src={animationConfetti}
            className="w-32 h-32"
            speed={1}
            loop
            autoplay
          />
        </div>
      )}
    </div>
  );
}

export default Bonuses;
