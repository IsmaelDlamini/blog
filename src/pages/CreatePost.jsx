import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Footer from "../components/Footer";
import { useMyContext } from "../context/MyContext";
import "../styles/global.css";
import { IoImagesOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import axios from "axios";
import { Quill } from "react-quill";
import { calculateReadTime } from "../../utils/calculateReadTime";
import Fonts from "../data/Fonts";
import { Link } from "react-router-dom";

const CreatePost = () => {
  const { userDataGlobalValue } = useMyContext();

  const [blogPost, setBlogPost] = useState(() => {
    const saved = sessionStorage.getItem("blogPostData");
    return saved
      ? JSON.parse(saved)
      : {
          PostTitle: "",
          PostDescription: "",
          PostImage: "",
          PostContentText: "",
          PostType: "Blog",
          PostLenght: "",
          featured: false,
          PostAuthor: userDataGlobalValue.name || "",
          PostAuthorId: userDataGlobalValue._id || "",
        };
  });

  useEffect(() => {
    sessionStorage.setItem("blogPostData", JSON.stringify(blogPost));
  }, [blogPost]);

  const publishPost = async () => {
    const api_url = "http://localhost:3000";

    const readTime = calculateReadTime(blogPost.PostContentText);

    const data = {
      ...blogPost,
      PostLenght: readTime,
      PostAuthor: userDataGlobalValue.name,
      PostAuthorId: userDataGlobalValue._id,
    };

    try {
      const response = await axios.post(`${api_url}/api/posts/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log("Post published successfully:", response.data);
    } catch (error) {
      console.error("Error publishing post:", error);
    }
  };
  useEffect(() => {
    const Font = Quill.import("formats/font");
    Font.whitelist = Fonts;
    Quill.register(Font, true);
  }, []);

  const toolbarOptions = [
    [
      {
        font: Fonts,
      },
    ], // Font options
    [{ size: ["small", false, "large", "huge"] }], // Font sizes
    ["bold", "italic", "underline", "strike"], // Text styling
    [{ color: [] }, { background: [] }], // Text and background colors
    [{ script: "sub" }, { script: "super" }], // Subscript/superscript
    [{ header: 1 }, { header: 2 }, { header: [3, 4, 5, 6, false] }], // Headers
    [{ list: "ordered" }, { list: "bullet" }], // Lists
    [{ indent: "-1" }, { indent: "+1" }], // Indents
    [{ direction: "rtl" }], // Text direction
    ["link", "image", "video"], // Media embeds
    ["blockquote", "code-block"], // Blockquote/code blocks
    [{ align: [] }], // Text alignment
    ["clean"], // Clear formatting
  ];

  const modules = {
    toolbar: toolbarOptions,
  };

  return (
    <div className="min-h-screen">
      <Header />

      <div className="w-full bg-zinc-50 h-[150px] flex items-center justify-center border-b-2 border-zinc-100">
        <h1 className="w-fit mx-auto mb-4 text-4xl font-bold font-poppins text-neutral-600 flex flex-col justify-center items-center">
          <span className="flex">
            {" "}
            Create<span className="text-customTeal ml-2">Post</span>{" "}
          </span>
          <span className="font-light text-base mt-2">
            Create and share your insights on tech. Publish expert tips, trends,
            or experiences today!
          </span>
        </h1>
      </div>

      <div className="w-[1000px] mx-auto mt-14 mb-24">
        <form action="">
          <label className="font-[roboto flex] text-textColor1 mb-3 flex items-center gap-x-2">
            <TfiWrite />
            Enter post title:{" "}
          </label>

          <input
            type="text"
            placeholder="Enter post title here..."
            className="w-full border-[1px] mb-5 mt-3 p-2 outline-none font-extralight border-zinc-400"
            value={blogPost.PostTitle}
            onChange={(e) =>
              setBlogPost({ ...blogPost, PostTitle: e.target.value })
            }
          />

          <label className="font-[roboto flex] text-textColor1 flex items-center gap-x-2 ">
            <TfiWrite /> Enter Post description:{" "}
          </label>

          <textarea
            name="description"
            id="description"
            className="w-full h-[200px] border-[1px] mb-5 mt-3 p-2 outline-none font-extralight border-zinc-400"
            placeholder="Enter post description here..."
            value={blogPost.PostDescription}
            onChange={(e) =>
              setBlogPost({ ...blogPost, PostDescription: e.target.value })
            }
          ></textarea>

          <label className="font-[roboto flex] text-textColor1 flex items-center gap-x-2 ">
            <IoImagesOutline /> Enter Post thumbnail image link (from pexels):{" "}
          </label>

          <input
            type="text"
            placeholder="Enter image link here..."
            className="w-full border-[1px] mb-5 mt-3 p-2 outline-none font-extralight border-zinc-400"
            value={blogPost.PostImage}
            onChange={(e) =>
              setBlogPost({ ...blogPost, PostImage: e.target.value })
            }
          />
        </form>

        <p className="font-[roboto flex] text-textColor1 mb-3 flex items-center gap-x-2">
          <TfiWrite />
          Enter post content:
        </p>
        <ReactQuill
          theme="snow"
          value={blogPost.PostContentText}
          onChange={(value) =>
            setBlogPost({ ...blogPost, PostContentText: value })
          }
          className="min-h-96 text-[#252525] "
          modules={modules}
        />
      </div>

      <div className="w-[1000px] mx-auto flex justify-center gap-x-5">
        <Link to="/create/preview">
          <button className="px-5 py-2 border-customTeal border-2 text-customTeal bg-white text-customTeam font-outfit font-light rounded-sm cursor-pointer">
            Preview
          </button>
        </Link>

        <button
          className="px-5 py-2 bg-customTeal text-white font-outfit font-light rounded-sm cursor-pointer"
          onClick={publishPost}
        >
          Publish
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePost;
