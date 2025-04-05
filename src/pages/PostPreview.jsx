import React, { useEffect } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ReactQuill from "react-quill";
import { Link } from "react-router-dom";
import { PiKeyReturn } from "react-icons/pi";
import { MdOutlinePublish } from "react-icons/md";
import { useMyContext } from "../context/MyContext";
import { calculateReadTime } from "../../utils/calculateReadTime";
import axios from "axios";
import CustomProgressToast from "../components/toasts/CustomProgressToast";
import { ToastContainer, toast } from "react-toastify";


const PostPreview = () => {
  const { userDataGlobalValue } = useMyContext();

  const saved = sessionStorage.getItem("blogPostData");


  const savedData = saved ? JSON.parse(saved) : null;

  const date = new Date();

  const publishPost = async () => {
    const api_url = "http://localhost:3000";
    const readTime = calculateReadTime(savedData?.PostContentText);
    const data = {
      ...savedData,
      PostLenght: readTime,
      PostAuthor: userDataGlobalValue.name,
      PostAuthorId: userDataGlobalValue._id,
    };
  
    // Show custom progress toast
    const toastId = toast(<CustomProgressToast progress={0.3} />, {
      progress: 0,
      autoClose: false,
      closeButton: false,
      className: "bg-slate-800 text-white shadow-lg w-[350px]",
    });
  
    try {
      const response = await axios.post(`${api_url}/api/posts/create`, data, {
        headers: {
          "Content-Type": "application/json",
        },
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.loaded / progressEvent.total;
          toast.update(toastId, {
            render: <CustomProgressToast progress={progress} />,
            progress,
          });
        },
      });
  
      toast.update(toastId, {
        render: " Post published successfully!",
        type: toast.TYPE.SUCCESS,
        autoClose: 3000,
        progress: undefined,
      });
  
      console.log("Post published successfully:", response.data);
    } catch (error) {
      toast.update(toastId, {
        render: " Error publishing post!",
        type: toast.TYPE.ERROR,
        autoClose: 3000,
        progress: undefined,
      });
  
      console.error("Error publishing post:", error);
    }
  };
  

  return (
    <>
     

      <div className="  h-full">
        <Header />

        <ToastContainer />

        <h1 className="w-[900px] mx-auto text-3xl font-[roboto flex] font-thin mb-10 underline mt-20 text-neutral-700">
          Post Preview
        </h1>
        <div className="flex space-x-3 w-[900px] mx-auto items-center mb-5 ">
          <div className="rounded-full w-10 h-10 bg-purple-900 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex]">
            {savedData?.PostAuthor.split(" ")[0].charAt(0).toUpperCase() +
              savedData?.PostAuthor.split(" ")[1].charAt(0).toUpperCase()}
          </div>{" "}
          <p className=" text-textColor1 font-extralight pr-3">
            {savedData?.PostAuthor}{" "}
          </p>{" "}
          {" - "}
          <p className=" text-textColor1 font-extralight">
            {date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear()}
          </p>
        </div>

        <ReactQuill
          theme="snow"
          value={savedData?.PostContentText}
          className="h-fit w-[900px] mx-auto  mb-24 text-textColor1"
          modules={{ toolbar: false }}
          readOnly={true}
        />

        <div className="w-[900px] mx-auto mb-10 text-neutral-700">
          <h1 className="text-3xl font-[roboto flex] font-thin mb-5 underline">
            Post Metadata
          </h1>

          <div className="flex gap-x-2 mb-4">
            Post Title:{" "}
            <p className="text-textColor1 font-extralight">
              {savedData?.PostTitle}
            </p>
          </div>

          <p className="mb-1">Post Description: </p>
          <p className="text-textColor1 font-extralight mb-4">
            {savedData?.PostDescription}
          </p>
          <div className="flex gap-x-2 mb-8">
            Post Type:{" "}
            <p className="text-textColor1 font-extralight">
              {savedData?.PostType}
            </p>
          </div>

          <p className="mb-5">Post Thumbnail:</p>

          <img
            src={savedData?.PostImage}
            alt={"Post Thumbnail"}
            className="w-60"
          />
        </div>

        <div className="w-[900px] mx-auto flex gap-x-5">
          <Link to="/create">
            <button className="bg-white px-4 py-2 border-2 border-customTeal text-textColor1 font-[robot flex] flex gap-x-2 items-center font-thin">
              Return to Edit post <PiKeyReturn className="text-lg" />
            </button>
          </Link>

          <button
            className="bg-customTeal px-4 py-2 text-white font-[robot flex] flex gap-x-2 items-center font-thin"
            onClick={() => {
                
                publishPost()
                notify()

            }}
          >
            Publish Post <MdOutlinePublish className="text-xl" />
          </button>
        </div>

        <Footer />
      </div>
    </>
  );
};




export default PostPreview;
