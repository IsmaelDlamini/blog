import React from "react";
import Header from "../components/Header";
import blog_image_featured from "../assets/blog-image-featured.jpg";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Post = () => {
  return (
    <>
      <div className="w-full h-full">
        <Header />

        <div className="w-[900px] mx-auto pt-36">
          <div className="flex space-x-3 items-center">
            <div className="rounded-full w-10 h-10 bg-purple-900 flex items-center justify-center text-xl font-outfit text-white font-[roboto flex">
              ID
            </div>{" "}
            <p className=" text-textColor1 font-extralight">Ismael Dlamini</p>-
            <p className=" text-textColor1 font-extralight">24 August 2025</p>
          </div>

          <h1 className="mt-8 text-5xl font-outfit text-textColor1">
            Top Coding Projects to Build Your Skills as a Software Engineer.
          </h1>

          <p className="mt-6 font-[robot flex] font-light text-base leading-normal">
            As a software engineer, working on coding projects is one of the
            best ways to develop your skills, gain practical experience, and
            build a portfolio that showcases your abilities. Whether you’re just
            starting or looking to enhance your expertise, here are some top
            coding projects to consider:
          </p>

          {/* <div className="w-full mt-9 h-72 overflow-hidden">
            <img
              src={blog_image_featured}
              alt="blog post image"
              className="w-full h-auto "
            />
          </div> */}

          <h2 className="mt-10 font-outfit text-textColor1 text-2xl font-normal">
            1. Personal Portfolio Website
          </h2>

          <p className="mt-3 font-[robot flex] font-light text-base leading-normal">
            Creating your own portfolio website is an essential project for any
            developer. It allows you to showcase your skills, projects, and
            experiences in one place. Use HTML, CSS, and JavaScript to design a
            responsive site, and consider incorporating frameworks like React or
            Vue.js for added functionality.
          </p>

          <h2 className="mt-10 font-outfit text-textColor1 text-2xl font-normal">
            2. To-Do List Application
          </h2>

          <p className="mt-3 font-[robot flex] font-light text-base leading-normal">
            A classic beginner project, a to-do list app helps you practice CRUD
            (Create, Read, Update, Delete) operations. Implement features like
            user authentication, due dates, and priority levels to enhance your
            app's functionality. You can build it using JavaScript with a
            backend framework like Node.js or Django.
          </p>

          <h2 className="mt-10 font-outfit text-textColor1 text-2xl font-normal">
            3. Weather App
          </h2>

          <p className="mt-3 font-[robot flex] font-light text-base leading-normal">
            Build a weather application that fetches data from a weather API.
            This project will help you learn about API integration, data
            handling, and displaying information in a user-friendly format. You
            can use libraries like Axios for making HTTP requests and chart.js
            for visualizing weather data.
          </p>

          <h2 className="mt-10 font-outfit text-textColor1 text-2xl font-normal">
            4. Blog Platform
          </h2>

          <p className="mt-3 font-[robot flex] font-light text-base leading-normal">
            Create a simple blogging platform where users can register, create,
            edit, and delete posts. This project will help you understand user
            authentication, database management, and how to handle
            user-generated content. Consider using a framework like Ruby on
            Rails or a full-stack JavaScript approach with Node.js and Express.
          </p>

          <h2 className="mt-10 font-outfit text-textColor1 text-2xl font-normal">
            5. E-commerce Store
          </h2>

          <p className="mt-3 font-[robot flex] font-light text-base leading-normal">
            An e-commerce site allows you to dive deeper into web development
            concepts. Implement features such as product listings, shopping
            carts, and payment gateways. This project can help you learn about
            backend development, databases, and payment processing using APIs
            like Stripe.
          </p>

          <p className="mt-10 font-[robot flex] font-light text-base leading-normal">
            Building coding projects is an invaluable part of your journey as a
            software engineer. Not only do they enhance your skills, but they
            also provide you with tangible evidence of your capabilities. Choose
            projects that interest you, and don’t be afraid to challenge
            yourself. Happy coding!
          </p>
        </div>

        <Link to="/">
          <div className="w-[900px] mx-auto mt-12 flex justify-center">
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
