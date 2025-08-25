import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import blog_image_featured from "../assets/blog-image-featured.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import ReactQuill, { Quill } from "react-quill";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
import axios from "axios";
import "../styles/global.css";
import "../styles/fonts.css";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import AvatarColors from "../data/AvatarColors";
import { useMemo } from "react";
import { PiDotsThreeBold } from "react-icons/pi";
import { SlLike } from "react-icons/sl";
import { GoComment } from "react-icons/go";
import { CiShare2 } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";
import { useMyContext } from "../context/MyContext";
import { number } from "prop-types";
import { BiLike } from "react-icons/bi";
import { BiSolidLike } from "react-icons/bi";
import CommentObject from "../components/CommentObject";
import { debounce } from "lodash";
import { useCallback } from "react";

const Post = () => {
  const [blogPostContent, setBlogPostContent] = useState("");
  const api_url =
    import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";
  // const api_url = "http://localhost:3000";
  const { id } = useParams(); // Get the post ID from the URL

  const extraPostDetails = useLocation().state || {}; // Get extra post details from location
  const [numberOfLikes, setNumberOfLikes] = useState(null);
  const [isLiked, setIsLiked] = useState(false);

  const [userId] = useState(localStorage.getItem("userData") || null);

  const [postComments, setPostComments] = useState([]);

  const [commentText, setCommentText] = useState("");

  const [commentReplyText, setCommentReplyText] = useState("");

  const [openCommentId, setOpenCommentId] = useState(null);

  const [createdCommentReply, setCreatedCommentReply] = useState([]);

  useEffect(() => {
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
  }, []);

  useEffect(() => {
    const postContentCache = sessionStorage.getItem(`postContent_${id}`);

    if (postContentCache) {
      const cacheLifetime = 10 * 60 * 1000; // 10 minutes in milliseconds
      const parsedCache = JSON.parse(postContentCache);
      const now = new Date();

      if (now - parsedCache.timestamp < cacheLifetime) {
        setBlogPostContent(parsedCache.content);
        setNumberOfLikes(parsedCache.numberOfLikes);
        setIsLiked(parsedCache.liked);
        console.log("Post content fetched from cache:", parsedCache);
      } else {
        // Cache expired
        sessionStorage.removeItem(`postContent_${id}`);
        fetchPostContent();
      }
    } else {
      fetchPostContent();
    }

    async function fetchPostContent() {
      try {
        const response = await axios.get(`${api_url}/api/posts/content/${id}`, {
          withCredentials: true,
        });

        const now = new Date();

        const cacheData = {
          content: response.data.content.content,
          numberOfLikes: response.data.numberOfLikes,
          liked: response.data.liked,
          timestamp: now.getTime(),
        };

        sessionStorage.setItem(`postContent_${id}`, JSON.stringify(cacheData));

        setBlogPostContent(response.data.content.content);
        setNumberOfLikes(response.data.numberOfLikes);
        setIsLiked(response.data.liked);
        console.log("Post content fetched successfully:", response.data);
      } catch (error) {
        console.error("Error fetching post content:", error);
      }
    }

    fetchPostComments(); // Fetch comments when the component mounts
  }, []);

  const deletePost = async () => {
    await toast.promise(
      axios.delete(`${api_url}/api/posts/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      }),
      {
        pending: "Deleting post...",
        success: "Post deleted successfully!",
        error: "Failed to delete post 😓",
      }
    );
  };

  const debouncedToggleLike = useCallback(
    debounce(async () => {
      try {
        console.log(JSON.parse(userId).user.id);
        const response = await axios.post(
          `${api_url}/api/likes/toggle`,
          {
            userId: JSON.parse(userId).user.id,
            postId: id,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const now = new Date();

        if (response.status === 201) {
          setIsLiked(true);

          sessionStorage.setItem(
            `postContent_${id}`,
            JSON.stringify({
              content: blogPostContent,
              numberOfLikes: numberOfLikes + 1,
              liked: true,
              timestamp: now.getTime(),
            })
          );
        } else if (response.status === 200) {
          setIsLiked(false);
          sessionStorage.setItem(
            `postContent_${id}`,
            JSON.stringify({
              content: blogPostContent,
              numberOfLikes: numberOfLikes - 1,
              liked: false,
              timestamp: now.getTime(),
            })
          );
        }
      } catch (error) {
        console.error("Error liking post:", error);
      }
    }, 500), // 500ms debounce delay
    [userId, id, blogPostContent, numberOfLikes, api_url] // Add any dependencies here
  );

  const date = new Date(extraPostDetails.DateCreated);
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const handlePostLikeToggle = (type) => {
    if (type === "like") {
      setIsLiked(true);
      setNumberOfLikes(numberOfLikes + 1);
    } else if (type === "unlike") {
      setIsLiked(false);
      setNumberOfLikes(numberOfLikes - 1);
    }
    debouncedToggleLike(); // Call the debounced version
  };

  const fetchPostComments = async () => {
    try {
      const response = await axios.get(`${api_url}/api/comments/${id}`, {
        withCredentials: true,
      });

      setPostComments(response.data.comments);

      console.log(response.data.comments);
    } catch (error) {
      console.error("Error fetching post comments:", error);
    }
  };

  const debouncedToggleCommentLike = useCallback(
    debounce(async (commentId) => {
      try {
        const response = await axios.post(
          `${api_url}/api/comments/toggleLike`,
          {
            commentId: commentId,
            _postId: id,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 201 || response.status === 200) {
          console.log("Comment like toggled successfully!");
        }
      } catch (error) {
        console.error("Error liking comment:", error);
      }
    }, 1000),
    [id] // dependency needed if `id` is from props or state
  );

  const debouncedToggleCommentReplyLike = useCallback(
    debounce(async (commentId, parentCommentId) => {
      try {
        const response = await axios.post(
          `${api_url}/api/comments/toggleCommentReplyLike`,
          {
            commentId: commentId,
            parentCommentId: parentCommentId,
          },
          {
            withCredentials: true,
          }
        );

        if (response.status === 201 || response.status === 200) {
          console.log("Comment reply like toggled successfully!");
        }
      } catch (error) {
        console.error("Error liking comment reply:", error);
      }
    }, 1000),
    [id] // dependency needed if `id` is from props or state
  );

  const debouncedPostComment = useMemo(
    () =>
      debounce(async (data) => {
        try {
          const response = await axios.post(
            `${api_url}/api/comments/create`,
            data,
            {
              withCredentials: true,
            }
          );
          console.log(response.data);
        } catch (error) {
          console.error("Error posting comment:", error.message);
        }
      }, 1000),
    []
  );

  const handleSubmit = (e) => {
    e.preventDefault(); // prevent default immediately
    const data = {
      _userId: JSON.parse(localStorage.getItem("userData")).user.id,
      _postId: id,
      _commentText: commentText,
      _authorName: JSON.parse(localStorage.getItem("userData")).user.name,
    };
    debouncedPostComment(data); // pass the data to the debounced function
  };

  const createCommentReply = async (
    event,
    commentId,
    isReplyingToReply,
    commentRepliedToAuthor
  ) => {
    event.preventDefault();

    const data = {
      _replyText: commentReplyText,
      _commentId: commentId,
      _authorName: JSON.parse(localStorage.getItem("userData")).user.name,
      _isReplyingToReply: isReplyingToReply,
      _replyId: null,
      _commentRepliedToAuthor: commentRepliedToAuthor,
    };

    await toast
      .promise(
        axios.post(`${api_url}/api/comments/commentReplies/create`, data, {
          withCredentials: true,
        }),
        {
          pending: "Publishing reply...",
          success: "Comment Reply published successfully!",
          error: "Failed to publish comment 😓",
        }
      )

      .then((response) => {
        console.log(response);
        setOpenCommentId(null);
        setCreatedCommentReply(response.data.reply);
        console.log(response.data.reply);
      });
  };

  return (
   <>
  <div className="h-full">
    <Header />
    <ToastContainer position="top-right" autoClose={3000} />

    {/* Hero Section */}
    <div
      className="w-full h-[360px] relative flex items-center"
      style={{
        backgroundImage: `url(${extraPostDetails.PostImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute w-full h-full bg-black opacity-70 z-10"></div>

      <div className="w-full md:max-w-2xl lg:w-[700px] h-[80%] mx-auto flex items-end z-30 relative px-4 sm:px-6">
        <div>
          <p className="text-neutral-300 text-base sm:text-lg font-normal">BLOG</p>
          <h1 className="text-white text-2xl sm:text-3xl md:text-4xl font-bold font-outfit">
            {extraPostDetails.PostTitle}
          </h1>
        </div>
      </div>
    </div>

    {/* Author Info */}
    <div className="flex w-full md:max-w-2xl lg:w-[700px] mx-auto items-center mt-10 sm:mt-16 mb-3 pb-5 justify-between px-4 sm:px-6">
      <div className="flex gap-x-3">
        <div
          className="rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl font-outfit text-white font-extralight"
          style={{
            backgroundColor: sessionStorage.getItem("userAvatarColor"),
          }}
        >
          {extraPostDetails &&
            extraPostDetails.Author.split(" ")[0].charAt(0).toUpperCase() +
              extraPostDetails.Author.split(" ")[1].charAt(0).toUpperCase()}
        </div>
        <div>
          <p className="text-textColor1 font-extralight text-sm sm:text-base">
            published by:{" "}
            <span className="font-semibold">{extraPostDetails.Author}</span>
          </p>
          <p className="text-textColor1 font-extralight text-xs">
            {readableDate} -{" "}
            <span className="font-semibold">
              {extraPostDetails.PostLenght} read
            </span>
          </p>
        </div>
      </div>
    </div>

    {/* Likes, Comments, Share */}
    <div className="flex font-light w-full md:max-w-2xl lg:w-[700px] mx-auto items-center mt-3 mb-8 border-b border-neutral-200 pb-3 justify-between text-textColor1 font-outfit px-4 sm:px-6">
      <div className="flex gap-x-4 sm:gap-x-6">
        <p className="flex items-center gap-x-1 text-sm">
          <span className="cursor-pointer">
            {!isLiked ? (
              <BiLike
                className="text-base"
                onClick={() => handlePostLikeToggle("like")}
              />
            ) : (
              <BiSolidLike
                className="text-base"
                onClick={() => handlePostLikeToggle("unlike")}
              />
            )}
          </span>
          {numberOfLikes} Like
          {numberOfLikes > 1 ? "s" : numberOfLikes === 0 ? "s" : ""}
        </p>
        <p className="flex items-center gap-x-1 text-sm">
          <GoComment /> 0 Comments
        </p>
      </div>

      <div className="flex gap-x-3 sm:gap-x-4 items-center">
        <CiShare2 />
        <CiBookmark />
        <PiDotsThreeBold className="text-xl sm:text-2xl" />
      </div>
    </div>

    {/* Blog Content */}
    <ReactQuill
      theme="snow"
      value={blogPostContent}
      className="h-fit w-full md:max-w-2xl lg:w-[730px] mx-auto mb-12 text-textColor1 read-post px-4 sm:px-6"
      modules={{ toolbar: false }}
      readOnly={true}
    />

    {/* Comments Section */}
    <div className="w-full md:max-w-2xl lg:w-[700px] mx-auto mt-16 px-4 sm:px-6">
      <h1 className="w-full text-2xl sm:text-3xl md:text-4xl text-textColor1">
        Comments
      </h1>
    </div>

    <div className="w-full md:max-w-2xl lg:w-[700px] mx-auto mt-6 px-4 sm:px-6">
      <div className="flex items-center gap-x-2">
        <div
          className="rounded-full w-10 h-10 flex items-center justify-center text-lg sm:text-xl font-outfit text-white font-extralight"
          style={{
            backgroundColor: sessionStorage.getItem("userAvatarColor"),
          }}
        >
          {extraPostDetails &&
            extraPostDetails.Author.split(" ")[0].charAt(0).toUpperCase() +
              extraPostDetails.Author.split(" ")[1].charAt(0).toUpperCase()}
        </div>
        <p className="text-textColor1 font-extralight text-sm sm:text-base">
          {extraPostDetails.Author}
        </p>
      </div>

      <div className="mt-3 mb-16">
        <form onSubmit={handleSubmit}>
          <textarea
            name="comment"
            id="comment"
            className="w-full thin-border outline-none rounded-lg placeholder:font-extralight p-2 placeholder:text-sm sm:placeholder:text-base placeholder:text-textColor1"
            placeholder="What are your thoughts?"
            onChange={(e) => setCommentText(e.target.value)}
          ></textarea>
          <button
            type="submit"
            className="bg-customTeal text-white font-extralight px-4 py-1 rounded-full text-xs sm:text-sm mt-2"
          >
            Upload
          </button>
          <button
            type="button"
            className="font-outfit font-extralight ml-2 text-xs sm:text-sm"
          >
            Cancel
          </button>
        </form>
      </div>
    </div>

    {/* Render Comments */}
    {postComments &&
      postComments.map((comment) => (
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
</>

  );
};

export default Post;
