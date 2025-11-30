// import React, { useEffect, useState } from "react";
// import "../styles/profit.scss";
// import img from "../assets/warning.png";
// import { useNavigate } from "react-router-dom";

// function Profit({ prDays, timeRemainin }) {
//   console.log(timeRemainin);
//   const [timeRemaining, setTimeRemaining] = useState(prDays * 86400);
//   const navigate = useNavigate();
//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTimeRemaining((prevTime) => {
//         // Calculate the number of days, hours, minutes, and seconds remaining
//         const days = Math.floor(prevTime / 86400);
//         const hours = Math.floor((prevTime % 86400) / 3600);
//         const minutes = Math.floor((prevTime % 3600) / 60);
//         const seconds = prevTime % 60;

//         // Decrement the time remaining by one second
//         // console.log(days)
//         if (timeRemaining < 0) {
//           window.location = "/dashboard/home";
//         }
//         return prevTime - 1;
//       });
//     }, 1000);
//     return () => clearInterval(interval);
//   }, [timeRemaining]);
//   const days = Math.floor(timeRemaining / 86400);
//   const hours = Math.floor((timeRemaining % 86400) / 3600);
//   const minutes = Math.floor((timeRemaining % 3600) / 60);
//   const seconds = timeRemaining % 60;
//   console.log(timeRemaining);
//   return (
//     <div className="profit">
//       <div>
//         <img src={img} alt="image" />
//         <div>
//           <h3>Your profit sharing of 20% is due, click to pay.</h3>
//           <p
//             style={{
//               marginTop: "5px",
//             }}
//           >
//             You have{" "}
//             {timeRemaining > 0 ? (
//               <span style={{ fontWeight: "bold" }}>
//                 {days}d {hours}h {minutes}m {seconds}s remaining
//               </span>
//             ) : (
//               <p>Time's up!</p>
//             )}{" "}
//             to make payment.
//           </p>
//           <p>Check the invoice tab for more details.</p>
//         </div>
//       </div>
//       <div>
//         <button onClick={() => navigate("/dashboard/invoices/view")}>
//           Pay Now
//         </button>
//       </div>
//     </div>
//   );
// }

// export default Profit;

import React, { useEffect, useState } from "react";
import "../styles/profit.scss";
import img from "../assets/warning.png";
import { useNavigate } from "react-router-dom";

function Profit({ prDays, prDate, prTime, invoice_id }) {
  const [timeRemaining, setTimeRemaining] = useState(0);
  const navigate = useNavigate();
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prevTime) => {
        // Calculate the number of days, hours, minutes, and seconds remaining
        // const days = Math.floor(prevTime / 86400);
        // const hours = Math.floor((prevTime % 86400) / 3600);
        // const minutes = Math.floor((prevTime % 3600) / 60);
        // const seconds = prevTime % 60;

        // console.log(prDate);

        const d = new Date().getTime();
        const a = prDate;
        const p = a - d;
        // Decrement the time remaining by one second
        // console.log(days)

        return p;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [timeRemaining]);
  const time = new Date(timeRemaining);
  // console.log(time);
  //   console.log(d);
  // const days = Math.floor(timeRemaining / 86400);
  // const hours = Math.floor((timeRemaining % 86400) / 3600);
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  const hours = Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((time % (1000 * 60)) / 1000);

  return (
    <div className="profit">
      <div>
        <img src={img} alt="image" />
        <div>
          <h3>Your profit sharing of 20% is due, click to pay.</h3>
          <p
            style={{
              marginTop: "5px",
            }}
          >
            You have{" "}
            {timeRemaining > 0 ? (
              <span style={{ fontWeight: "bold" }}>
                {days}d {hours}h {minutes}m {seconds}s remaining
              </span>
            ) : (
              <span style={{ fontWeight: "bold" }}>0d 0h 0m 0s remaining</span>
            )}{" "}
            to make payment.
          </p>
          <p>Check the invoice tab for more details.</p>
        </div>
      </div>
      <div>
        <button onClick={() => navigate(`/dashboard/invoices/${invoice_id}`)}>
          Pay Now
        </button>
      </div>
    </div>
  );
}

export default Profit;
