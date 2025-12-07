import React from "react";
import { BsArrowLeft } from "react-icons/bs";
import LeaderboardTable from "../components/LeaderboardTable";

const Leaderboard = () => {
  return (
    <div>
      <div className="w-full px-[46px] py-[24px]">
        <button className="px-[16px] items-center bg-white button-shadow rounded-[8px] flex gap-x-[7px] py-[8px]">
          <BsArrowLeft />
          <span>Back to Dashboard</span>
        </button>
        <div className="w-full mt-[24px] ">
          <LeaderboardTable />
        </div>
      </div>
    </div>
  );
};

export default Leaderboard;
