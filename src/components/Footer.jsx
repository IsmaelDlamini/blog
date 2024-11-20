import React from "react";
import site_logo from "../assets/site_logo.png";
import instagram_icon from "../assets/instagram-icon.png";
import facebook_icon from "../assets/facebook-icon.png";
import linkedin_icon from "../assets/linkedin-icon.png";

const Footer = () => {
  return (
    <>
      <div className="footer w-full h-44 flex items-center mt-12 flex-col">
        <div className="w-[1000px] mx-auto h-4/5 flex space-x-24 border-b-[1px] pb-3">
          <div>
            <img src={site_logo} alt="site-logo" className="w-56" />
            <div className="flex space-x-4 mt-4">
              <img src={instagram_icon} alt="social-icon" className="w-8 h-8" />
              <img src={facebook_icon} alt="social-icon" className="w-8 h-8" />
              <img src={linkedin_icon} alt="social-icon" className="w-8 h-8" />
            </div>
          </div>

          <ul className="font-outfit font-thin">
            <li className="text-2xl font-light text-textColor1">Quick Links</li>
            <li>Home</li>
            <li>Portfolio</li>
            <li>About</li>
            <li>Contact</li>
          </ul>

          <ul className="font-outfit font-thin">
            <li className="text-2xl font-light text-textColor1">
              Useful Links
            </li>
            <li>FAQ'S</li>
            <li>Terms of Service</li>
            <li>Privacy Policy</li>
          </ul>

          <ul className="font-outfit font-thin">
            <li className="text-2xl font-light text-textColor1">Resources</li>
            <li>Newsletter</li>
            <li>Github</li>
            <li>Support</li>
            <li>Help Center</li>
          </ul>
        </div>

        <p className="font-outfit font-extralight my-4 pb-4 text-textColor1">
          Ismael Dlamini 2024 - &copy; Copyright reserved
        </p>
      </div>
    </>
  );
};

export default Footer;
