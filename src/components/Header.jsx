import React, { useState, useEffect, useMemo } from "react";
import site_logo from "../assets/site_logo.png";
import { Link } from "react-router-dom";
import axios from "axios";
import { TfiWrite } from "react-icons/tfi";
import { useMyContext } from "../context/MyContext";
import AvatarColors from "../data/AvatarColors";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoMdClose } from "react-icons/io";

const Header = ({ currentPage }) => {
  const [navOptions] = useState(["Home", "About", "Contact"]);
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem("isLoggedIn") === "true"
  );
  const { setUserDataGlobalValue } = useMyContext();
  const [userData, setUserData] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false); // 🔹 for mobile nav

  const logout = async () => {
    const api_url =
      import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
        ? import.meta.env.VITE_API_URL
        : "http://localhost:3000";

    try {
      await axios.post(`${api_url}/api/users/logout`, {}, { withCredentials: true });
      window.location.href = "/login";
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkLoginStatus();
  }, []);

  const checkLoginStatus = async () => {
    try {
      const api_url =
        import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
          ? import.meta.env.VITE_API_URL
          : "http://localhost:3000";
      const { data } = await axios.get(`${api_url}/api/users/userInfo`, {
        withCredentials: true,
      });

      setUserData(data);
      setUserDataGlobalValue(data);
      localStorage.setItem("isLoggedIn", "true");
      handleAvatarColor(data.profilePhoto);
    } catch (error) {
      console.error(error);
      setIsLoggedIn(false);
    }
  };

  const handleAvatarColor = (profilePhoto) => {
    if (!profilePhoto && !sessionStorage.getItem("userAvatarColor")) {
      const randomIndex = Math.floor(Math.random() * AvatarColors.length);
      sessionStorage.setItem("userAvatarColor", AvatarColors[randomIndex]);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.trim().split(" ");
    return parts.length > 1
      ? parts[0][0].toUpperCase() + parts[1][0].toUpperCase()
      : parts[0][0].toUpperCase();
  };

  const loadNavOptions = useMemo(
    () =>
      navOptions.map((nav, index) => (
        <li
          className={`cursor-pointer ${
            currentPage == nav ? "border-b-2 border-b-customTeal" : ""
          }`}
          key={index}
          onClick={() => setMenuOpen(false)} // close menu on click
        >
          <Link to={`${nav == "Home" ? "/" : `/${nav.toLocaleLowerCase()}`}`}>
            {nav}
          </Link>
        </li>
      )),
    [navOptions, currentPage]
  );

  return (
    <>
      <header className="w-full py-4 px-6 md:px-12 lg:px-36 shadow-sm shadow-slate-100 flex justify-between items-center sticky top-0 bg-white z-50">
        {/* Logo */}
        <Link to="/">
          <img src={site_logo} alt="site-logo" className="w-36 md:w-44 cursor-pointer" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:block">
          <ul className="flex space-x-6 font-outfit text-neutral-800 font-extralight">
            {loadNavOptions}
          </ul>
        </nav>

        {/* Right side (Auth / User actions) */}
        <div className="hidden md:flex items-center">
          {!isLoggedIn ? (
            <div className="flex items-center">
              <p className="mr-3 text-textColor1 text-sm cursor-pointer">
                <Link to={"/signup"}>Sign Up</Link>
              </p>
              <button className="rounded-full bg-customTeal text-white font-extralight px-4 py-1 font-outfit text-sm">
                <Link to="/login">LOG IN</Link>
              </button>
            </div>
          ) : (
            <div className="font-outfit text-neutral-800 font-extralight flex gap-x-2 items-center">
              <button className="underline underline-offset-1" onClick={logout}>
                Logout
              </button>
              <Link to={"/create"}>
                <button className="rounded-md px-3 py-1 bg-customTeal text-white text-sm flex gap-x-2 items-center">
                  Create Post <TfiWrite />
                </button>
              </Link>
              <div className="flex space-x-3 mx-auto items-center">
                <div
                  className="rounded-full w-10 h-10 flex items-center justify-center text-xl font-outfit text-white cursor-pointer"
                  style={{
                    backgroundColor: sessionStorage.getItem("userAvatarColor"),
                  }}
                >
                  {getInitials(userData?.name)}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <IoMdClose size={28} /> : <GiHamburgerMenu size={24} />}
          </button>
        </div>
      </header>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 w-full z-40 px-6 py-4">
          <ul className="flex flex-col space-y-4 font-outfit text-neutral-800 font-extralight">
            {loadNavOptions}
          </ul>

          <div className="mt-6 border-t pt-4">
            {!isLoggedIn ? (
              <div className="flex flex-col gap-3">
                <Link to={"/signup"} className="text-customTeal">
                  Sign Up
                </Link>
                <Link
                  to="/login"
                  className="bg-customTeal px-4 py-2 rounded-md text-white text-center"
                >
                  LOG IN
                </Link>
              </div>
            ) : (
              <div className="flex flex-col gap-4">
                <button
                  className="underline underline-offset-1 text-left"
                  onClick={logout}
                >
                  Logout
                </button>
                <Link to={"/create"}>
                  <button className="rounded-md px-3 py-2 bg-customTeal text-white text-sm flex gap-x-2 items-center w-full justify-center">
                    Create Post <TfiWrite />
                  </button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
