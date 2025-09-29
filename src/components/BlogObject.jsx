import PropTypes from "prop-types";
import React, { useState } from "react";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import { FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { BiLike } from "react-icons/bi";
import { GoComment } from "react-icons/go";
import { readableDate } from "../utils/readableDate";

const BlogObject = ({
  PostType,
  DateCreated,
  PostLenght,
  PostTitle,
  PostDescription,
  PostImage,
  author,
  postId,
  NumberOfLikes,
  NumberOfComments,
}) => {
  const { setExtraPostDetails } = useMyContext();
  const navigate = useNavigate();
  const [numberOfLikes, setNumberOfLikes] = useState(NumberOfLikes || 0);

  return (
    <Link
      to={`/post/${postId}`}
      state={{
        Author: author,
        DateCreated,
        PostLenght,
        PostTitle,
        NumberOfLikes,
        PostImage,
      }}
      onClick={() => window.scrollTo(0, 0)}
      className="block w-full max-w-2xl"
    >
      <div
        className="
          flex flex-col sm:flex-row 
          w-full sm:w-[500px] md:w-[600px] 
          h-auto sm:h-[200px] 
          bg-white rounded-xl shadow-sm 
          hover:shadow-md transition-shadow duration-300 
          overflow-hidden border border-slate-200 
          group relative
        "
      >
        {/* Accent bar */}
        <div className="w-2 bg-gradient-to-b from-customTeal to-cyan-400 hidden sm:block"></div>

        {/* Image */}
        <div className="w-full sm:w-[200px] h-[180px] sm:h-full relative flex-shrink-0">
          <img
            src={PostImage}
            alt="Blog cover"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            loading="lazy"
          />
          <span className="absolute top-3 left-3 bg-customTeal text-white text-xs px-3 py-1 rounded-full shadow font-bold tracking-wide">
            {PostType}
          </span>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-1 px-4 sm:px-6 py-3 sm:py-4">
          {/* Meta info */}
          <div className="flex items-center gap-2 sm:gap-3 text-[11px] sm:text-xs text-neutral-500 mb-1 flex-wrap">
            <img src={date_icon} alt="" className="w-3 sm:w-4" />
            <span>{readableDate(DateCreated)}</span>
            <span className="mx-1 sm:mx-2">•</span>
            <img src={clock_icon} alt="" className="w-3 sm:w-4" />
            <span>{PostLenght}</span>
          </div>

          {/* Title */}
          <h2 className="text-lg sm:text-xl md:text-2xl font-extrabold text-gray-900 mb-1 line-clamp-2">
            {PostTitle}
          </h2>

          {/* Description */}
          <p className="text-xs sm:text-sm text-gray-600 font-light mb-2 line-clamp-2">
            {PostDescription}
          </p>

          {/* Author */}
          <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-customTeal font-semibold mb-2">
            <FaUserEdit className="text-sm sm:text-base" />
            <span>{author}</span>
          </div>

          {/* Likes & Comments */}
          <div className="flex items-center gap-4 sm:gap-6 mt-auto">
            <span className="flex items-center gap-1 text-customTeal font-semibold text-xs sm:text-sm">
              <BiLike className="text-sm sm:text-lg" />
              {numberOfLikes}
              <span className="ml-1">{numberOfLikes === 1 ? "Like" : "Likes"}</span>
            </span>

            <span className="flex items-center gap-1 text-customTeal font-semibold text-xs sm:text-sm">
              <GoComment className="text-sm sm:text-lg" />
              {NumberOfComments ?? 0}
              <span className="ml-1">
                {NumberOfComments === 1 ? "Comment" : "Comments"}
              </span>
            </span>

            <span className="ml-auto text-[11px] sm:text-xs text-customTeal font-bold hover:underline cursor-pointer tracking-wide">
              Read More →
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
};

BlogObject.propTypes = {
  PostType: PropTypes.string.isRequired,
  DateCreated: PropTypes.string.isRequired,
  PostLenght: PropTypes.string.isRequired,
  PostTitle: PropTypes.string.isRequired,
  PostDescription: PropTypes.string.isRequired,
  PostImage: PropTypes.string.isRequired,
  author: PropTypes.string,
  postId: PropTypes.string,
  NumberOfLikes: PropTypes.number,
  NumberOfComments: PropTypes.number,
};

export default BlogObject;
