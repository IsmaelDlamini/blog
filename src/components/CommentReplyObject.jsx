import React, { useState } from "react";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { readableDate } from "../../utils/readableDate";

const CommentReplyObject = ({
  commentAuthor,
  commentDate,
  commentText,
  numberOfLikes,
  isLiked,
  toggleCommentLike,
  commentId,
  changeCommentLikeState,
}) => {
  const [localLikeStatus, setLikeStatus] = useState(null);
  const [localNumberOfLikes, setLocalNumberOfLikes] = useState(null);

  const useLikeStatus = localLikeStatus == null ? isLiked : localLikeStatus;

  const useLocalNumberOfLikes =
    localNumberOfLikes == null ? numberOfLikes : localNumberOfLikes;

  const handleLikeAction = (action) => {
    setLikeStatus(action == "like" ? true : false);
    setLocalNumberOfLikes((prevLikes) =>
      action === "like"
        ? prevLikes + 1
        : prevLikes > 0
        ? prevLikes - 1
        : prevLikes
    );
    toggleCommentLike();
  };

  return (
    <div className="w-[700px] mx-auto pt-5 border-b-[1px] border-b-nuetral-200 border-b-nuetral-200 pb-5">
      <div className="">
        <div className="flex items-center gap-x-2 ">
          <div
            className="rounded-full w-10 h-10 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex] font-extralight"
            style={{
              backgroundColor: "grey",
            }}
          >
            {commentAuthor &&
              commentAuthor.split(" ")[0].charAt(0).toUpperCase() +
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
              <span className=" cursor-pointer font-outfit">
                {!useLikeStatus ? (
                  <BiLike
                    className="text-base"
                    onClick={() => {
                      handleLikeAction("like");
                    }}
                  />
                ) : (
                  <BiSolidLike
                    className="text-base"
                    onClick={() => {
                      handleLikeAction("unlike");
                    }}
                  />
                )}
              </span>{" "}
              {useLocalNumberOfLikes}
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

export default CommentReplyObject;
