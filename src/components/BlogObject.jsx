import PropTypes from "prop-types";
import React from "react";
import date_icon from "../assets/date-icon.png";
import clock_icon from "../assets/clock-icon.png";
import { FaUserEdit } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useMyContext } from "../context/MyContext";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { useState } from "react";
import { GoComment } from "react-icons/go";

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
    <>
      <Link
        to={`/post/${postId}`}
        state={{
          Author: author,
          DateCreated: DateCreated,
          PostLenght: PostLenght,
          PostTitle: PostTitle,
          NumberOfLikes: NumberOfLikes,
        }}
        onClick={() => {
          window.scrollTo(0, 0);
        }}
      >
        <div className="w-[300px] h-[430px] p-2 rounded-sm bg-white relative">
          <div className="image w-full h-[220px] aspect-video overflow-hidden rounded-md">
            <img
              src={PostImage}
              alt="Blog cover"
              className="w-full h-full object-cover"
              loading="lazy"
            />
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

            <div className="flex justify-between items-center mt-4 absolute bottom-0 left-0 right-0">
              <div className=" pl-2 pr-5 flex font-light w-full space-x-3 mx-auto items-center mt-3 border-b-[1px] border-b-nuetral-200 pb-3 justify-between  text-textColor1 font-outfit">
                <div className="flex gap-x-6">
                  <p className="flex items-center gap-x-1 text-sm ">
                    <span className=" ">
                      <BiLike className="text-base" />
                    </span>{" "}
                    {numberOfLikes} Like
                    {numberOfLikes > 1 ? "s" : numberOfLikes == 0 ? "s" : ""}
                  </p>{" "}
                  <p className="flex items-center gap-x-1 text-sm">
                    <GoComment /> 0 Comments
                  </p>
                </div>
              </div>
            </div>
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
