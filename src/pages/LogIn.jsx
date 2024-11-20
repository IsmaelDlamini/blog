import React from "react";
import site_logo from "../assets/site_logo.png";

const LogIn = () => {
  return (
    <>
      <div className="w-full h-screen flex items-center justify-center">
        {/*form container */}
        <div className="w-96 h-fit text-center">
          <img src={site_logo} alt="site logo" className="w-60 mx-auto" />

          <h1 className="mt-10 font-[rosarivo] text-5xl text-customTeal font-medium">
            Login
          </h1>
          <p className="text-textColor1 mt-3 font-[roboto flex] font-thin">
            Welcome back, Login to manage your posts.
          </p>

          <form action="" className="font-[roboto flex] text-textColor1 mt-10">
            <label htmlFor="" className="block  font-thin">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[robot flex] font-thin"
            />

            <label htmlFor="" className="block  font-thin mt-4">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[roboto flex] font-thin"
            />

            <button className="mt-8 bg-customTeal px-11 py-2 text-white font-light rounded-sm text-sm">
              Proceed
            </button>

            <p className="mt-3 font-thin">
              Don't have and account?{" "}
              <span className="text-customTeal underline underline-offset-1 cursor-pointer ">
                Create account
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
