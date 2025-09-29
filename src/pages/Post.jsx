import React, { useEffect, useState, useMemo, useCallback } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactQuill, { Quill } from "react-quill";
import { useLocation, useParams } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import "../styles/fonts.css";
import { toast, ToastContainer } from "react-toastify";
import { PiDotsThreeBold } from "react-icons/pi";
import { GoComment } from "react-icons/go";
import { CiShare2, CiBookmark } from "react-icons/ci";
import { BiLike, BiSolidLike } from "react-icons/bi";
import CommentObject from "../components/CommentObject";
import { debounce } from "lodash";
import { trackEvent, trackPageView } from "../utils/gtag";

const Post = () => {
  const api_url =
    import.meta.env.VITE_ENVIRONMENT === "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";

  const { id } = useParams();
  const extraPostDetails = useLocation().state || {};

  const [blogPostContent, setBlogPostContent] = useState("");
  const [numberOfLikes, setNumberOfLikes] = useState(0);
  const [isLiked, setIsLiked] = useState(false);
  const [userId] = useState(localStorage.getItem("userData") || null);
  const [postComments, setPostComments] = useState([]);
  const [commentText, setCommentText] = useState("");
  const [commentReplyText, setCommentReplyText] = useState("");
  const [openCommentId, setOpenCommentId] = useState(null);
  const [createdCommentReply, setCreatedCommentReply] = useState(null);

  // Register Quill fonts once
  useEffect(() => {
    try {
      const Font = Quill.import("formats/font");
      Font.whitelist = [
        "inter",
        "poppins",
        "lato",
        "roboto",
        "robotoflex",
        "opensans",
        "outfit",
        "worksans",
        "dmsans",
        "raleway",
        "merriweather",
        "playfair",
        "lora",
        "crimson",
        "georgia",
        "helvetica",
        "arial",
        "lucida",
        "courier",
        "comicsans",
      ];
      Quill.register(Font, true);
    } catch (err) {
      console.debug("Quill font registration skipped:", err);
    }
  }, []);

  // Fetch post content and comments, with a small session cache for post content
  useEffect(() => {
    const postContentCache = sessionStorage.getItem(`postContent_${id}`);

    async function fetchPostContent() {
      try {
        const response = await axios.get(`${api_url}/api/posts/content/${id}`, { withCredentials: true });
        const now = Date.now();
        const cacheData = {
          content: response.data.content?.content || "",
          numberOfLikes: response.data.numberOfLikes || 0,
          liked: response.data.liked || false,
          timestamp: now,
        };
        sessionStorage.setItem(`postContent_${id}`, JSON.stringify(cacheData));

        setBlogPostContent(cacheData.content);
        setNumberOfLikes(cacheData.numberOfLikes);
        setIsLiked(cacheData.liked);
      } catch (error) {
        console.error("Error fetching post content:", error);
      }
    }

    async function fetchPostComments() {
      try {
        const response = await axios.get(`${api_url}/api/comments/${id}`, { withCredentials: true });
        setPostComments(response.data.comments || []);
      } catch (err) {
        console.error("Error fetching post comments:", err);
      }
    }

    if (postContentCache) {
      try {
        const parsedCache = JSON.parse(postContentCache);
        const now = Date.now();
        const cacheLifetime = 10 * 60 * 1000; // 10 minutes
        if (now - parsedCache.timestamp < cacheLifetime) {
          setBlogPostContent(parsedCache.content || "");
          setNumberOfLikes(parsedCache.numberOfLikes || 0);
          setIsLiked(parsedCache.liked || false);
        } else {
          sessionStorage.removeItem(`postContent_${id}`);
          fetchPostContent();
        }
      } catch (err) {
        console.error("Invalid post cache, refetching", err);
        fetchPostContent();
      }
    } else {
      fetchPostContent();
    }

    fetchPostComments();
  }, [id, api_url]);

  const debouncedToggleLike = useCallback(
    debounce(async () => {
      try {
        const uid = userId ? JSON.parse(userId).user.id : null;
        const response = await axios.post(
          `${api_url}/api/likes/toggle`,
          { userId: uid, postId: id },
          { headers: { "Content-Type": "application/json" } }
        );

        const now = Date.now();
        if (response.status === 201) {
          setIsLiked(true);
          setNumberOfLikes((n) => n + 1);
          sessionStorage.setItem(
            `postContent_${id}`,
            JSON.stringify({ content: blogPostContent, numberOfLikes: numberOfLikes + 1, liked: true, timestamp: now })
          );
        } else if (response.status === 200) {
          setIsLiked(false);
          setNumberOfLikes((n) => Math.max(0, n - 1));
          sessionStorage.setItem(
            `postContent_${id}`,
            JSON.stringify({ content: blogPostContent, numberOfLikes: Math.max(0, numberOfLikes - 1), liked: false, timestamp: now })
          );
        }
      } catch (err) {
        console.error("Error toggling like:", err);
      }
    }, 500),
    [userId, id, blogPostContent, numberOfLikes, api_url]
  );

  useEffect(() => {
    const title = extraPostDetails?.PostTitle || document.title;
    try {
      trackPageView({ post_title: title, post_id: id });
    } catch (err) {
      console.debug("trackPageView skipped:", err);
    }
  }, [id, extraPostDetails?.PostTitle, blogPostContent]);

  const handlePostLikeToggle = (type) => {
    if (type === "like") {
      setIsLiked(true);
      setNumberOfLikes((n) => n + 1);
      try {
        trackEvent("like_post", { action: "like", new_like_count: numberOfLikes + 1 });
      } catch (err) {
        console.debug("trackEvent skipped:", err);
      }
    } else if (type === "unlike") {
      setIsLiked(false);
      setNumberOfLikes((n) => Math.max(0, n - 1));
      try {
        trackEvent("like_post", { action: "unlike", new_like_count: Math.max(0, numberOfLikes - 1) });
      } catch (err) {
        console.debug("trackEvent skipped:", err);
      }
    }
    debouncedToggleLike();
  };

  const debouncedToggleCommentLike = useCallback(
    debounce(async (commentId) => {
      try {
        await axios.post(`${api_url}/api/comments/toggleLike`, { commentId, _postId: id }, { withCredentials: true });
      } catch (err) {
        console.error("Error liking comment:", err);
      }
    }, 1000),
    [id, api_url]
  );

  const debouncedToggleCommentReplyLike = useCallback(
    debounce(async (commentId, parentCommentId) => {
      try {
        await axios.post(`${api_url}/api/comments/toggleCommentReplyLike`, { commentId, parentCommentId }, { withCredentials: true });
      } catch (err) {
        console.error("Error liking comment reply:", err);
      }
    }, 1000),
    [id, api_url]
  );

  const debouncedPostComment = useMemo(
    () =>
      debounce(async (data) => {
        try {
          const response = await axios.post(`${api_url}/api/comments/create`, data, { withCredentials: true });
          console.log(response.data);
        } catch (err) {
          console.error("Error posting comment:", err);
        }
      }, 1000),
    [api_url]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    const data = { _userId: user.user?.id, _postId: id, _commentText: commentText, _authorName: user.user?.name };
    debouncedPostComment(data);
    try {
      trackEvent("submit_comment", { comment_length: commentText?.length || 0 });
    } catch (err) {
      console.debug("trackEvent skipped:", err);
    }
  };

  const createCommentReply = async (event, commentId, isReplyingToReply, commentRepliedToAuthor) => {
    event.preventDefault();
    const user = JSON.parse(localStorage.getItem("userData")) || {};
    const data = { _replyText: commentReplyText, _commentId: commentId, _authorName: user.user?.name, _isReplyingToReply: isReplyingToReply, _replyId: null, _commentRepliedToAuthor: commentRepliedToAuthor };

    try {
      const response = await toast.promise(axios.post(`${api_url}/api/comments/commentReplies/create`, data, { withCredentials: true }), { pending: "Publishing reply...", success: "Comment Reply published successfully!", error: "Failed to publish comment 😓" });
      setOpenCommentId(null);
      setCreatedCommentReply(response.data.reply);
      try {
        trackEvent("submit_reply", { parent_comment_id: commentId, reply_length: data._replyText?.length || 0 });
      } catch (err) {
        console.debug("trackEvent skipped:", err);
      }
    } catch (err) {
      console.error("Error creating comment reply:", err);
    }
  };

  return (
    <>
      <div className="h-full">
        <Header />
        <ToastContainer position="top-right" autoClose={3000} />

        {/* Hero Section */}
        <div className="w-full h-[360px] relative flex items-center" style={{ backgroundImage: `url(${extraPostDetails.PostImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
          <div className="absolute w-full h-full bg-black opacity-70 z-10"></div>
          <div className="w-full md:max-w-2xl lg:w-[700px] h-[80%] mx-auto flex items-end z-30 relative px-4 sm:px-6">
            <div>
              <p className="text-neutral-300 text-base sm:text-lg font-normal">BLOG</p>
              <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-outfit">{extraPostDetails.PostTitle}</h1>
            </div>
          </div>
        </div>

        {/* Author Info & Actions */}
        <div className="flex w-full md:max-w-2xl lg:w-[700px] mx-auto items-center mt-10 sm:mt-16 mb-3 pb-5 justify-between px-4 sm:px-6">
          <div className="flex gap-x-3">
            <div className="rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl font-outfit text-white font-extralight" style={{ backgroundColor: sessionStorage.getItem("userAvatarColor") }}>
              {extraPostDetails && extraPostDetails.Author?.split(" ")[0]?.charAt(0).toUpperCase() + (extraPostDetails.Author?.split(" ")[1]?.charAt(0).toUpperCase() || "")}
            </div>
            <div>
              <p className="text-textColor1 font-extralight text-sm sm:text-base">published by: <span className="font-semibold">{extraPostDetails.Author}</span></p>
              <p className="text-textColor1 font-extralight text-xs">{extraPostDetails.DateCreated ? new Date(extraPostDetails.DateCreated).toLocaleDateString() : ""} - <span className="font-semibold">{extraPostDetails.PostLenght} read</span></p>
            </div>
          </div>

          <div className="pl-2 pr-5 flex font-light space-x-3 w-[700px] mx-auto items-center mt-3 mb-10 border-b-[1px] border-b-nuetral-200 pb-3 justify-between text-textColor1 font-outfit">
            <div className="flex gap-x-6">
              <p className="flex items-center gap-x-1 text-sm">
                <span className=" cursor-pointer ">{!isLiked ? <BiLike className="text-base" onClick={() => handlePostLikeToggle("like")} /> : <BiSolidLike className="text-base" onClick={() => handlePostLikeToggle("unlike")} />}</span>{" "}
                {numberOfLikes} Like{numberOfLikes !== 1 ? "s" : ""}
              </p>
              <p className="flex items-center gap-x-1 text-sm"><GoComment /> 0 Comments</p>
            </div>

            <div className="flex gap-x-4 items-center">
              <CiShare2 />
              <CiBookmark />
              <PiDotsThreeBold className="text-2xl" />
            </div>
          </div>

          <ReactQuill theme="snow" value={blogPostContent} className="h-fit w-full md:max-w-2xl lg:w-[730px] mx-auto mb-12 text-textColor1 read-post px-4 sm:px-6" modules={{ toolbar: false }} readOnly={true} />

          <div className="flex font-light w-full md:max-w-2xl lg:w-[700px] mx-auto items-center mt-3 mb-8 border-b border-neutral-200 pb-3 justify-between text-textColor1 font-outfit px-4 sm:px-6">
            <div className="flex gap-x-4 sm:gap-x-6">
              <p className="flex items-center gap-x-1 text-sm">
                <span className="cursor-pointer">{!isLiked ? <BiLike className="text-base" onClick={() => handlePostLikeToggle("like")} /> : <BiSolidLike className="text-base" onClick={() => handlePostLikeToggle("unlike")} />}</span>
                {numberOfLikes} Like{numberOfLikes !== 1 ? "s" : ""}
              </p>
              <p className="flex items-center gap-x-1 text-sm"><GoComment /> 0 Comments</p>
            </div>

            <div className="flex gap-x-3 sm:gap-x-4 items-center">
              <CiShare2 />
              <CiBookmark />
              <PiDotsThreeBold className="text-xl sm:text-2xl" />
            </div>
          </div>

          {/* Comments Section */}
          <div className="w-full md:max-w-2xl lg:w-[700px] mx-auto mt-16 px-4 sm:px-6">
            <h1 className="w-full text-2xl sm:text-3xl md:text-4xl text-textColor1">Comments</h1>
          </div>

          <div className="w-full md:max-w-2xl lg:w-[700px] mx-auto mt-6 px-4 sm:px-6">
            <div className="flex items-center gap-x-2">
              <div className="rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl font-outfit text-white font-extralight" style={{ backgroundColor: sessionStorage.getItem("userAvatarColor") }}>
                {extraPostDetails && extraPostDetails.Author?.split(" ")[0]?.charAt(0).toUpperCase() + (extraPostDetails.Author?.split(" ")[1]?.charAt(0).toUpperCase() || "")}
              </div>
              <p className="text-textColor1 font-extralight text-sm sm:text-base">{extraPostDetails.Author}</p>
            </div>

            <div className="mt-3 mb-16">
              <form onSubmit={handleSubmit}>
                <textarea name="comment" id="comment" className="w-full thin-border outline-none rounded-lg placeholder:font-extralight p-2 placeholder:text-sm sm:placeholder:text-base placeholder:text-textColor1" placeholder="What are your thoughts?" onChange={(e) => setCommentText(e.target.value)}></textarea>
                <button type="submit" className="bg-customTeal text-white font-extralight px-4 py-1 rounded-full text-xs sm:text-sm mt-2">Upload</button>
                <button type="button" className="font-outfit font-extralight ml-2 text-xs sm:text-sm">Cancel</button>
              </form>
            </div>
          </div>

          {/* Render Comments */}
          {postComments && postComments.map((comment) => (
            <CommentObject
              commentAuthor={comment.authorName}
              commentText={comment.commentText}
              commentDate={comment.createdAt}
              numberOfLikes={comment.numberOfLikes}
              isLiked={comment.likedByUser}
              key={comment._id}
              toggleCommentLike={() => debouncedToggleCommentLike(comment._id)}
              commentId={comment._id}
              changeCommentLikeState={setIsLiked}
              openCommentId={openCommentId}
              setOpenCommentId={setOpenCommentId}
              setReplyText={setCommentReplyText}
              handleReply={createCommentReply}
              createdComment={createdCommentReply}
              toggleCommentReplyLike={debouncedToggleCommentReplyLike}
            />
          ))}

          <Footer />
        </div>
      </div>
    </>
  );
};

export default Post;
