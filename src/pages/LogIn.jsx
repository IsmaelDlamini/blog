import React, { useState } from "react";
import site_logo from "../assets/site_logo.png";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const login = (e) => {
    e.preventDefault();

    const api_url =
      import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
        ? import.meta.env.VITE_API_URL
        : "http://localhost:3000";

    axios
      .post(
        `${api_url}/api/users/login`,
        {
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        localStorage.setItem("userData", JSON.stringify(response.data));
        navigate("/"); // Redirect to the home page after successful login
      })
      .catch((error) => {
        console.error("Login error:", error);
      });
  };

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

          <form
            onSubmit={login}
            className="font-[roboto flex] text-textColor1 mt-10"
          >
            <label htmlFor="" className="block  font-thin">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[robot flex] font-thin"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <label htmlFor="" className="block  font-thin mt-4">
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[roboto flex] font-thin"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              className="mt-8 bg-customTeal px-11 py-2 text-white font-light rounded-sm text-sm"
              type="submit"
            >
              Proceed
            </button>

            <p className="mt-3 font-thin">
              Don't have and account?{" "}
              <span className="text-customTeal underline underline-offset-1 cursor-pointer ">
                <Link to="/signup">Create account</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default LogIn;
