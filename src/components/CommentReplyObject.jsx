import React, { useState } from "react";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { readableDate } from "../utils/readableDate";
import CommentInput from "./CommentInput";
import axios from "axios";

const CommentReplyObject = ({
  commentAuthor,
  commentDate,
  commentText,
  numberOfLikes,
  isLiked,
  toggleCommentLike,
  commentId,
  changeCommentLikeState,
  commentRepliedtoAuthorName,
  handleReply,
  setReplyText,
  setOpenCommentId,
  openCommentId,
  setCommentReplies,
  createdComment,
  parentCommentId,
  isReplyingToCommentReply
}) => {
  const [localLikeStatus, setLikeStatus] = useState(null);
  const [localNumberOfLikes, setLocalNumberOfLikes] = useState(null);
  const isInputVisible = openCommentId === commentId;
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

  const api_url =
    import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";

  const insertAfter = (targetId, newReplies) => {
    setCommentReplies((prevReplies) => {
      const index = prevReplies.findIndex((reply) => reply._id === targetId);
      if (index === -1) return prevReplies; // target not found

      const updatedReplies = [
        ...prevReplies.slice(0, index + 1),
        ...newReplies,
        ...prevReplies.slice(index + 1),
      ];

      return updatedReplies;
    });
  };

  return (
    <div className="w-full sm:w-[700px] mx-4 sm:mx-auto pt-5 border-b border-neutral-200 pb-5">
      <div className="">
        <div className="flex items-center gap-x-2">
          <div
            className="rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl font-outfit text-white font-extralight"
            style={{
              backgroundColor: "grey",
            }}
          >
            {commentAuthor &&
              commentAuthor.split(" ")[0].charAt(0).toUpperCase() +
                commentAuthor.split(" ")[1].charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-textColor1 font-normal pr-3 flex flex-wrap items-center text-sm sm:text-base">
              {commentAuthor}{" "}
              <span className="pl-2 text-xs sm:text-sm text-textColor1">
                {">"} Replied to: {commentRepliedtoAuthorName}
              </span>
            </p>

            <p className="text-xs sm:text-sm text-textColor1 font-extralight pr-3">
              {readableDate(commentDate)}
            </p>
          </div>
        </div>

        <div>
          <p className="text-textColor1 font-extralight pr-3 mt-2 flex text-sm sm:text-base">
            {isReplyingToCommentReply ? (
              <span className="mr-3 text-blue-800 font-normal">
                @{commentRepliedtoAuthorName}
              </span>
            ) : (
              ""
            )}
            {commentText}
          </p>

          <div className="flex gap-x-4 sm:gap-x-6 mt-3">
            <p className="flex items-center gap-x-1 text-xs sm:text-sm text-textColor1">
              <span className="cursor-pointer font-outfit">
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

            <p
              className="text-xs sm:text-sm text-textColor1 underline cursor-pointer"
              onClick={() => {
                console.log(commentId);
                setOpenCommentId(isInputVisible ? null : commentId);
              }}
            >
              create reply
            </p>
          </div>
        </div>

        <div>
          <CommentInput
            visibility={isInputVisible}
            handleSubmit={handleReply}
            setCommentText={setReplyText}
            commentId={parentCommentId}
            CommentAuthor={commentAuthor}
            updateListing={() => {
              insertAfter(commentId, [createdComment]);
            }}
            createdComment={createdComment}
            isReplyingToCommentReply={true}
          />
        </div>
      </div>
    </div>
  );
};

export default CommentReplyObject;
