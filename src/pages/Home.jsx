import site_logo from "../assets/site_logo.png";
import search_icon from "../assets/search_icon.png";
import image1 from "../assets/mainImage.jpg"

const Home = () => {
  return (
    <>
      <div className=" home-page-container w-full bg-white">
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

          <div className=" search-bar mr-5 flex items-center h-10">
            <img
              src={search_icon}
              alt="search_icon"
              className=" w-3 h-3 mr-1"
            />
            <div className=" flex items-center">Search</div> 

            <div className=" pl-3 pr-3 pt-1 pb-2 bg-customTeal text-white rounded-3xl flex items-center ml-5 text-sm">Start Writing</div>
          </div>
        </div>


        <div className="main-section w-5/6 mx-auto mt-10 flex">
            <div className="main-visual h-fit  w-2/3">
              <div className="Intro text-xl text-textColor1">Ismail{"'"}s Blog: The ultimate Guide to Tech Success</div>
              <div className="blog-container mt-5 w-3/4 h-96    bg-black rounded-lg relative shadow-xl p-0">
                    <img src={image1} alt="Main Image" className=" w-full h-full"/>
                    <div className="info absolute w-full h-22 bg-white top-full"></div>
              </div>
            </div>

            <div className="top-picks">

            </div>
        </div>



      </div>
    </>
  );
};

export default Home;
