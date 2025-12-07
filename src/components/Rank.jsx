import React, { useContext } from "react";
import NavContext from "../context/NavContext";
import "../styles/rank.scss";
import megaphone from "../assets/oc-megaphone.svg";

function Rank({ rank }) {
  const { img } = useContext(NavContext);

  return (
    <div className="sub-parent rank">
      <div>
        <div>
          <h3>
            Current Rank : <span> {rank?.rank}</span>
          </h3>
          <div>
            {/* <progress
              className="border-black border rounded-lg accent-white"
              max="100"
              value={rank?.percentage}
            ></progress> */}
            <div className="lg:w-[251px] w-[210px] h-[14px] bg-transparent overflow-hidden border border-[#191919] rounded-[4px]">
              <div
                className="bg-[#191919] text-xs font-medium text-blue-100 h-[14px] text-center rounded-l-[4px]"
                style={{ width: `${rank?.percentage}%` }}
              ></div>
            </div>
            <p>{rank?.percentage}%</p>
          </div>
          <p>
            You have {rank?.users_left} more referals to complete this level.
          </p>
        </div>
        <div>
          <img
            className={`${img === megaphone ? "img" : ""}`}
            src={img}
            alt="image"
          />
        </div>
      </div>
    </div>
  );
}

export default Rank;
