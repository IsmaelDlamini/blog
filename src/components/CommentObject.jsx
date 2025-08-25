import React, { useState } from "react";
import { GoComment } from "react-icons/go";
import { BiLike, BiSolidLike } from "react-icons/bi";
import { readableDate } from "../utils/readableDate";
import CommentReplyObject from "./CommentReplyObject";
import CommentInput from "./CommentInput.jsx";
import axios from "axios";

const CommentObject = ({
  commentAuthor,
  commentDate,
  commentText,
  numberOfLikes,
  isLiked,
  toggleCommentLike,
  commentId,
  changeCommentLikeState,
  replyData,
  openCommentId,
  setOpenCommentId,
  handleReply,
  setReplyText,
  createdComment,
  toggleCommentReplyLike,
}) => {
  const isInputVisible = openCommentId === commentId;
  const [localLikeStatus, setLikeStatus] = useState(null);
  const [localNumberOfLikes, setLocalNumberOfLikes] = useState(null);

  const api_url =
    import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";

  const useLikeStatus = localLikeStatus == null ? isLiked : localLikeStatus;
  const useLocalNumberOfLikes =
    localNumberOfLikes == null ? numberOfLikes : localNumberOfLikes;

  const [commentReplies, setCommentReplies] = useState([]);

  const insertAfter = (targetId, newReplies) => {
    setCommentReplies((prevReplies) => {
      const index = prevReplies.findIndex((reply) => reply._id === targetId);
      if (index === -1) return prevReplies;

      const updatedReplies = [
        ...prevReplies.slice(0, index + 1),
        ...newReplies,
        ...prevReplies.slice(index + 1),
      ];
      return updatedReplies;
    });
  };

  const fetchCommentReplies = async () => {
    try {
      const { data } = await axios.post(
        `${api_url}/api/comments/commentReplies`,
        { _commentId: commentId },
        { withCredentials: true }
      );
      setCommentReplies(data.replies);
      console.log(data);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  return (
    <div
      className="
        w-full sm:w-[90%] md:w-[700px] 
        mx-auto pt-5 pb-5 
        border-b border-b-neutral-200
      "
    >
      <div>
        {/* Author & Avatar */}
        <div className="flex items-center gap-x-2">
          <div
            className="
              rounded-full 
              w-10 h-10 sm:w-12 sm:h-12 
              flex items-center justify-center 
              text-lg sm:text-xl md:text-2xl 
              font-outfit text-white font-extralight
            "
            style={{ backgroundColor: "grey" }}
          >
            {commentAuthor &&
              commentAuthor.split(" ")[0].charAt(0).toUpperCase() +
                commentAuthor.split(" ")[1]?.charAt(0).toUpperCase()}
          </div>

          <div>
            <p className="text-textColor1 font-normal text-sm sm:text-base">
              {commentAuthor}
            </p>
            <p className="text-xs sm:text-sm text-textColor1 font-extralight">
              {readableDate(commentDate)}
            </p>
          </div>
        </div>

        {/* Comment Text */}
        <div>
          <p className="text-textColor1 font-extralight mt-2 text-sm sm:text-base md:text-lg">
            {commentText}
          </p>

          {/* Actions: Like, Comment, Reply */}
          <div className="flex flex-wrap gap-x-6 gap-y-2 mt-3 text-sm sm:text-base">
            <p className="flex items-center gap-x-1 text-textColor1">
              <span className="cursor-pointer font-outfit">
                {!useLikeStatus ? (
                  <BiLike
                    className="text-base sm:text-lg"
                    onClick={() => handleLikeAction("like")}
                  />
                ) : (
                  <BiSolidLike
                    className="text-base sm:text-lg"
                    onClick={() => handleLikeAction("unlike")}
                  />
                )}
              </span>
              {useLocalNumberOfLikes}
            </p>

            <p className="flex items-center gap-x-1 text-textColor1">
              <GoComment
                className="cursor-pointer text-base sm:text-lg"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCommentReplies();
                }}
              />
              0
            </p>

            <p
              className="text-sm sm:text-base text-textColor1 underline cursor-pointer"
              onClick={() => setOpenCommentId(isInputVisible ? null : commentId)}
            >
              Create reply
            </p>
          </div>
        </div>

        {/* Reply Input */}
        <div>
          <CommentInput
            visibility={isInputVisible}
            handleSubmit={handleReply}
            setCommentText={setReplyText}
            commentId={commentId}
            CommentAuthor={commentAuthor}
            updateListing={() => {
              insertAfter(commentId, [createdComment]);
            }}
            createdComment={createdComment}
            isReplyingToCommentReply={false}
          />
        </div>

        {/* Replies */}
        <div className="ml-3 sm:ml-5">
          {commentReplies.map((comment, index) => (
            <div className="ml-3 sm:ml-5" key={index}>
              <CommentReplyObject
                commentAuthor={comment.authorName}
                commentDate={comment.createdAt}
                commentText={comment.replyText}
                numberOfLikes={comment.numberOfLikes}
                isLiked={comment.likedByUser}
                commentRepliedtoAuthorName={
                  comment.commentRepliedtoAuthorName
                }
                isInputVisible={isInputVisible}
                handleReply={handleReply}
                setReplyText={setReplyText}
                setOpenCommentId={setOpenCommentId}
                commentId={comment._id}
                openCommentId={openCommentId}
                setCommentReplies={setCommentReplies}
                createdComment={createdComment}
                parentCommentId={commentId}
                toggleCommentLike={() =>
                  toggleCommentReplyLike(comment._id, commentId)
                }
                isReplyingToCommentReply={comment.isReplyingToCommentReply}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentObject;
