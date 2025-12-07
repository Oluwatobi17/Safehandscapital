import React, { useState } from "react";
import { accordion } from "./accordion";
import caret from "../../assets/caret-down.png";

const Faq = () => {
  const [active, setActive] = useState([]);

  return (
    <section className="faq_section" id="faq_section">
      <div className="faq_content_wrapper">
        <div className="faq_content">
          {accordion.map((faq, i) => {
            const isActive = active.includes(faq.id);
            return (
              <article key={i}>
                <div
                  className="accordion_title_wrapper"
                  onClick={() =>
                    setActive(
                      isActive
                        ? active.filter((current) => {
                            return current !== faq.id;
                          })
                        : [...active, faq.id]
                    )
                  }
                >
                  <h4 className="accordion_title">{faq.question}</h4>
                  <img
                    src={caret}
                    alt="caret-down"
                    className={`caret_down ${isActive && "rotate_caret"}`}
                  />
                </div>
                <div
                  className={`accordion-item ${!isActive ? "collapsed" : ""}`}
                >
                  <p>{faq.answer}</p>
                </div>
              </article>
            );
          })}
        </div>

        {/*
        <div className="see_more_btn">
          <a
            href="https://support.Safehands.com/"
            className="cta_btn flex justify-center items-center"
          >
            See More
          </a>
        </div>
        */}
      </div>
    </section>
  );
};

export default Faq;
