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

const Post = () => {
  const [blogPostContent, setBlogPostContent] = useState();
  const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";
  const { id } = useParams(); // Get the post ID from the URL

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

        console.log(response.data.content)
      } catch (error) {
        console.error("Error publishing post:", error);
      }
    }

    fetchPostContent();
  }, []);

  return (
    <>
      <div className="  h-full">
        <Header />
        <div className="flex space-x-3 w-[900px] mx-auto items-center mt-20 mb-5 ">
          <div className="rounded-full w-10 h-10 bg-purple-900 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex]">
            ID
          </div>{" "}
          <p className=" text-textColor1 font-extralight pr-3">Ismael Dlamini </p> {" - "}
          <p className=" text-textColor1 font-extralight">24 August 2025</p>
        </div>

        <ReactQuill
          theme="snow"
          value={blogPostContent}
          className="h-fit w-[900px] mx-auto  mb-24 text-textColor1"
          modules={{ toolbar: false }}
          readOnly={true} // Set to true to make it read-only
        />

        <Link to="/">
          <div className="w-[900px] mx-auto flex justify-center">
            <button className="bg-customTeal px-4 py-2 text-white font-[robot flex] font-thin">
              Return to Home page
            </button>
          </div>
        </Link>

        <Footer />
      </div>
    </>
  );
};

export default Post;
