import React, { useEffect, useState } from "react";
import "../styles/invoice-content.scss";
import SideBar from "../components/SideBar";
import Topbar from "../components/Topbar";
import search from "../assets/search-normal.png";
import harvest from "../assets/oc-plane.svg";
import { GridLoader } from "react-spinners";
import { Player } from "@lottiefiles/react-lottie-player";
import animationData from "../assets/Evergreen Loader.json";
import HarvestTable from "../components/mobile_tables/HarvestTable";
const Table = ({ harvests }) => {
  const [width, setWidth] = useState(false);
  useEffect(() => {
    if (window.innerWidth <= 400) {
      setWidth(true);
    } else {
      setWidth(false);
    }
  });

  return (
    <>
      {harvests?.length === 0 ? (
        <div className="w-full md:flex hidden flex-col bg-white max-w-[94%] mx-auto py-3 mt-14 text-center justify-center items-center">
          <div>
            <h3>All Harvest</h3>
          </div>

          <div className="">
            <img src={harvest} alt="image" />
            <p className="text-center">Oops!</p>
            <p>You haven't made any Harvest yet.</p>
          </div>
        </div>
      ) : (
        <div className="table-parent">
          <div className="invoice-search">
            <h3>All Harvests</h3>
            <div>
              <input type="text" placeholder="Search" />
              <img src={search} alt="image" />
            </div>
          </div>

          <table>
            <tbody>
              <tr>
                <th>Wallet Adresss</th>
                <th>Date</th>
                <th>Amount</th>
                <th>Status</th>
              </tr>
              {harvests?.map((harvest, index) => {
                return (
                  <tr key={index}>
                    <td>{harvest.wallet_address}</td>
                    <td>{harvest.date}</td>
                    <td>${harvest.amount}</td>
                    <td
                      style={{
                        color: `${
                          harvest.status === "pending" ? "#F2CC33" : " #00C805"
                        }`,
                        fontWeight: 700,
                      }}
                    >
                      {harvest.status}
                    </td>
                  </tr>
                );
              })}

              {/* <tr>
                <td>0xc4448b77ac4a3...</td>
                <td>15 May 2020 9:30 am</td>
                <td>$293.01</td>
                <td
                  style={{
                    color: "#F2CC33",
                    fontWeight: 700,
                  }}
                >
                  Complete
                </td>
              </tr> */}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
};

function HarvestContent({ harvests, loading }) {
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
        {loading ? (
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
        ) : (
          <>
            <Table harvests={harvests} />
            <HarvestTable harvest={harvests} />
          </>
        )}
      </div>
    </div>
  );
}

export default HarvestContent;
