import React from "react";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { readableDate } from "../../utils/readableDate";

const CommentObject = ({
  commentAuthor,
  commentDate,
  commentText,
  numberOfLikes,
  isLiked,
  toggleCommentLike,
  commentId,
}) => {
  return (
    <div className="w-[700px] mx-auto mt-20 pt-5 border-t-[1px] border-t-nuetral-200 border-b-[1px] border-b-nuetral-200 pb-5">
      <div className="">
        <div className="flex items-center gap-x-2 ">
          <div
            className="rounded-full w-10 h-10 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex] font-extralight"
            style={{
              backgroundColor: "grey",
            }}
          >
            {commentAuthor && commentAuthor.split(" ")[0].charAt(0).toUpperCase() +
              commentAuthor.split(" ")[1].charAt(0).toUpperCase()}
          </div>

          <div className="">
            <p className=" text-textColor1 font-normal pr-3">{commentAuthor}</p>

            <p className="text-xs text-textColor1 font-extralight pr-3 ">
              {readableDate(commentDate)}
            </p>
          </div>
        </div>

        <div className="">
          <p className="text-textColor1 font-extralight pr-3 mt-2">
            {commentText}
          </p>

          <div className="flex gap-x-6 mt-3">
            <p className="flex items-center gap-x-1 text-sm text-textColor1">
              <span className=" cursor-pointer ">
                {!isLiked ? (
                  <BiLike className="text-base" onClick={() => {toggleCommentLike()}} />
                ) : (
                  <BiSolidLike className="text-base" onClick={() => {toggleCommentLike()}} />
                )}
              </span>{" "}
              {numberOfLikes}
            </p>
            <p className="flex items-center gap-x-1 text-sm text-textColor1">
              <GoComment /> 0
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentObject;
