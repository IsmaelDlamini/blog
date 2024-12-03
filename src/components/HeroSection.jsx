import React from "react";

const HeroSection = () => {
  return (
    <>
      <div className="w-full py-12 mb-6 mt-10 text-center border-b-2 border-zinc-100">
        <h1 className="w-fit mx-auto mb-4 text-4xl font-bold font-poppins  text-neutral-600">
          Ismail's<span className="text-customTeal ml-2">Blog</span> <br />
          <span className="font-light text-xl">
            {" "}
            Your ultimate guide to Tech Success
          </span>
        </h1>

        <button className="rounded-md px-3 py-1 bg-customTeal text-white">
          Join Us
        </button>
      </div>
    </>
  );
};

export default HeroSection;
