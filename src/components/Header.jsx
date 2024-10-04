import React from "react";
import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";

const Header = () => {
  return (
    <>
      <header className=" w-full py-3 px-10 shadow-sm shadow-slate-100 flex justify-between items-center  fixed bg-white">
        <img src={site_logo} alt="site-logo" className="w-24 cursor-pointer" />

        <nav>
          <ul className="flex space-x-4 font-outfit text-neutral-500 ">
            <li className=" cursor-pointer border-b-2 border-b-customTeal">Home</li>
            <li className=" cursor-pointer">Blogs</li>
            <li className=" cursor-pointer">Work</li>
            <li className=" cursor-pointer">About Us</li>
            <li className=" cursor-pointer">Contact Us</li>
          </ul>
        </nav>

        <div className="flex">
          {/* <div className="rounded-full thin-border border-neutral-700 px-2 py-1 mr-4 flex items-center">
            <input
              type="search"
              placeholder="What you looking for ?"
              className=" text-sm/3 px-4 border-none outline-none placeholder-neutral-600 font-outfit"
            />
            <img src={search_icon} alt="search" className="w-4 h-4 " />
          </div> */}

          <button className=" rounded-full bg-customTeal text-slate-50 px-4 py-1 font-outfit text-sm">
            Start Writing
          </button>
        </div>
      </header>
    </>
  );
};

export default Header;
