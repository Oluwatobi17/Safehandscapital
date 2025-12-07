import React from "react";
import { useState } from "react";
import illustration from "../assets/Illustration.png";
import slide1 from "../assets/slide_frame_1.png";
import slide2 from "../assets/slide_frame_2.png";
import slide3 from "../assets/slide_frame_3.png";
import caret_right from "../assets/caret_right.png";
import caret_left from "../assets/caret_left.png";
import "../styles/side.scss";
import { motion } from "framer-motion";

const slides = [
  {
    id: 1,
    img: slide1,
  },
  {
    id: 2,
    img: slide2,
  },
  {
    id: 3,
    img: slide3,
  },
];
function Side() {
  const [value, setValue] = useState(0);
  const { img } = slides[value];

  const setLimit = (num) => {
    if (num > slides.length - 1) {
      num = 0;
    }
    if (num < 0) {
      num = slides.length - 1;
    }
    return num;
  };

  return (
    <div className="side">
      <div className="auth_slides_wrapper">
        <div className="auth_slides">
          <motion.div
            key={value}
            initial={{ opacity: 0, translateY: 15 }}
            animate={{
              opacity: 1,
              translateY: 0,
              transition: {
                duration: 0.5,
              },
            }}
            exit={{ opacity: 0, translateY: 15 }}
            className="auth_slides-slide"
          >
            <img src={img} alt="slide" />
          </motion.div>
          <div className="auth_slides-btns">
            <img
              src={caret_left}
              alt="left-arrow"
              onClick={() => setValue(setLimit(value - 1))}
            />
            <div>
              {slides.map((dot, i) => {
                return (
                  <button
                    onClick={() => setValue(i)}
                    key={i}
                    className={`${value === i ? "active" : null}`}
                  ></button>
                );
              })}
            </div>
            <img
              src={caret_right}
              alt="right-arrow"
              onClick={() => setValue(setLimit(value + 1))}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Side;
