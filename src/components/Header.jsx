import React from "react";
import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";

const Header = () => {
  return (
    <>
      <header className=" w-full py-5 px-36 shadow-sm shadow-slate-100 flex justify-between items-center  fixed bg-white">
        <img src={site_logo} alt="site-logo" className="w-48 cursor-pointer" />

        <nav>
          <ul className="flex space-x-4 font-outfit text-neutral-800 font-extralight">
            <li className=" cursor-pointer border-b-2 border-b-customTeal">Home</li>
            <li className=" cursor-pointer">Blogs</li>
            <li className=" cursor-pointer">Work</li>
            <li className=" cursor-pointer">About Us</li>
            <li className=" cursor-pointer">Contact Us</li>
          </ul>
        </nav>

        <div className="flex">
          
          <button className=" rounded-full bg-customTeal text-slate-50 px-4 py-1 font-outfit text-sm">
            Start Writing
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
