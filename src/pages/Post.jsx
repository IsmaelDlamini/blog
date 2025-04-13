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

const Post = () => {
  const [blogPostContent, setBlogPostContent] = useState();
  const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { id } = useParams(); // Get the post ID from the URL

  const extraPostDetails = useLocation().state || {}; // Get extra post details from location

  const { userDataGlobalValue } = useMyContext();

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
    async function fetchPostContent() {
      try {
        const response = await axios.get(`${api_url}/api/posts/content/${id}`);

        setBlogPostContent(response.data.content); // Set the post content
      } catch (error) {
        console.error("Error publishing post:", error);
      }
    }

    fetchPostContent();
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

  const date = new Date(extraPostDetails.DateCreated);
  const readableDate = date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <>
      <div className="  h-full">
        <Header />

        <ToastContainer position="top-right" autoClose={3000} />

        <div className="flex space-x-3 w-[700px] mx-auto items-center mt-20 mb-1 pb-5 justify-between">
          <div className="flex gap-x-3">
            <div
              className="rounded-full w-10 h-10 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex] font-extralight"
              style={{
                backgroundColor: sessionStorage.getItem("userAvatarColor"),
              }}
            >
              {extraPostDetails &&
                extraPostDetails.Author.split(" ")[0].charAt(0).toUpperCase() +
                  extraPostDetails.Author.split(" ")[1].charAt(0).toUpperCase()}
            </div>{" "}
            <div>
              <p className=" text-textColor1 font-extralight pr-3">
                published by:{" "}
                <span className="font-semibold">
                  {extraPostDetails && extraPostDetails.Author}
                </span>
              </p>

              <p className=" text-textColor1 font-extralight text-xs">
                {readableDate} -{" "}
                <span className="font-semibold">
                  {extraPostDetails.PostLenght} read
                </span>
              </p>
            </div>
          </div>

          <div className="pr-14 w-fit"></div>
        </div>

        <div className=" pl-2 pr-5 flex font-light space-x-3 w-[700px] mx-auto items-center mt-3 mb-10 border-b-[1px] border-b-nuetral-200 pb-3 justify-between  text-textColor1 font-outfit">
          <div className="flex gap-x-6">
            <p className="flex items-center gap-x-1 text-sm">
              <SlLike /> 0 Likes
            </p>{" "}
            <p className="flex items-center gap-x-1 text-sm">
              <GoComment /> 0 Comments
            </p>
          </div>

          <div className="flex gap-x-4 items-center">
            <CiShare2 />
            <CiBookmark />
            <PiDotsThreeBold className="text-2xl" />
          </div>
        </div>

        <h1 className="w-[700px] mx-auto text-5xl mb-10 text-textColor1">
          {extraPostDetails.PostTitle}
        </h1>

        <ReactQuill
          theme="snow"
          value={blogPostContent}
          className="h-fit w-[730px] mx-auto  mb-12 text-textColor1 read-post"
          modules={{ toolbar: false }}
          readOnly={true} // Set to true to make it read-only
        />

        <div className=" pl-2 pr-5 flex font-light space-x-3 w-[700px] mx-auto items-center mt-3 mb-10 border-b-[1px] border-b-nuetral-200 pb-3 justify-between  text-textColor1 font-outfit">
          <div className="flex gap-x-6">
            <p className="flex items-center gap-x-1 text-sm">
              <SlLike /> 0 Likes
            </p>
            <p className="flex items-center gap-x-1 text-sm">
              <GoComment /> 0 Comments
            </p>
          </div>

          <div className="flex gap-x-4 items-center">
            <CiShare2 />

            <CiBookmark />

            <PiDotsThreeBold className="text-2xl" />
          </div>
        </div>

        <div className="w-[700px] mx-auto mt-20 ">
          <h1 className="w-full text-4xl text-textColor1 ">Comments</h1>
        </div>

        <div className="w-[700px] mx-auto  mt-10 ">
          <div className="flex items-center gap-x-2 ">
            <div
              className="rounded-full w-10 h-10 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex] font-extralight"
              style={{
                backgroundColor: sessionStorage.getItem("userAvatarColor"),
              }}
            >
              {extraPostDetails &&
                extraPostDetails.Author.split(" ")[0].charAt(0).toUpperCase() +
                  extraPostDetails.Author.split(" ")[1].charAt(0).toUpperCase()}
            </div>

            <p className=" text-textColor1 font-extralight pr-3">
              {extraPostDetails && extraPostDetails.Author}
            </p>
          </div>

          <div className="mt-2 ">
            <form onSubmit="">
              <textarea
                name="comment"
                id="comment"
                className="w-full thin-border outline-none rounded-lg placeholder:font-extralight p-2 placeholder:text-base placeholder:text-textColor1"
                placeholder="what are your thoughts?"
              ></textarea>
              <button
                type="submit "
                className=" bg-customTeal text-white font-extralight px-4 py-1 rounded-full text-xs mt-2"
              >
                Upload
              </button>
              <button
                type=""
                className="font-outfit font-extralight ml-2 text-sm"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>

        {/* <div className="w-[900px] mx-auto flex justify-center gap-x-2">
          <Link to="/">
            <button className="bg-customTeal px-4 py-2 text-white font-[robot flex] font-thin">
              Return to Home page
            </button>
          </Link>

          <button
            className="bg-red-600 px-4 py-2 text-white font-[robot flex] font-thin"
            onClick={deletePost}
          >
            Delete post
          </button>
        </div> */}

        <Footer />
      </div>
    </>
  );
};

export default Post;
