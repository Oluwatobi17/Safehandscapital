import React, { useState } from "react";
import "../styles/dashboardcontent.scss";
import "../styles/position.scss";
import img from "../assets/oc-lost.svg";
import Position from "../components/Position";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import MobileClosedPositions from "../components/mobile_tables/MobileClosedPositions";
const Content = ({ history, loadingHistory }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 20;
  const pagesVisited = pageNumber * productsPerPage;
  const displayHistory = history?.data.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  // console.log(history);
  const pageCount = Math.ceil(
    history?.recordsTotal / productsPerPage
  );
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  return (
    <div className="content-parent">
      <h3>Positions</h3>
      {!loadingHistory ? (
        <table>
          <tbody>
            <tr>
              <th>Symbol</th>
              <th>Side</th>
              <th>Time</th>
              <th>Profit/Loss</th>
            </tr>
            {displayHistory?.map((hist, index) => {
              return (
                <tr key={index}>
                  <td>{hist.symbol}</td>
                  <td>{hist.side}</td>
                  <td>{hist.time}</td>
                  <td
                    style={{
                      color: `${
                        hist.profit_loss < 0 ? "#FF0000" : " #00C805"
                      }`,
                    }}
                  >
                    {hist.profit_loss}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
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
    </div>
  );
};

function DashBoardContent({ history, loadingHistory }) {
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
        {history?.data.length !== 0 ? (
          <div className="md:flex">
            <Content
              history={history}
              loadingHistory={loadingHistory}
            />
          </div>
        ) : (
          <div className="hidden md:flex">
            <Position text="closed" head="Closed" />
          </div>
        )}
        <MobileClosedPositions
          history={history}
          loadingHistory={loadingHistory}
        />
      </div>
    </div>
  );
}

export default DashBoardContent;
