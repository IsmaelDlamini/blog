import React from "react";
import PropTypes from "prop-types";
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
  author,
}) => {
  return (
    <div className="relative w-full min-h-[22rem] rounded-2xl overflow-hidden shadow-sm bg-white flex flex-col md:flex-row mt-8 border border-cyan-100">
      {/* Image Section */}
      <div className="md:w-[44%] w-full h-56 md:h-auto relative flex items-center justify-center bg-gradient-to-tr from-cyan-100 via-white to-cyan-50">
        {image}
        <span className="absolute top-4 left-4 bg-customTeal text-white text-xs px-4 py-1 rounded-full shadow font-bold tracking-wide border border-white/70">
          {postType}
        </span>
      </div>
      {/* Content Section */}
      <div className="flex-1 flex flex-col justify-center px-8 py-8 md:py-0 bg-gradient-to-br from-white via-cyan-50 to-white">
        <div className="flex flex-wrap gap-3 items-center mb-3">
          <div className="flex items-center gap-1 bg-cyan-50 text-customTeal px-3 rounded-full text-xs py-1 shadow-sm border border-cyan-100">
            <img src={date_icon} alt="" className="w-4" />
            <span>{datePosted}</span>
          </div>
          <div className="flex items-center gap-1 bg-cyan-50 text-customTeal px-3 rounded-full text-xs py-1 shadow-sm border border-cyan-100">
            <img src={clock_icon} alt="" className="w-4" />
            <span>{readTime}</span>
          </div>
          <div className="flex items-center gap-1 text-customTeal text-xs font-semibold">
            <FaUserEdit />
            <span>{author}</span>
          </div>
        </div>
        <h1 className="text-4xl font-extrabold text-gray-900 mb-3 leading-tight line-clamp-2">{title}</h1>
        <p className="text-lg text-gray-700 font-light mb-8 line-clamp-3">{description}</p>
        <button className="self-start px-7 py-2.5 rounded-full bg-customTeal text-white text-base font-semibold shadow-md hover:bg-cyan-700 transition-all duration-200">
          Read More
        </button>
      </div>
      {/* Decorative accent shapes */}
      <div className="absolute -top-8 -right-8 w-32 h-32 bg-cyan-200 rounded-full opacity-20 pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-customTeal rounded-full opacity-10 pointer-events-none"></div>
    </div>
  );
};

FeaturedPost.propTypes = {
  postType: PropTypes.string,
  image: PropTypes.string,
  datePosted: PropTypes.string,
  readTime: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  author: PropTypes.string,
};

export default FeaturedPost;