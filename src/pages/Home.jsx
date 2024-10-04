import image1 from "../assets/blog-image.jpg";
import blog_image_2 from "../assets/blog-image-2.jpg";
import blog_image_3 from "../assets/blog-image-3.jpg";
import blog_image_4 from "../assets/blog-image-4.jpg";
import "../styles/global.css";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full pt-16 ">
        <div className="w-full py-12 mb-6 mt-14 text-center border-b-2 border-zinc-100">
          <h1 className="w-fit mx-auto mb-4 text-4xl font-bold font-poppins  text-neutral-600">
            Ismail's<span className="text-customTeal ml-2">Blog</span> <br />
            <span className="font-light text-xl">
              {" "}
              Your ultimate guide to Tech Success
            </span>
          </h1>

          <button className="rounded-md px-3 py-1 bg-customTeal text-white">
            About Us
          </button>
        </div>

        <div className="hero-section h-full mx-auto flex justify-center space-x-4 mt-20">
          <div className="main-blog-width h-45 shadow-sm shadow-slate-100 rounded-b-lg rounded-t-lg">
            <img
              src={image1}
              alt="blog-image"
              className="w-full h-4/5 rounded-t-lg"
            />

            <div className="font-raleway py-2 px-3 bg-white h-1/5 flex-col justify-center rounded-b-lg  shadow-sm shadow-slate-100">
              <p className="font-bold h-fit text-textColor1">Blog</p>
              <div className="flex items-center">
                <p>
                  How to prepare yourself for the worldplace as a programmer
                </p>
                <button className="bg-customTeal text-white px-2 py-1 h-fit rounded-lg ml-2">
                  Read
                </button>
              </div>

              <p className="font-medium text-textColor1 text-xs">
                published: <span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
            </div>
          </div>

          <div className="w-1/4">
            <div className=" flex w-full font-raleway h-1/3">
              <div className="">
                <img src={blog_image_2} alt="blog-image" className="w-full h-4/5" />
              </div>
              <div  className="ml-4 w-1/2">
                <p className="text-xs">Ismael Dlamini - 23 September 2024</p>

                <h3 className="text-sm font-bold">How to Learn code effectively and quickly</h3>

                <p className="text-base line-clamp-3">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth,
                </p>
              </div>
            </div>

            <div className=" flex w-full font-raleway h-1/3">
              <div className="">
                <img src={blog_image_2} alt="blog-image" className="w-full h-4/5" />
              </div>
              <div  className="ml-4 w-1/2">
                <p className="text-xs">Ismael Dlamini - 23 September 2024</p>

                <h3 className="text-sm font-bold">How to Learn code effectively and quickly</h3>

                <p className="text-base line-clamp-3">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth,
                </p>
              </div>
            </div>


            <div className=" flex w-full font-raleway h-1/3">
              <div className="">
                <img src={blog_image_2} alt="blog-image" className="w-full h-4/5" />
              </div>
              <div  className="ml-4 w-1/2">
                <p className="text-xs">Ismael Dlamini - 23 September 2024</p>

                <h3 className="text-sm font-bold">How to Learn code effectively and quickly</h3>

                <p className="text-base line-clamp-3">
                  But I must explain to you how all this mistaken idea of
                  denouncing pleasure and praising pain was born and I will give
                  you a complete account of the system, and expound the actual
                  teachings of the great explorer of the truth,
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* more reads section */}

        <div className="main-page-width mx-auto h-40  mt-10">
          <h2 className="font-poppins mb-6">More Reads</h2>

          <div className="flex justify-between space-x-3">
            <div className="rounded-lg h-60 w-1/3">
              <img
                src={blog_image_2}
                alt="blog image"
                className="h-4/5 w-full"
              />

              <div className="h-1/5">
                <p>Blog</p>
              </div>
            </div>

            <div className="rounded-lg h-60 w-1/3">
              <img
                src={blog_image_3}
                alt="blog image"
                className="h-4/5 w-full"
              />

              <div className="h-1/5">
                <p>Blog</p>
              </div>
            </div>

            <div className="rounded-lg h-60 w-1/3">
              <img
                src={blog_image_4}
                alt="blog image"
                className="h-4/5 w-full"
              />

              <div className="h-1/5">
                <p>Blog</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
