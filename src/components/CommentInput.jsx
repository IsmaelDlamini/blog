import React from "react";

const CommentInput = ({handleSubmit, setCommentText, visibility, commentId, CommentAuthor, updateListing, createdComment, isReplyingToCommentReply}) => {

  return (
    <div className="mt-2 mb-2" style={{display: visibility ? "block" : "none"}}>
      <form onSubmit={async(e) => {
        e.preventDefault();
        await handleSubmit(e, commentId, isReplyingToCommentReply , CommentAuthor,)
        if(createdComment) updateListing();
        }}>
          
        <textarea
          name="comment"
          id="comment"
          className="w-full thin-border outline-none rounded-lg placeholder:font-extralight p-2 placeholder:text-base placeholder:text-textColor1"
          placeholder="what are your thoughts?"
          onChange={(e) => setCommentText(e.target.value)}
        ></textarea>
        <button
          type="submit "
          className=" bg-customTeal text-white font-extralight px-4 py-1 rounded-full text-xs mt-2"
        >
          Upload
        </button>
        <button type="" className="font-outfit font-extralight ml-2 text-sm">
          Cancel
        </button>
      </form>
    </div>
  );
};

export default CommentInput;
