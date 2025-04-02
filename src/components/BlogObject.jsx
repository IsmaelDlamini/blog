import PropTypes from "prop-types";
import React from "react";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";

const BlogObject = ({
  PostType,
  DateCreated,
  PostLenght,
  PostTitle,
  PostDescription,
  PostImage,
}) => {
  return (
    <>
      <div className="w-[300px] h-[500px] thin-border p-2 mt-11">
        <div className="image w-full h-2/4">
          <img src={PostImage} alt="blog-image" className="w-full h-full" />
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

          <h1 className="mt-4 text-lg text-textColor1 leading-tight">
            {PostTitle}
          </h1>

          <p className="mt-4 leading-4 text-xs text-textColor1 font-outfit font-light">
            {PostDescription}
          </p>

          <div className=" px-4 py-2 mt-6 rounded-sm thin-border w-fit text-textColor1 text-sm font-outfit font-light cursor-pointer">
            Read Post
          </div>
        </div>
      </div>
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
