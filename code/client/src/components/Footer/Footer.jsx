import React from "react";
import "./Footer.css";
import { footerLinks, logos } from "./Footer-Functions";
// import googlePlay from "../images/googlePlay.png";

function Footer() {
  return (
    <footer>
      {/* Top Section - Navigation Links */}
      <div className="footer">
        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 d-flex">
          <ul className="link-list list-unstyled list-inline justify-content-center mx-auto">
            {footerLinks.map((link, index) => (
              <li className="list-inline-item" key={index}>
                <a href={link.href}>{link.text}</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Bottom Section - Logos and Disclaimer */}
      <div className="Bottom-footer">
        <div className="container-fluid col-xl-8 col-lg-10 col-md-12 col-sm-12 offset-xl-2 offset-lg-1">
          {/* Disclaimer */}
          <p className="text-center disclaimer pt-3">
          <strong>This site is re-designed & developed by Neelkanth Khithani, Vedang Gambhire, Kushl Alve, <br /> Atharva Hande, Shivam Choubey.<br />
            <span style={{color: "goldenrod"}}>Vivekanand Education Society's Institute of Technology, Chembur. </span><br />Mini-Project Mentor Mrs. Lifna C. S.</strong>
          </p>

          {/* Logos */}
          {/* <div className="row justify-content-around">
            {logos.map((logo, index) => (
              <div key={index} className="col-xl-2 col-lg-2 col-md-3 col-sm-4">
                <a href={logo.link} >
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="img-fluid mx-auto d-flex mb-3"
                    style={{ height: "50px" }}
                  />
                </a>
              </div>
            ))}


            <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center">
              <a href="https://play.google.com/store/apps/details?id=in.gov.scholarships" >
                <img
                  src={googlePlay}
                  className="img-fluid mx-auto"
                  alt="Google Play Logo"
                />
              </a>
            </div>
          </div> */}
        </div>
      </div>
    </footer>
  );
}

export default Footer;
