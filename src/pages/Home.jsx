import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogObject from "../components/BlogObject";
import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import FeaturedPost from "../components/FeaturedPost";
import axios from "axios";
import { readableDate } from "../utils/readableDate";
import BlogObjectSkeleton from "../components/BlogObjectSkeleton";
import FeaturedPostSkeleton from "../components/FeaturedPostSkeleton";
import { trackPageView } from "../utils/gtag";

const Home = () => {
  useEffect(() => {
    try { trackPageView({ page_title: "Home" }); } catch (err) { console.debug("GA Home skipped", err); }
  }, []);
  const [posts, setPosts] = useState([]);
  const [page, setPage] = useState(1); // Tracks current page
  const [hasMore, setHasMore] = useState(true); // Checks if more posts exist
  const [loading, setLoading] = useState(false);
  const [featuredPost, setFeaturedPost] = useState([]);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [postLimit, setPostLimit] = useState(3);

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const api_url =
    import.meta.env.VITE_ENVIRONMENT == "PRODUCTION"
      ? import.meta.env.VITE_API_URL
      : "http://localhost:3000";

  useEffect(() => {
    async function fetchPosts() {
      if (loading || !hasMore) return;

      setLoading(true);
      try {
        const response = await axios.get(
          `${api_url}/api/posts?page=${page}&limit=3`
        );
        setPosts((prev) => [...response.data.posts]); // Append new posts
        setHasMore(response.data.hasMore); // Update if more posts exist
        setPage(page + 1); // Prepare for next load
        setPostLimit(2);

        const FeaturedPostresponse = await axios.get(
          `${api_url}/api/posts/featured`
        );

        setFeaturedPost(FeaturedPostresponse.data.Post);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
      setLoading(false);
    }

    fetchPosts();

    const keyword = "postContent_";

    for (let i = 0; i < sessionStorage.length; i++) {
      const key = sessionStorage.key(i);
      if (key && key.includes(keyword)) {
        sessionStorage.removeItem(key);
        i--; // IMPORTANT: adjust index after removing item
      }
    }
  }, []);

  const getMorePosts = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await axios.get(
        `${api_url}/api/posts?page=${page}&limit=${postLimit}`
      );

      setPosts((prev) => [...prev, ...response.data.posts]);
      setHasMore(response.data.hasMore);
      setPage((prev) => prev + 1);
    } catch (error) {
      console.error("Error fetching more posts:", error);
    }
    setLoading(false);
  };

  const loadPosts = posts
    .filter((post) => !post.featured)
    .map((post) => {
      return (
        <BlogObject
          PostType={post.PostType}
          DateCreated={post.createdAt ? post.createdAt.split("T")[0] : ""}
          PostLenght={post.PostLenght}
          PostImage={post.PostImage}
          PostDescription={post.PostDescription}
          PostTitle={post.PostTitle}
          key={post._id}
          postId={post._id}
          author={post.PostAuthor}
          NumberOfLikes={post.numberOfLikes}
        />
      );
    });

  return (
    <>
      <Header currentPage={"Home"} />
      <div className="w-full">
        <HeroSection />

        {/* ✅ Responsive container */}
        <div className="max-w-[1000px] w-full mx-auto px-4 sm:px-6 lg:px-8">
          {!loading ? (
            featuredPost.map((post) => {
              return (
                <FeaturedPost
                  key={post._id}
                  postType="BLOG"
                  image={
                    <img
                      src={post.PostImage}
                      alt="featured post image"
                      className="h-full w-full object-cover"
                    />
                  }
                  datePosted={
                    post.createdAt ? post.createdAt.split("T")[0] : ""
                  }
                  readTime={post.PostLenght}
                  title={post.PostTitle}
                  description={post.PostDescription}
                  author={post.PostAuthor}
                />
              );
            })
          ) : (
            <FeaturedPostSkeleton />
          )}

          <h2 className="mt-12 font-outfit text-neutral-500 font-light text-lg">
            MORE READS
          </h2>

          {/* ✅ Flex switches to column on mobile, row on desktop */}
          <div className="w-full flex flex-col lg:flex-row justify-between gap-8 lg:gap-12">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-5 w-full mt-5">
              {loading
                ? Array.from({ length: 3 }).map((_, i) => (
                    <BlogObjectSkeleton key={i} />
                  ))
                : loadPosts}
            </div>

            {/* Sidebar responsive */}
            <div className="flex flex-col items-start sticky top-24 self-start mt-10 lg:mt-0 w-full lg:w-[300px]">
              <div className="flex w-full">
                <input
                  className="border px-2 border-neutral-400 flex-1"
                  type="text"
                  placeholder="Enter your search topic"
                />
                <button className="bg-customTeal px-3 py-1 font-outfit text-white">
                  search
                </button>
              </div>

              <h2 className="mt-6 font-outfit text-neutral-500 font-light text-lg">
                LATEST POSTS
              </h2>

              <div className="w-full">
                {posts
                  .filter((post) => !post.featured)
                  .map((post) => {
                    return (
                      <p
                        key={post._id}
                        className="text-neutral-950 my-3 font-normal text-sm sm:text-base cursor-pointer hover:text-customTeal transition-colors duration-200"
                      >
                        <span className="pr-2">{post.PostTitle} </span>
                        <span className="font-light text-neutral-700">
                          (
                          {post.createdAt
                            ? readableDate(post.createdAt.split("T")[0])
                            : ""}
                          )
                        </span>
                      </p>
                    );
                  })}
              </div>
            </div>
          </div>

          {/* ✅ Responsive button */}
          <div className="w-full my-14 flex justify-center">
            <button
              className="bg-customTeal px-8 sm:px-16 lg:px-20 py-2 text-white text-sm font-outfit font-extralight border-none outline-none"
              onClick={() => getMorePosts()}
            >
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
