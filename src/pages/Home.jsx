import image1 from "../assets/blog-image.jpg";
import "../styles/global.css";
import Header from "../components/Header";

const Home = () => {
  return (
    <>
      <Header />
      <div className="w-full pt-32 ">
        <h1 className="w-fit mx-auto mb-10 text-4xl font-medium font-raleway text-neutral-500">
          Welcome to <span>Ismails Blog</span> - Your ultimate guide to{" "}
          <span className="text-customTeal underline">Tech Success</span>
        </h1>

        <div className="hero-section h-full mx-auto flex justify-center space-x-20 ">
          <div className="main-blog h-45 shadow-sm rounded-b-lg rounded-t-lg">
            <img
              src={image1}
              alt="blog-image"
              className="w-full h-4/5 rounded-t-lg"
            />

            <div className="font-raleway py-2 px-3 bg-white h-1/5 flex-col justify-center rounded-b-lg">
              <p className="font-bold h-fit text-textColor1">Blog</p>
              <div className="flex items-center">
                <p>
                  How to prepare yourself for the worldplace as a programmer
                </p>
                <button className="bg-customTeal text-white px-2 py-1 h-fit rounded-lg ml-5">
                  Read
                </button>
              </div>

              <p className="font-medium text-textColor1 text-xs">
                published: <span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
            </div>
          </div>
          <div className="">
            <h1 className="text-2xl font-medium text-textColor2 font-raleway">
              Top picks of the week{" "}
            </h1>

            <ul className="ml-8 mt-4 flex-col space-y-4">
              <li className="w-4/5">
                <h2 className="text-customTeal font-bold font-poppins">
                  How To
                </h2>

                <p className="text-textColor1 leading-none mt-2">
                  How To Learn Code Effectively and Quickly
                </p>

                <p className="text-xs mt-2 underline underline-offset-1 text-textColor1"><span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
              </li>

              <li className="w-4/5">
                <h2 className="text-customTeal font-bold font-poppins">
                  Blog
                </h2>

                <p className="text-textColor1 leading-none mt-2">
                Is Ai Going to Fully Replace
                Programmers?
                </p>

                <p className="text-xs mt-2 underline underline-offset-1 text-textColor1"><span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
              </li>

              <li className="w-4/5">
                <h2 className="text-customTeal font-bold font-poppins">
                Intro
                </h2>

                <p className="text-textColor1 leading-none mt-2">
                Who is Ismail ?
                </p>

                <p className="text-xs mt-2 underline underline-offset-1 text-textColor1"><span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
              </li>

              <li className="w-4/5">
                <h2 className="text-customTeal font-bold font-poppins">
                  Blog
                </h2>

                <p className="text-textColor1 leading-none mt-2">
                  The Future of tech.
                </p>

                <p className="text-xs mt-2 underline underline-offset-1 text-textColor1"><span className="font-light">23 August 2024</span> -
                Ismael Dlamini
              </p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
