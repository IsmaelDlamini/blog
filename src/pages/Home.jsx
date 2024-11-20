import "../styles/global.css";
import Header from "../components/Header";
import blog_image_featured from "../assets/blog-image-featured.jpg";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import blog_image_extra_1 from "../assets/blog-image-extra1.jpg";
import blog_image_extra_2 from "../assets/blog-image-extra2.jpg";
import blog_image_extra_3 from "../assets/blog-image-extra3.jpg";
import Footer from "../components/Footer";
import BlogObject from "../components/BlogObject";
import { useState } from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";

const Home = () => {
  // data for the extra posts
  const [extraPosts, setExtraPosts] = useState([
    {
      PostType: "BLOG",
      DatePosted: "20 January 2024",
      PostLenght: "2-Mins",
      PostTitle:
        "Side Hustles that you can undertake as a University student to make more cash",
      PostDescription:
        "Discover profitable side hustles for university students to earn extra cash while managing studies.",
      PostImage: blog_image_extra_1,
    },

    {
      PostType: "BLOG",
      DatePosted: "20 January 2024",
      PostLenght: "2-Mins",
      PostTitle: "Is AI going to replace software engineers?",
      PostDescription:
        "Explore if AI will replace software engineers or redefine their roles in the tech industry.",
      PostImage: blog_image_extra_2,
    },

    {
      PostType: "BLOG",
      DatePosted: "20 January 2024",
      PostLenght: "2-Mins",
      PostTitle:
        "Top Coding Projects to Build Your Skills as a Software Engineer.",
      PostDescription:
        "Explore coding projects to enhance your skills and boost your software engineering portfolio.",
      PostImage: blog_image_extra_3,
    },
  ]);

  const loadPosts = extraPosts.map((post, index) => {
    return (
      <BlogObject
        PostType={post.PostType}
        DateCreated={post.DatePosted}
        PostLenght={post.PostLenght}
        PostImage={post.PostImage}
        PostDescription={post.PostDescription}
        PostTitle={post.PostTitle}
        key={index}
      />
    );
  });

  return (
    <>
      <Header />
      <div className="w-full pt-16 ">
        <HeroSection />

        <div className=" w-[1000px] mx-auto">
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

          <div className="flex space-x-2 mt-4 justify-between">{loadPosts}</div>

          <div className="w-full my-8 flex justify-center">
            <button className="bg-customTeal px-6 py-2 text-white text-sm font-outfit font-extralight border-none outline-none">
              See More
            </button>
          </div>
        </div>

        <CallToAction />

        <Footer />
      </div>
    </>
  );
};

export default Home;
