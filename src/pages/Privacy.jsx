import React, { useEffect } from "react";
import "../styles/privacy.scss";
import Nav from "../components/Nav";
import Footer from "../components/Footer";
import TopPage from "../components/TopPage";

function Privacy() {
  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  return (
    <>
      <div className="privacy-container">
        <Nav />
        <TopPage
          headerText="Privacy Policy"
          pText="Last updated: December 08, 2022"
        />
        <div className="privacy">
          <p>
            At Safehands Capital, we take privacy and security seriously.
            This Privacy Policy outlines how Safehands Capital and its
            affiliates (Collectively referred to as “we”, “us”,
            “company”) process the information we collect about you
            through our websites, mobile apps, and other online
            services (collectively, the “Services”) and when you
            otherwise interact with us, such as through our customer
            support channels.
          </p>
          <ol>
            <li>
              INFORMATION WE COLLECT AND HOW WE COLLECT IT.
              <ol type="a">
                <li style={{ fontWeight: "400", fontSize: "16px" }}>
                  Information You Provide
                </li>
                <p style={{ fontWeight: "400", fontSize: "16px" }}>
                  We collect information you provide when you use our
                  Services or otherwise engage or communicate with us
                  as described below.
                </p>
                <ul>
                  <li>Identity Data, such as your name;</li>
                  <li>
                    Contact Data, such as your email address and
                    telephone number;
                  </li>
                  <li>
                    Profile Data, such as your username and password;
                  </li>
                  <li>
                    Additional Data You Provide, such as via survey
                    responses, contests/sweepstakes, customer support,
                    or other means.
                  </li>
                </ul>
                <li style={{ fontWeight: "400", fontSize: "16px" }}>
                  Information We Collect Automatically
                  <p style={{ fontWeight: "400", fontSize: "16px" }}>
                    As is true of many digital platforms, we also
                    collect certain information about you
                    automatically when you use our Services, as
                    described below.
                  </p>
                  <ul>
                    <li>
                      Usage Information. We collect information about
                      your activity on our Services, which includes
                      device identifiers (like IP address or mobile
                      device identifiers), pages or features you use,
                      time and date of access, and other similar usage
                      information.
                    </li>
                    <li>
                      Transactional Information. When you receive,
                      submit, or complete a transaction via the
                      Services, we collect information about the
                      transaction, such as transaction amount, type
                      and nature of the transaction, and time and date
                      of the transaction.
                    </li>
                    <li>
                      Location Data. We may collect the GPS location
                      of your mobile device in accordance with your
                      device permissions. We approximate your location
                      by your IP address.
                    </li>
                    <li>
                      Information Collected Through Tracking
                      Technologies. We and our service providers also
                      use technologies, including cookies and web
                      beacons, to automatically collect certain types
                      of usage and device information when you use our
                      Services or interact with our emails. The
                      information collected through these technologies
                      includes your IP address, browser type, Internet
                      service provider, platform type, device type,
                      operating system, date and time stamp, a unique
                      device or account ID, usage information and
                      other similar information.
                    </li>
                  </ul>
                  <li>
                    Information We Collect from Other Sources
                    <p>
                      We also obtain information about you from other
                      sources as described below.
                    </p>
                    <ul>
                      <li>
                        Vendors and Business Partners. We collect
                        information about you from companies that we
                        do business with, such as name, contact data,
                        inferences about your preferences and
                        attributes, as well as inferred fraud risk,
                        from identity verification and fraud
                        prevention partners.
                      </li>
                      <li>
                        Connected Services. If you link, connect, or
                        log in to your Safehands Capital Account with a
                        third-party service (e.g., Google, Apple), the
                        third-party service may send us information
                        such as your profile information from that
                        service. This information varies and is
                        controlled by that service or as authorized by
                        you via your privacy settings at that service.
                      </li>
                      <li>
                        Publicly Available Data. includes contact
                        information, your interactions with our social
                        media platforms, and other information from
                        publicly available sources, such as public
                        websites.
                      </li>
                      <li>
                        Advertising Data. We collect information in
                        connection with our ad campaigns that surfaced
                        on other platforms, such as the ads you
                        clicked on and other interactions with our
                        ads.
                      </li>
                      <li>
                        Data from other users. If you are in another
                        user’s contact list and they choose to share
                        that list with us, then we will collect the
                        contact information and your association with
                        that user.
                      </li>
                    </ul>
                  </li>
                </li>
              </ol>
            </li>
            <li>
              USE OF INFORMATION.
              <p>
                We use the information we collect for purposes
                described below or as otherwise described to you at
                the point of collection:
              </p>
              <ul>
                <li>
                  Maintain and provide the Services, including to
                  process account applications, authenticate your
                  identity, repair our Services, support, and handle
                  billing and account management;
                </li>
                <li>
                  Send you transactional or relationship information,
                  including confirmations, invoices, technical
                  notices, customer support responses, software
                  updates, security alerts, support and administrative
                  messages, and information about your transactions;
                </li>
                <li>
                  Communicate with you about offers and other things
                  we think you will be interested in, such as
                  newsletter, partner offerings, contests or
                  sweepstakes, events or announcements;
                </li>
                <li>
                  Monitor and improve our Services, including
                  analyzing usage, research and development
                </li>
                <li>
                  Facilitate contests and promotions to process and
                  deliver entries and rewards;
                </li>
                <li>
                  Help protect the safety and security of our
                  Services, business, and users, such as to
                  investigate and help prevent fraud or other unlawful
                  activity;
                </li>
                <li>
                  Protect or exercise our legal rights or defend
                  against legal claims, including to enforce and carry
                  out contracts and agreements; and
                </li>
                <li>
                  Comply with applicable laws and legal obligations,
                  such as compliance obligations associated with being
                  a regulated decentralized trading system.
                </li>
              </ul>
            </li>
            <li>
              DISCLOSURES OF INFORMATION.
              <p>
                Safehands Capital is committed to maintaining our member’s
                trust, and we want you to understand when and with
                whom we share information about you. The underlisted
                instances are when we share your information.
              </p>
              <ul>
                <li>
                  Companies in which you hold securities. Safehands Capital
                  may provide your name, address, email address, and
                  securities positions to requesting companies in
                  which you hold securities.
                </li>
                <li>
                  Safehands Capital affiliates. Where appropriate, we share
                  information about you with other companies owned by
                  Safehands Capital. These companies will process any
                  information shared in the same manner as described
                  under this Privacy Policy.
                </li>
                <li>
                  Legal purposes. We disclose information about you if
                  we believe that disclosure is in accordance with, or
                  required by, any applicable law or legal process or
                  to protect and defend the rights, interests, safety,
                  and security of Safehands Capital our users, or the
                  public.
                </li>
                <li>
                  With your consent. We share information about you
                  for any other purposes disclosed to you with your
                  consent.
                </li>
              </ul>
            </li>
          </ol>
          <h3 style={{ marginLeft: "-10px" }}>
            CHANGES TO THIS POLICY.
          </h3>
          <p>
            This Privacy Policy will evolve with time, and when we
            update it, we will revise the "Effective Date" above and
            post the new Policy and, in some cases, we provide
            additional notice (such as adding a statement to our
            website or sending you a notification by email). To stay
            informed of our privacy practices, we recommend you review
            the Policy on a regular basis as you continue to use our
            Services.
          </p>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Privacy;
