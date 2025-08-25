import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";

const CallToAction = () => {
  return (
    <>
      <div className="w-full bg-[#007D6F] py-12">
        <div className="w-full max-w-6xl mx-auto h-full flex flex-col lg:flex-row px-6 gap-10">
          {/* Left Side */}
          <div className="lg:w-1/2 space-y-5 flex flex-col justify-center text-center lg:text-left">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl text-white font-raleway leading-snug">
              Let’s Publish Together
            </h2>

            <p className="text-white font-extralight text-base sm:text-lg">
              Have the wish to join the team?
            </p>

            <button className="mx-auto lg:mx-0 w-fit bg-[#02B19E] px-5 py-3 text-white text-base sm:text-lg hover:bg-[#029b8c] transition-all">
              Get In Touch
            </button>
          </div>

          {/* Right Side */}
          <div className="lg:w-1/2 flex items-center justify-center">
            <div className="w-full sm:w-4/5 bg-[#006F62] p-5 rounded-lg">
              <p className="text-white font-light text-center lg:text-left">
                Get Interesting Insights
              </p>

              <p className="text-xl sm:text-2xl text-white mt-1 text-center lg:text-left">
                Subscribe To Our Weekly Newsletter
              </p>

              {/* Email input */}
              <div className="mt-3 bg-[#A6C5C1] flex justify-between px-2 py-2 rounded-md">
                <input
                  type="email"
                  placeholder="Enter your email."
                  className="flex-1 bg-[#A6C5C1] text-textColor1 font-extralight 
                             placeholder:font-extralight placeholder:text-textColor1 
                             outline-none placeholder:text-sm px-2 text-sm sm:text-base"
                />

                <div className="flex justify-center items-center bg-customTeal px-3 py-1 text-white text-2xl rounded-md cursor-pointer hover:bg-[#029b8c] transition-all">
                  <IoIosArrowRoundForward />
                </div>
              </div>

              <p className="mt-3 text-white text-xs sm:text-sm font-extralight text-center lg:text-left">
                Or follow us on social media
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default CallToAction
