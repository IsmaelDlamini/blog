import React from 'react'
import { IoIosArrowRoundForward } from "react-icons/io";

const CallToAction = () => {
  return (
   <>
     <div className="w-full bg-[#007D6F] h-80  block">
          <div className="w-[1000px] mx-auto h-full flex">
            <div className="w-2/4 space-y-5 flex flex-col justify-center">
              <h2 className="text-5xl text-white font-raleway">
                Let’s Publish Together
              </h2>

              <p className="text-white font-extralight text-lg ">
                Have the wish to join the team?{" "}
              </p>

              <button className="w-fit bg-[#02B19E] px-5 py-3 text-white text-lg">
                Get In Touch
              </button>
            </div>

            <div className="w-2/4 flex items-center justify-center">
              <div className="w-4/5 bg-[#006F62] p-5">
                <p className="text-white font-light">
                  Get Interesting Insights
                </p>

                <p className="text-2xl text-white mt-0">
                  Subscribe To Our Weekly News Letter
                </p>

                <div className="mt-2 bg-[#A6C5C1] flex justify-between px-2 py-2">
                  <input
                    type="email"
                    placeholder="Enter your email."
                    className="bg-[#A6C5C1] text-textColor1 font-extralight placeholder:font-extralight placeholder:text-textColor1 outline-none placeholder:text-sm px-2"
                  />

                  <div className="flex justify-center items-center bg-customTeal px-3 py-1 text-white text-2xl">
                    <IoIosArrowRoundForward />
                  </div>
                </div>

                <p className=" mt-3 text-white text-sm font-extralight">
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
