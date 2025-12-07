import React, { useState } from "react";
import "../styles/history-content.scss";
import hand from "../assets/hand-paper.svg";
import { GridLoader } from "react-spinners";
import HistoryTable from "../components/mobile_tables/HistoryTable";

const Content = ({ history }) => {
  const [pageNumber, setPageNumber] = useState(0);
  const productsPerPage = 20;
  const pagesVisited = pageNumber * productsPerPage;
  const displayHistory = history?.data.slice(
    pagesVisited,
    pagesVisited + productsPerPage
  );
  // console.log(history);
  const pageCount = Math.ceil(history?.recordsTotal / productsPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };
  // console.log(history);
  return (
    <>
      <div className="history-content">
        <h3>Trade History</h3>
        <p>
          View the records of trades EvergreenFFX AI has placed on your trading
          account!.
        </p>
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
                      color: `${hist.profit_loss < 0 ? "#FF0000" : " #00C805"}`,
                    }}
                  >
                    {hist.profit_loss}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

function HistoryContent({ history, loading }) {
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
          <Content history={history} />
        ) : (
          <div className="w-full flex flex-col bg-white max-w-[94%] mx-auto py-3 mt-14 text-center justify-center items-center">
            {/* <div>
            <h3>Trade History</h3>
            <p>
              View the records of trades EvergreenFFX AI has placed on your
              trading account!.
            </p>
          </div> */}

            <div className="w-full md:flex hidden flex-col items-center">
              <img src={hand} alt="image" />
              <p>There is nothing to see here</p>
              <p>You haven't made any transaction.</p>
            </div>
          </div>
        )}
        <HistoryTable history={history} />
      </div>
    </div>
  );
}

export default HistoryContent;
