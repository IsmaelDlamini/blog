import React from "react";
import site_logo from "../assets/site_logo.png";
import instagram_icon from "../assets/instagram-icon.png";
import facebook_icon from "../assets/facebook-icon.png";
import linkedin_icon from "../assets/linkedin-icon.png";
import PropTypes from "prop-types";

const Footer = ({ overline }) => {
  return (
    <>
      <div className="footer w-full mt-24 flex flex-col items-center bg-white">
        {/* Top section */}
        <div className="w-full max-w-6xl mx-auto flex flex-col md:flex-row md:justify-between md:items-start gap-8 border-b pb-6 px-6 md:px-12">
          {/* Logo + socials */}
          <div className="flex flex-col items-center md:items-start">
            <img src={site_logo} alt="site-logo" className="w-44 md:w-56" />
            <div className="flex space-x-4 mt-4">
              <img src={instagram_icon} alt="social-icon" className="w-7 h-7" />
              <img src={facebook_icon} alt="social-icon" className="w-7 h-7" />
              <img src={linkedin_icon} alt="social-icon" className="w-7 h-7" />
            </div>
          </div>

          {/* Links */}
          <div className="grid grid-cols-2 gap-8 sm:grid-cols-3 text-center md:text-left">
            <ul className="font-outfit font-thin space-y-2">
              <li className="text-xl font-light text-textColor1">Quick Links</li>
              <li>Home</li>
              <li>Portfolio</li>
              <li>About</li>
              <li>Contact</li>
            </ul>

            <ul className="font-outfit font-thin space-y-2">
              <li className="text-xl font-light text-textColor1">Useful Links</li>
              <li>FAQ&apos;S</li>
              <li>Terms of Service</li>
              <li>Privacy Policy</li>
            </ul>

            <ul className="font-outfit font-thin space-y-2">
              <li className="text-xl font-light text-textColor1">Resources</li>
              <li>Newsletter</li>
              <li>Github</li>
              <li>Support</li>
              <li>Help Center</li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright */}
        <p className="font-outfit font-extralight text-center my-4 pb-4 text-textColor1 text-sm md:text-base">
          Ismael Dlamini 2024 - &copy; Copyright reserved
        </p>
      </div>
    </>
  );
};

Footer.propTypes = {
  overline: PropTypes.bool,
};

export default Footer;
