import React, { useEffect } from "react";
import site_logo from "../assets/site_logo.png";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const navigate = useNavigate();

  const api_url =
    import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";

  const signup = (e) => {
    e.preventDefault(); // Prevent page reload on form submission

    axios
      .post(
        `${api_url}/api/users/register`,
        {
          name: firstName + " " + lastName,
          email: email,
          password: password,
        },
        { withCredentials: true }
      )
      .then((response) => {
        navigate("/"); // Redirect to the home page after successful registering of the user account
        console.log("Signup successful:", response.data); // Handle success response
      })
      .catch((error) => {
        console.error("Error signing up:", error); // Handle error response
      });
  };

  return (
    <>
      <div className="w-full h-screen flex pt-9 pb-9 justify-center overflow-auto">
        {/*form container */}
        <div className="w-96 h-fit text-center">
          <img src={site_logo} alt="site logo" className="w-60 mx-auto" />

          <h1 className="mt-10 font-[rosarivo] text-5xl text-customTeal font-medium">
            Signup
          </h1>
          <p className="text-textColor1 mt-3 font-[roboto flex] font-thin">
            Get started by creating an account.
          </p>

          <form
            onSubmit={(e) => signup(e)}
            className="font-[roboto flex] text-textColor1 mt-10"
          >
            <label htmlFor="" className="block  font-thin">
              First Name and Last Name
            </label>
            <input
              type="text"
              placeholder="Enter your First Name and Last Name"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[robot flex] font-thin"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />

            <label htmlFor="" className="block  font-thin mt-4">
              Email Address
            </label>
            <input
              type="email"
              placeholder="Enter your email address"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[roboto flex] font-thin"
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

            <label htmlFor="" className="block  font-thin mt-4">
              Confirm Password
            </label>
            <input
              type="password"
              placeholder="Confirm your password"
              className="block mx-auto border-[1px] bg-white px-5 py-2 placeholder:text-center placeholder:font-extralight mt-2 w-4/5 outline-none text-center font-[roboto flex] font-thin"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />

            <div className="flex items-center font-thin font-[roboto flex] text-sm mt-5 justify-center">
              <input type="checkbox" className="mr-1" />{" "}
              <p>
                I accept Ismail’s blog’s{" "}
                <span className="font-normal underline cursor-pointer">
                  Terms of service
                </span>{" "}
                and{" "}
                <span className="font-normal underline cursor-pointer">
                  Privacy policy
                </span>{" "}
              </p>
            </div>

            <button
              type="submit"
              className="mt-6 bg-customTeal px-11 py-2 text-white font-light rounded-sm text-sm"
            >
              Proceed
            </button>

            <p className="mt-3 font-thin">
              Already have an account?{" "}
              <span className="text-customTeal underline underline-offset-1 cursor-pointer ">
                <Link to="/login">Login</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
