import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";

const Home = () => {
  return (
    <>
      <div className=" home-page-container w-full">
        <div className=" bg-white header w-full pt-1 pb-1 shadow-sm shadow-grey flex flex-row items-center justify-between ">
          <div className=" site-logo flex items-center">
            <img src={site_logo} alt="site-logo" className=" w-24 mr-3 ml-4" />
            <div className=" border-l-2 pl-3 border-zinc-900">BLOG</div>
          </div>
          <ul className=" nav-bar flex list-none gap-6">
            <li>Home</li>
            <li>Work</li>
            <li>About Us</li>
            <li>Contact Us</li>
          </ul>

          <div className=" search-bar mr-12 flex items-center">
            <img
              src={search_icon}
              alt="search_icon"
              className=" w-3 h-3 mr-1"
            />
            Search
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
