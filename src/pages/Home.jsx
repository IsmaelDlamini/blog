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
import FeaturedPost from "../components/FeaturedPost";

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
      <Header currentPage={"Home"} />
      <div className="w-full pt-16 ">
        <HeroSection />

        <div className=" w-[1000px] mx-auto">
          <FeaturedPost
            postType="BLOG"
            image={
              <img src={blog_image_featured} alt="" className="w-full h-full" />
            }
            datePosted="23 August 2024"
            readTime="2-Mins"
            title="How to Prepare yourself for the Workplace as a programmer"
            description="Discover essential tips and strategies to prepare yourself for the workplace as a programmer. From building a solid technical foundation and mastering soft skills to creating a professional portfolio and acing job interviews, this guide will help you transition smoothly into your programming career."
          />

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
