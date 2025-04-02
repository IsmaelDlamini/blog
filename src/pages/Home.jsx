import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogObject from "../components/BlogObject";
import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import FeaturedPost from "../components/FeaturedPost";
import axios, { isCancel, AxiosError } from "axios";

const Home = () => {

  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Tracks current page
  const [hasMore, setHasMore] = useState(true); // Checks if more posts exist
  const [loading, setLoading] = useState(false);

  const api_url = import.meta.env.VITE_API_URL || "http://localhost:3000";

  useEffect(() => {
    async function fetchPosts() {
      if (loading || !hasMore) return;

        setLoading(true);
        try {
            const response = await axios.get(`${api_url}/api/posts?page=${page}&limit=4`);
            setPosts((prev) => [...response.data]); // Append new posts
            setHasMore(response.data.hasMore); // Update if more posts exist
            setPage(page + 1); // Prepare for next load
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
        setLoading(false);      
    }

    fetchPosts();
  }, []);

  const loadPosts = posts
    .filter((post) => !post.featured)
    .map((post) => {
      return (
        <BlogObject
          PostType={post.PostType}
          DateCreated={(post.createdAt) ? post.createdAt.split("T")[0] : ""}
          PostLenght={post.PostLenght}
          PostImage={post.PostImage}
          PostDescription={post.PostDescription}
          PostTitle={post.PostTitle}
          key={post._id}
        />
      );
    });

  return (
    <>
      <Header currentPage={"Home"} />
      <div className="w-full pt-16 ">
        <HeroSection />

        <div className="w-[1000px] mx-auto">
          {posts
            .filter((post) => post.featured)
            .map((post) => {
              return (
                <FeaturedPost
                  key={post._id}
                  postType="BLOG"
                  image={
                    <img
                      src={post.PostImage}
                      alt="featured post image"
                      className="w-full h-full"
                    />
                  }
                  datePosted={(post.createdAt) ? post.createdAt.split("T")[0] : ""}
                  readTime={post.PostLenght}
                  title={post.PostTitle}
                  description={post.PostDescription}
                />
              );
            })}

          <h2 className="mt-12 font-outfit text-neutral-500 font-light text-lg">
            More Reads
          </h2>

          <div className="flex justify-between flex-wrap w-full">{loadPosts}</div>

          <div className="w-full my-8 flex justify-center">
            <button className="bg-customTeal px-6 py-2 text-white text-sm font-outfit font-extralight border-none outline-none">
              See More
            </button>
          </div>
        </div>

        <CallToAction />

        <Footer />
      </div>
    </>
  );
};

export default Home;
