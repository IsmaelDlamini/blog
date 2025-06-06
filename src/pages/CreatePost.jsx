import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Footer from "../components/Footer";
import { useMyContext } from "../context/MyContext";
import "../styles/fonts.css";
import { IoImagesOutline } from "react-icons/io5";
import { TfiWrite } from "react-icons/tfi";
import axios from "axios";
import { Quill } from "react-quill";
import { calculateReadTime } from "../../utils/calculateReadTime";
import Fonts from "../data/Fonts";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { PiKeyReturn } from "react-icons/pi";
import { MdOutlinePublish } from "react-icons/md";

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

  const showToastMessage = (message) => {
    toast.error(message);
  };

  const publishPost = async () => {
    const api_url =
      import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
        ? import.meta.env.VITE_API_URL
        : "http://localhost:3000";
    const readTime = calculateReadTime(blogPost.PostContentText);

    const data = {
      ...blogPost,
      PostLenght: readTime,
      PostAuthor: userDataGlobalValue.name,
      PostAuthorId: userDataGlobalValue._id,
    };

    // Wrap the POST request in a promise for toast
    await toast
      .promise(
        axios.post(`${api_url}/api/posts/create`, data, {
          headers: {
            "Content-Type": "application/json",
          },
        }),
        {
          pending: "Publishing post...",
          success: "Post published successfully!",
          error: "Failed to publish post 😓",
        }
      )
      .then((response) => {
        console.log(response);

        if (response.status === 201) {
          // Post published successfully, redirect to the blog page

          window.location.href = `/post/${response.data.post[0]._id}`;

          setBlogPost({
            PostTitle: "",
            PostDescription: "",
            PostImage: "",
            PostContentText: "",
            PostType: "Blog",
            PostLenght: "",
            featured: false,
            PostAuthor: userDataGlobalValue.name || "",
            PostAuthorId: userDataGlobalValue._id || "",
          });

          sessionStorage.removeItem("blogPostData");
        }
      });
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

      <ToastContainer position="top-right" autoClose={3000} />

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

      <div className="w-[1000px] mx-auto mt-14 mb-14">
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
            required={true}
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
            required={true}
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
            required={true}
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
          className="min-h-96 text-[#252525] border-zinc-400 thin-border"
          modules={modules}
        />
      </div>

      <div className="w-[1000px] mx-auto flex gap-x-5">
        <Link to="/create/preview">
          <button className="bg-white px-4 py-2 border-2 rounded-md border-customTeal text-textColor1 font-[robot flex] flex gap-x-2 items-center font-thin">
            Preview Post <PiKeyReturn className="text-lg" />
          </button>
        </Link>

        <button
          className="bg-customTeal hover:bg-teal-800 px-4 py-2 text-white rounded-md font-[robot flex] flex gap-x-2 items-center font-thin"
          onClick={() => {
            if (
              blogPost.PostTitle === "" ||
              blogPost.PostDescription === "" ||
              blogPost.PostImage === "" ||
              blogPost.PostContentText === ""
            ) {
              showToastMessage("All fields are required!");
              return;
            }

            publishPost();
          }}
        >
          Publish Post <MdOutlinePublish className="text-xl" />
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePost;
