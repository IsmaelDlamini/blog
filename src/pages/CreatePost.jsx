import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";
import Footer from "../components/Footer";
import { useMyContext } from "../context/MyContext";
import "../styles/global.css";

const CreatePost = () => {
  const { blogPostContent = "", setBlogPostContent } = useMyContext();

  const toolbarOptions = [
    [{ font: [] }], // Font options
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

      <h1 className="mx-auto w-fit pt-32 font-[roboto flex] text-2xl text-textColor1">
        Create Blog Post
      </h1>

      <div className="w-[1000px] mx-auto mt-14 mb-24">
        <ReactQuill
          theme="snow"
          value={blogPostContent}
          onChange={setBlogPostContent}
          className="h-96"
          modules={modules}
        />
      </div>

      {/* <div className="w-[1000px] mx-auto mt-4 mb-20">
        <h1 className="mx-auto w-fit pt-32 font-[roboto flex] text-2xl text-textColor1">
          Post Preview
        </h1>

        <ReactQuill
          theme="bubble"
          value={blogPostContent}
          className="h-96"
          readOnly={true}
        />
      </div> */}

      <div className="w-[1000px] mx-auto flex justify-center gap-x-5">
        <button className="px-5 py-2 bg-customTeal text-white font-outfit font-light rounded-sm cursor-pointer">
          Preview
        </button>

        <button className="px-5 py-2 bg-customTeal text-white font-outfit font-light rounded-sm cursor-pointer">
          Publish
        </button>
      </div>

      <Footer />
    </div>
  );
};

export default CreatePost;
