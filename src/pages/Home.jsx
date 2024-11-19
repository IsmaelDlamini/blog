import image1 from "../assets/blog-image.jpg";
import blog_image_2 from "../assets/blog-image-2.jpg";
import blog_image_3 from "../assets/blog-image-3.jpg";
import blog_image_4 from "../assets/blog-image-4.jpg";
import "../styles/global.css";
import Header from "../components/Header";
import searchIcon from "../assets/search_icon.png";
import blog_image_featured from "../assets/blog-image-featured.jpg";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import blog_image_extra_1 from "../assets/blog-image-extra1.jpg";
import blog_image_extra_2 from "../assets/blog-image-extra2.jpg";
import blog_image_extra_3 from "../assets/blog-image-extra3.jpg";
import { IoIosArrowRoundForward } from "react-icons/io";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full pt-16 ">
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

        <div className=" w-[1000px] mx-auto">
          <div className="utility-tab flex justify-between">
            <div className="search-bar w-1/3 h-10 thin-border flex items-center rounded-md justify-between px-4 border-neutral-300">
              <input
                type="text"
                placeholder="What are you looking for today?"
                className="px-3 py-1 outline-none text-sm font-outfit font-extralight flex-1 text-neutral-300"
              />
              <img src={searchIcon} alt="" className="w-5 cursor-pointer" />
            </div>

            <div className="w-1/4 h-10 thin-border flex items-center rounded-md justify-between px-4 border-neutral-300 font-extralight font-outfit">
              <select
                name="post_filter"
                id="post_filter"
                className="w-full text-neutral-300 font-extralight font-outfit outline-none text-sm"
              >
                <option
                  value="All Posts"
                  className="font-extralight font-outfit"
                >
                  All Posts
                </option>
              </select>
            </div>
          </div>

          <h2 className="mt-10 font-outfit text-neutral-500 font-light text-lg">
            Featured
          </h2>
          <div className="featured w-full h-[22rem] bg-[#3A7C80] mt-2 bg-opacity-[10%] flex">
            <div className="image-container h-full w-[40%] ">
              <img src={blog_image_featured} alt="" className="w-full h-full" />
            </div>
            <div className="information flex-1 w-full px-12 py-10">
              <div className="tags flex space-x-3">
                <div className="post-type bg-customTeal w-fit items-center flex rounded-full px-3 py-1 text-white text-xs ">
                  BLOG
                </div>
                <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-3 rounded-full text-xs items-center py-1">
                  <img src={date_icon} alt="" className="w-5" />
                  <p>23 August 2024</p>
                </div>
                <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-3 rounded-full text-xs items-center py-1">
                  <img src={clock_icon} alt="" className="w-4" />
                  <p>2-Mins</p>
                </div>
              </div>

              <h1 className="mt-4 text-4xl text-textColor1">
                How to Prepare yourself for the Workplace as a programmer
              </h1>

              <p className="mt-7 leading-4 text-xs text-textColor1 font-outfit font-light">
                Discover essential tips and strategies to prepare yourself for
                the workplace as a programmer. From building a solid technical
                foundation and mastering soft skills to creating a professional
                portfolio and acing job interviews, this guide will help you
                transition smoothly into your programming career.
              </p>

              <div className=" px-4 py-2 mt-9 rounded-sm bg-customTeal w-fit text-white text-sm font-outfit font-light cursor-pointer">
                Read More
              </div>
            </div>
          </div>

          <h2 className="mt-12 font-outfit text-neutral-500 font-light text-lg">
            More Reads
          </h2>

          <div className="more-reads flex space-x-2 mt-4 justify-between">
            <div className="extra-read w-[30%] h-[500px] thin-border px-3 py-3">
              <div className="image w-full h-2/4">
                <img
                  src={blog_image_extra_1}
                  alt=""
                  className="w-full h-full"
                />
              </div>

              <div className="information">
                <div className="tags flex h-fit items-center mt-4 space-x-2">
                  <div className="bg-customTeal w-fit rounded-full px-2 py-[2px] text-white text-[10px]">
                    BLOG
                  </div>
                  <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-0 thin-border">
                    <img src={date_icon} alt="" className="w-4" />
                    <p>23 August 2024</p>
                  </div>
                  <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-[2px] thin-border">
                    <img src={clock_icon} alt="" className="w-3" />
                    <p>2-Mins</p>
                  </div>
                </div>

                <h1 className="mt-4 text-lg text-textColor1 leading-tight">
                  Side Hustles that you can undertake as a University student to
                  make more cash
                </h1>

                <p className="mt-4 leading-4 text-xs text-textColor1 font-outfit font-light">
                  Discover profitable side hustles for university students to
                  earn extra cash while managing studies.
                </p>

                <div className=" px-4 py-2 mt-6 rounded-sm thin-border w-fit text-textColor1 text-sm font-outfit font-light cursor-pointer">
                  Read More
                </div>
              </div>
            </div>

            <div className="extra-read w-[30%] h-[500px] thin-border px-3 py-3">
              <div className="image w-full h-2/4">
                <img
                  src={blog_image_extra_2}
                  alt=""
                  className="w-full h-full"
                />
              </div>

              <div className="information">
                <div className="tags flex h-fit items-center mt-4 space-x-2">
                  <div className="bg-customTeal w-fit rounded-full px-2 py-[2px] text-white text-[10px]">
                    BLOG
                  </div>
                  <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-0 thin-border">
                    <img src={date_icon} alt="" className="w-4" />
                    <p>23 August 2024</p>
                  </div>
                  <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-[2px] thin-border">
                    <img src={clock_icon} alt="" className="w-3" />
                    <p>2-Mins</p>
                  </div>
                </div>

                <h1 className="mt-4 text-lg text-textColor1 leading-tight">
                  Is AI going to replace software engineers
                </h1>

                <p className="mt-4 leading-4 text-xs text-textColor1 font-outfit font-light">
                  Explore if AI will replace software engineers or redefine
                  their roles in the tech industry.
                </p>

                <div className=" px-4 py-2 mt-6 rounded-sm thin-border w-fit text-textColor1 text-sm font-outfit font-light cursor-pointer">
                  Read More
                </div>
              </div>
            </div>

            <div className="extra-read w-[30%] h-[500px] thin-border px-3 py-3">
              <div className="image w-full h-2/4">
                <img
                  src={blog_image_extra_3}
                  alt=""
                  className="w-full h-full"
                />
              </div>

              <div className="information">
                <div className="tags flex h-fit items-center mt-4 space-x-2">
                  <div className="bg-customTeal w-fit rounded-full px-2 py-[2px] text-white text-[10px]">
                    BLOG
                  </div>
                  <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-0 thin-border">
                    <img src={date_icon} alt="" className="w-4" />
                    <p>23 August 2024</p>
                  </div>
                  <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-[2px] thin-border">
                    <img src={clock_icon} alt="" className="w-3" />
                    <p>2-Mins</p>
                  </div>
                </div>

                <h1 className="mt-4 text-lg text-textColor1 leading-tight">
                  Top Coding Projects to Build Your Skills as a Software
                  Engineer
                </h1>

                <p className="mt-4 leading-4 text-xs text-textColor1 font-outfit font-light">
                  Explore coding projects to enhance your skills and boost your
                  software engineering portfolio.
                </p>

                <div className=" px-4 py-2 mt-6 rounded-sm thin-border w-fit text-textColor1 text-sm font-outfit font-light cursor-pointer">
                  Read More
                </div>
              </div>
            </div>
          </div>

          {/* extra button */}

          <div className="w-full my-8">
            <button className="bg-customTeal px-6 py-2 text-white text-sm font-outfit font-extralight border-none outline-none">
              See More
            </button>
          </div>
        </div>


        {/* call to action section */}

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
                <p className="text-white font-light">Get Interesting Insights</p>

                <p className="text-2xl text-white mt-0">
                  Subscribe To Our Weekly News Letter
                </p>

                <div className="mt-2 bg-[#A6C5C1] flex justify-between px-2 py-2">
                  <input
                    type= "email"
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


        {/* footer section */}

        <div className="footer w-full h-80">

hello world




        </div>





      </div>
    </>
  );
};

export default Home;
