import React from "react";

const CommentInput = ({
  handleSubmit,
  setCommentText,
  visibility,
  commentId,
  CommentAuthor,
  updateListing,
  createdComment,
  isReplyingToCommentReply,
}) => {
  return (
    <div
      className="mt-2 mb-2"
      style={{ display: visibility ? "block" : "none" }}
    >
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(
            e,
            commentId,
            isReplyingToCommentReply,
            CommentAuthor
          );
          if (createdComment) updateListing();
        }}
      >
        <textarea
          name="comment"
          id="comment"
          className="
            w-full 
            thin-border 
            outline-none 
            rounded-lg 
            placeholder:font-extralight 
            p-2 
            placeholder:text-base 
            placeholder:text-textColor1
            text-sm sm:text-base md:text-lg   /* font size changes */
            h-24 sm:h-28 md:h-32              /* height adjusts per screen */
          "
          placeholder="What are your thoughts?"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>

        <div className="flex flex-wrap items-center mt-2 gap-2">
          <button
            type="submit"
            className="
              bg-customTeal 
              text-white 
              font-extralight 
              px-3 py-1 
              rounded-full 
              text-xs sm:text-sm md:text-base   /* button font responsive */
              sm:px-4 sm:py-1.5 md:px-5 md:py-2 /* padding grows on larger screens */
              transition-all duration-300
            "
          >
            Upload
          </button>

          <button
            type="button"
            className="
              font-outfit 
              font-extralight 
              text-xs sm:text-sm md:text-base 
              ml-0 sm:ml-2 
              text-gray-600 
              hover:text-customTeal 
              transition-colors duration-300
            "
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default CommentInput;
