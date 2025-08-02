import "../styles/global.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import BlogObject from "../components/BlogObject";
import { useEffect, useState } from "react";
import CallToAction from "../components/CallToAction";
import HeroSection from "../components/HeroSection";
import FeaturedPost from "../components/FeaturedPost";
import axios, { isCancel, AxiosError } from "axios";
import { readableDate } from "../utils/readableDate";
import BlogObjectSkeleton from "../components/BlogObjectSkeleton";
import FeaturedPostSkeleton from "../components/FeaturedPostSkeleton";

const Home = () => {
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
        console.log("Posts fetched successfully:", response);

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
      const response = await axios.get(  `${api_url}/api/posts?page=${page}&limit=${postLimit}`
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
      <div className="w-full ">
        <HeroSection />

        <div className="w-[1000px] mx-auto">
          {!loading ?
            featuredPost.map((post) => {
                return (
                  <FeaturedPost
                    key={post._id}
                    postType="BLOG"
                    image={
                      <img
                        src={post.PostImage}
                        alt="featured post image"
                        className="h-full"
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
            : <FeaturedPostSkeleton />}

          <h2 className="mt-12 font-outfit text-neutral-500 font-light text-lg">
            MORE READS
          </h2>

          <div className="w-full flex justify-between gap-x-36">
            <div className="grid grid-cols-1 gap-x-5 gap-y-5 justify-between w-full mt-5 ">
              {loading
    ? Array.from({ length: 3 }).map((_, i) => <BlogObjectSkeleton key={i} />)
    : loadPosts}
            </div>

            <div className=" flex justify-start flex-col items-start sticky top-24 self-start">
              <div className="flex ">
                <input
                  className="border-[1px] px-2 border-neutral-400"
                  type="text"
                  placeholder="Enter your search topic"
                />

                <button className="bg-customTeal px-2 py-1 font-outfit text-white">
                  search
                </button>
              </div>

              <h2 className="mt-6 font-outfit text-neutral-500 font-light text-lg">
                LATEST POSTS
              </h2>

              <div className="">
                {posts
                  .filter((post) => !post.featured)
                  .map((post) => {
                    return (
                      <p
                        key={post._id}
                        className="text-neutral-950 my-5 font-normal text-base mb-2 cursor-pointer hover:text-customTeal transition-colors duration-200"
                      >
                        {" "}
                        <span className="pr-4">{post.PostTitle} </span>{" "}
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

          <div className="w-[600px] my-14 flex justify-center">
            <button className="bg-customTeal px-20 py-2 text-white text-sm font-outfit font-extralight border-none outline-none" onClick={ () => getMorePosts()}>
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
