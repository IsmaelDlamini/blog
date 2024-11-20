import React from "react";
import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";

const Header = ({currentPage}) => {
  return (
    <>
      <header className=" w-full py-5 px-36 shadow-sm shadow-slate-100 flex justify-between items-center  fixed bg-white">
        <img src={site_logo} alt="site-logo" className="w-48 cursor-pointer" />

        <nav>
          <ul className="flex space-x-4 font-outfit text-neutral-800 font-extralight">
            <li className={` cursor-pointer  ${currentPage == "Home" ? "border-b-2 border-b-customTeal" :  ""}`}>Home</li>
            <li className=" cursor-pointer"><a href="https://ismail-dlamini.apsystems.africa">Portfolio</a></li>
            <li className={` cursor-pointer ${currentPage == "About" ? "border-b-2 border-b-customTeal" :  ""}`}>About Us</li>
            <li className={` cursor-pointer ${currentPage == "Contact" ? "border-b-2 border-b-customTeal" :  ""}`}>Contact Us</li>
          </ul>
        </nav>

        <div className="flex items-center">
          <p className="mr-3 text-textColor1 text-sm cursor-pointer">Sign Up</p>
          <button className=" rounded-full bg-customTeal text-slate-50 font-extralight px-4 py-1 font-outfit text-sm">
            log In
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
