import React, { useState } from "react";
import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";
import { Link } from "react-router-dom";

const Header = ({ currentPage }) => {
  // the navigation options to be displayed on the header
  const [navOptions] = useState(["Home", "Portfolio", "About", "Contact"]);

  // mapping over the navOptions array to display the navigation options
  const loadNavOptions = navOptions.map((nav, index) => {
    return (
      <li
        className={` cursor-pointer  ${
          currentPage == nav ? "border-b-2 border-b-customTeal" : ""
        }`}
        key={index}
      >
        <Link to={`${nav == "Home" ? "/" : `/${nav.toLocaleLowerCase()}`}`}>
          {nav}
        </Link>
      </li>
    );
  });

  return (
    <>
      <header className=" w-full py-5 px-36 shadow-sm shadow-slate-100 flex justify-between items-center fixed bg-white z-50">
        <img src={site_logo} alt="site-logo" className="w-48 cursor-pointer" />

        {/* navigation section */}
        <nav>
          <ul className="flex space-x-4 font-outfit text-neutral-800 font-extralight">
            {loadNavOptions}
          </ul>
        </nav>

        {/* signup and login button */}
        <div className="flex items-center">
          <p className="mr-3 text-textColor1 text-sm cursor-pointer">
            <Link to={"/signup"}>Sign Up</Link>
          </p>
          <button className=" rounded-full bg-customTeal text-white font-extralight px-4 py-1 font-outfit text-sm">
            <Link to="/login">LOG IN</Link>
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
