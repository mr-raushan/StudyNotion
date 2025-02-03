import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";
import HighlightText from "../components/core/HomePage/HighlightText";
import CTAButton from "../components/core/HomePage/CTAButton";
import Banner from "../assets/Images/banner.mp4";
import CodeBlocks from "../components/core/HomePage/CodeBlocks";
import TimelineSection from "../components/core/HomePage/TimelineSection";
import LearningLanguageSection from "../components/core/HomePage/LearningLanguageSection";
import Instructor from "../assets/Images/Instructor.png";
import ExploreMore from "../components/core/HomePage/ExploreMore";
import Footer from "../components/common/Footer";

export default function Home() {
  return (
    // w-11/12 sm:w-10/12 md:w-8/12 lg:w-6/12 xl:w-4/12 bg-blue-500 p-4
    <div>
      {/* section 1 */}
      <div
        className="relative container mx-auto flex flex-col w-11/12  max-w-maxContent items-center 
      text-white justify-between"
      >
        <Link to={"/signup"}>
          <div className="mt-28 group bg-richblack-800 rounded-full py-1 px-2 font-bold transition-all duration-200 hover:scale-95 text-richblue-25 mx-auto w-fit ">
            <div className="rounded-full flex gap-2 items-center py-[5px] px-10 transition-all duration-200 group-hover:bg-richblack-900 shadow-[0_4px_6px_rgba(255,255,255,0.1)]">
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
          </div>
        </Link>
        <div className="text-4xl font-semibold text-center mt-14">
          Empower Your Future with
          <HighlightText text={" Coding Skills"} />
        </div>
        <p className="w-[95%] md:w-[65%] text-center mx-auto text-lg text-richblack-200 mt-4 leading-7">
          With our online coding courses, you can learn at your own pace, from
          anywhere in the world, and get access to a wealth of resources,
          including hands-on-projects, quizzes, and personalized feedback from
          instructors.
        </p>
        <div className="flex items-center justify-center gap-7 flex-row mt-8">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
          <CTAButton active={false} linkto={"/signup"}>
            Book a Demo
          </CTAButton>
        </div>
        <div className="relative shadow-[10px_-5px_50px_-5px] shadow-blue-200 my-3 mx-12 mt-12 rounded-md mb-10">
          <video
            muted
            loop
            autoPlay
            className="rounded-md text-center mx-auto shadow-[20px_20px_rgba(255,255,255)] "
          >
            <source src={Banner} type="video/mp4" />
          </video>
        </div>
        {/* code section 1 */}
        <div className="flex flex-col md:flex-row lg:flex-row">
          <CodeBlocks
            position={`lg:flex flex-row`}
            heading={
              <div className="text-4xl font-semibold">
                Unlock Your <HighlightText text={"Coding Skills "} />
                with our online courses
              </div>
            }
            subheading={
              <p className="font-semibold text-richblack-200">
                Our courses are designed and taught by industry experts who have
                years of experience in coding and are passionate about sharing
                their knowledge with you.
              </p>
            }
            ctabtn1={{
              btnText: "Try it Yourself",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codecolor={"text-yellow-25"}
            codeBlock={`<!DOCTYPE html>\n <html lang='en'>\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href='/'>Header</a></h1>\n<nav> <a href='/one'>One</a>\n</nav>\n</body>`}
            backgroundGradient={<div className="codeblock4 absolute"></div>}
          />
        </div>

        {/* code section 2 */}
        <div className="mr-20">
          <CodeBlocks
            position={`lg:flex flex-row-reverse`}
            heading={
              <div className="text-4xl font-semibold">
                Start <HighlightText text={"Coding in Seconds "} />
              </div>
            }
            subheading={
              <p className="font-semibold text-richblack-200">
                Go ahead give it a try. Our hands-on learning environment means
                you will be writing real code from your very first lesson.
              </p>
            }
            ctabtn1={{
              btnText: "Continue Lesson",
              linkto: "/signup",
              active: true,
            }}
            ctabtn2={{
              btnText: "Learn More",
              linkto: "/login",
              active: false,
            }}
            codecolor={"text-richblue-100"}
            codeBlock={`import React from 'react';\n import CTAButton from './Button';\nimport TypeAnimation from 'react-type';\nimport { FaArrowRight } from 'react-icons/fa';\nconst Home = () => {\nreturn (\n<div>Home</div>\n)\n}\nexport default Home;`}
            backgroundGradient={<div className="codeblock3 absolute"></div>}
          />
        </div>

        {/* Card section  */}
        <ExploreMore />
      </div>

      {/* section 2 */}
      <div className="bg-pure-greys-5 mt-28 text-richblue-700 ">
        <div className="homepage_bg w-full h-[250px] bg-cover bg-center bg-no-repeat">
          <div className="w-11/12 max-w-maxContent flex flex-col justify-center items-center gap-8 mx-auto">
            <div className="h-[100px]"></div>
            <div className="flex text-white gap-7 flex-row">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Explore Full Catalog
                  <FaArrowRight />
                </div>
              </CTAButton>
              <CTAButton active={false} linkto={"/signup"}>
                Learn More
              </CTAButton>
            </div>
          </div>
        </div>

        <div className=" w-11/12 container mx-auto max-w-maxContent mt-20 ">
          <div className="flex flex-col md:flex-row gap-6 mb-10 justify-between mx-auto ">
            <div className="w-[100%] md:w-[55%] text-4xl font-bold">
              Get the Skills You need for a{" "}
              <HighlightText text={"Job that is in demand."} />
            </div>

            <div className="w-[100%] md:w-[45%]">
              <p className="text-[16px] font-semibold">
                The modern StudyNotion is the dedicates its own terms. Today, to
                be a competetive specialist requires more than professional
                skills.
              </p>

              <div className="w-fit mt-8">
                <CTAButton active={true} linkto={"/signup"}>
                  Learn More
                </CTAButton>
              </div>
            </div>
          </div>

          <TimelineSection />

          <LearningLanguageSection />
        </div>
      </div>
      {/* section 3 */}
      <div className="w-11/12 container text-white mb-20 md:mb-40 mt-20 md:mt-40 mx-auto max-w-maxContent flex items-center justify-center gap-10">
        <div className="flex flex-col md:flex-row gap-32">
          <div className="w-[100%] flex md:[450px]">
            <img
              src={Instructor}
              alt="instructor"
              className=" h-fit shadow-[-20px_-20px_rgba(255,255,255)]"
            />
          </div>
          <div className="flex gap-3 flex-col justify-center">
            <p className="text-4xl font-semibold mb-4">
              Become an <HighlightText text={" Instructor"} />{" "}
            </p>
            <p className="text-[16px] mb-4 text-richblack-300 w-[80%]">
              Instructors from around the world teach millions of students on
              StudyNotion. We provide the tools and skills to teach what you
              love.
            </p>

            <div className="w-fit mt-4">
              <CTAButton active={true} linkto={"/signup"}>
                <div className="flex items-center gap-3">
                  Start Teaching Today
                  <FaArrowRight />
                </div>
              </CTAButton>
            </div>
          </div>
        </div>
      </div>
      <h1 className="text-white text-center text-4xl font-bold mb-10">
        Review from Other Learners
      </h1>
      {/* Footer */}
      <Footer />
    </div>
  );
}
