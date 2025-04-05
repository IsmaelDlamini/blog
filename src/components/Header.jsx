import React, { useState } from "react";
import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { TfiWrite } from "react-icons/tfi";
import { useMyContext } from "../context/MyContext";


const Header = ({ currentPage }) => {
  // the navigation options to be displayed on the header
  const [navOptions] = useState(["Home", "Portfolio", "About", "Contact"]);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const {setUserDataGlobalValue} = useMyContext();

  const [userData, setUserData] = useState(null);

  const logout = async () => {
    const api_url = "http://localhost:3000";

    try {
      const response = await axios.post(
        `${api_url}/api/users/logout`,
        {},
        { withCredentials: true }
      );

      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    async function checkLoginStatus() {
      try {
        const api_url = "http://localhost:3000";

        const response = await axios.get(`${api_url}/api/users/userInfo`, {
          withCredentials: true,
        });

        setUserData(response.data);

        setIsLoggedIn(true);
        setUserDataGlobalValue(response.data); // Set the user data in the global context
      } catch (error) {
        console.error(error);
        setIsLoggedIn(false);
      }
    }

    checkLoginStatus();
  }, []);

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
      <header className=" w-full py-5 px-36 shadow-sm shadow-slate-100 flex justify-between items-center sticky top-0 bg-white z-50">
        <img src={site_logo} alt="site-logo" className="w-48 cursor-pointer" />

        {/* navigation section */}
        <nav>
          <ul className="flex space-x-4 font-outfit text-neutral-800 font-extralight">
            {loadNavOptions}
          </ul>
        </nav>

        {/* signup and login button */}
        {!isLoggedIn ? (
          <div className="flex items-center">
            <p className="mr-3 text-textColor1 text-sm cursor-pointer">
              <Link to={"/signup"}>Sign Up</Link>
            </p>
            <button className=" rounded-full bg-customTeal text-white font-extralight px-4 py-1 font-outfit text-sm">
              <Link to="/login">LOG IN</Link>
            </button>
          </div>
        ) : (
          <div className="font-outfit text-neutral-800 font-extralight flex gap-x-2 items-center ">
            <button className="underline underline-offset-1" onClick={logout}>Logout</button>
            <Link to={"/create"}>
              <button className="rounded-md px-3 py-1 bg-customTeal text-white text-sm flex gap-x-2 items-center">
                Create Post <TfiWrite />
              </button>
            </Link>
            <div className="flex space-x-3 mx-auto items-center ">
              <div className="rounded-full w-10 h-10 bg-purple-900 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex]">
                {userData.name.charAt(0).toUpperCase()}
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
