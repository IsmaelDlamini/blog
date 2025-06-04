import React, { useState } from "react";
import { GoComment } from "react-icons/go";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import { readableDate } from "../../utils/readableDate";
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
  setOpenCommentId, // passed from parent
  handleReply,
  setReplyText,
  createdComment,
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

  const [commentInputVisibilityState, setCommentInputVisibilityState] =
    useState(false);

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

  const [commentReplies, setCommentReplies] = useState([]);


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


  const fetchCommentReplies = async () => {

    try {
      const { data } = await axios.post(
        `${api_url}/api/comments/commentReplies`,
        {
          _commentId: commentId,
        }
      );
      setCommentReplies(data.replies);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
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
              <GoComment
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault();
                  fetchCommentReplies();
                }}
              />{" "}
              0
            </p>

            <p
              className="text-sm text-textColor1 underline cursor-pointer"
              onClick={() =>
                setOpenCommentId(isInputVisible ? null : commentId)
              }
            >
              create reply
            </p>
          </div>
        </div>

        <div className="">
          <CommentInput
            visibility={isInputVisible}
            handleSubmit={handleReply}
            setCommentText={setReplyText}
            commentId={commentId}
            CommentAuthor={commentAuthor}
             updateListing={() => {insertAfter(commentId, [createdComment])}}
             createdComment={createdComment}
             isReplyingToCommentReply={false}
          />
        </div>

        <div className="ml-5">
          {commentReplies.map((comment, index) => {
            return (
              <div className="ml-5" key={index}>
                <CommentReplyObject
                  commentAuthor={comment.authorName}
                  commentDate={comment.createdAt}
                  commentText={comment.replyText}
                  numberOfLikes={comment.numberOfLikes}
                  isLiked={comment.isLiked}
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

                  isReplyingToCommentReply={comment.isReplyingToCommentReply}
                 
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CommentObject;
