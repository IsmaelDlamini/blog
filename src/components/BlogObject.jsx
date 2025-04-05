import PropTypes from "prop-types";
import React from "react";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import { FaUserEdit } from "react-icons/fa";
import { Link } from "react-router-dom";

const BlogObject = ({
  PostType,
  DateCreated,
  PostLenght,
  PostTitle,
  PostDescription,
  PostImage,
  author,
  postId,
}) => {
  return (
    <>
      <Link to={`/post/${postId}`}>
        <div className="w-[300px] h-fit p-2 rounded-sm bg-white">
          <div className="image w-full h-[220px] aspect-video overflow-hidden rounded-md">
            <img
              src={PostImage}
              alt="Blog cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
            {/* <div className={`w-full h-full `}
          style={{ backgroundImage: `url(${PostImage})` }}
          ></div> */}
          </div>

          <div className="">
            <div className="tags flex h-fit items-center mt-4 space-x-2">
              <div className="bg-customTeal w-fit rounded-full px-2 py-[2px] text-white text-[10px]">
                {PostType}
              </div>
              <div className="flex space-x-1 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-0 thin-border">
                <img src={date_icon} alt="" className="w-4" />
                <p>{DateCreated}</p>
              </div>
              <div className="flex space-x-2 font-normal bg-white text-neutral-500 px-2 rounded-full text-[10px] items-center py-[2px] thin-border">
                <img src={clock_icon} alt="" className="w-3" />
                <p>{PostLenght}</p>
              </div>
            </div>

            <p className="flex items-center gap-x-2 font-extralight text-textColor1 mt-3 font-outfit text-sm">
              <FaUserEdit />
              {author}
            </p>

            <h1 className="mt-2 text-lg text-textColor1 leading-tight line-clamp-2">
              {PostTitle}
            </h1>

            <p className="mt-2 leading-4 text-xs text-textColor1 font-outfit font-light line-clamp-2">
              {PostDescription}
            </p>

            {/* <div className=" px-4 py-2 mt-6 rounded-sm thin-border w-fit text-textColor1 text-sm font-outfit font-light cursor-pointer">
              Read Post
            </div> */}
          </div>
        </div>
      </Link>
    </>
  );
};

BlogObject.protoTypes = {
  PostType: PropTypes.string.isRequired,
  DateCreated: PropTypes.string.isRequired,
  PostLenght: PropTypes.string.isRequired,
  PostTitle: PropTypes.string.isRequired,
  PostDescription: PropTypes.string.isRequired,
  PostImage: PropTypes.string.isRequired,
};

export default BlogObject;
