import React from "react";
import send from "../../assets/oc-sending.png";

const Contact = () => {
  return (
    <section className="contact_section">
      <div className="contact_content_wrapper">
        <div className="contact_content">
          <div className="contact_content_header">
            <h3 style={{ marginBottom: "3rem" }}>Get in Touch</h3>
            <img src={send} alt="send" style={{ width: "300px" }} />
          </div>
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
    </section>
  );
};

export default Contact;
