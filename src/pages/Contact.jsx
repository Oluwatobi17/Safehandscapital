import React from "react";
import Footer from "../components/Footer";
import Nav from "../components/Nav";
import Faq from "../components/home_sections/Faq";
import send from "../assets/oc-sending.png";
import { useEffect } from "react";

function ContactPage() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <div style={{ background: "white", paddingTop: "50px" }}>
      <Nav />
      <section
        className="contact_section"
        style={{ display: "block", paddingTop: "130px" }}
      >
        <div className="contact_content_wrapper">
          <div className="contact_content">
            <div className="contact_content_header">
              <h3>Get in Touch</h3>
              <p>We’ll be happy to answer your various enquires. </p>
            </div>
            <div className="contact_content_flex">
              <img src={send} alt="send" />
              <div className="contact_form">
                <form action="">
                  <div className="form-group">
                    <label htmlFor="name">Firstname</label>
                    <input
                      type="text"
                      name="name"
                      id="name"
                      placeholder="Your name"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input
                      type="text"
                      name="email"
                      id="email"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="message">Message</label>
                    <textarea
                      type="text"
                      name="message"
                      id="message"
                      placeholder="What do you want to say?"
                    />
                  </div>
                  <button className="cta_btn">Submit</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Faq />
      <Footer />
    </div>
  );
}

export default ContactPage;
