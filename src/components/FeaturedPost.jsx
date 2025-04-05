import React from "react";
import PropTypes from "prop-types";
import blog_image_featured from "../assets/blog-image-featured.jpg";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import { FaUserEdit } from "react-icons/fa";

const FeaturedPost = ({
  postType,
  image,
  datePosted,
  readTime,
  title,
  description,
  author
}) => {
  return (
    <>
      <div className="featured w-full h-[22rem] bg-[#3A7C80] mt-2 bg-opacity-[10%] flex">
        <div className="image-container h-full w-[40%] overflow-hidden">{image}</div>
        <div className="information flex-1 w-full px-12 py-10">
          <div className="tags flex space-x-3">
            <div className="post-type bg-customTeal w-fit items-center flex rounded-full px-3 py-1 text-white text-xs ">
              {postType}
            </div>
            <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-3 rounded-full text-xs items-center py-1">
              <img src={date_icon} alt="" className="w-5" />
              <p>{datePosted}</p>
            </div>
            <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-3 rounded-full text-xs items-center py-1">
              <img src={clock_icon} alt="" className="w-4" />
              <p>{readTime}</p>
            </div>
          </div>

          <p className="flex items-center gap-x-2 font-extralight text-textColor1 mt-3 font-outfit text-sm"><FaUserEdit />{author}</p>

          <h1 className="mt-2 text-4xl text-textColor1 line-clamp-2">{title}</h1>         

          <p className="mt-5 leading-4 text-xs text-textColor1 font-outfit font-light line-clamp-3">
            {description}
          </p>

          <div className=" px-4 py-2 mt-4 rounded-sm bg-customTeal w-fit text-white text-sm font-outfit font-light cursor-pointer">
            Read More
          </div>
        </div>
      </div>
    </>
  );
};

export default FeaturedPost;
