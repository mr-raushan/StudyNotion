import HighlightText from "../components/core/HomePage/HighlightText";
import BannerImage1 from "../assets/Images/aboutus1.webp";
import BannerImage2 from "../assets/Images/aboutus2.webp";
import BannerImage3 from "../assets/Images/aboutus3.webp";
import Quote from "../components/core/AboutPage/Quote";
import FoundingStory from "../assets/Images/FoundingStory.png";
import StatsComponent from "../components/core/AboutPage/StatsComponent";
import LearningGrid from "../components/core/AboutPage/LearningGrid";
import ContactForm from "../components/core/AboutPage/ContactForm";
import Footer from "../components/common/Footer";

export default function About() {
  return (
    <>
      <div className="mt-14 text-white w-11/12 max-w-maxContent mx-auto">
        {/* section 1  */}
        <section className="w-11/12 max-w-maxContent flex flex-col">
          <div>
            <header className="text-4xl text-center font-semibold  text-richblack-25">
              Driving Innovation in Online Education for a
              <HighlightText text=" Brighter Future" />
            </header>
            <p>
              StudyNotion is at the forefront of driving innovation in online
              education. We are passionate about creating a brighter future by
              offering cutting-edge courses, levaraging emerging technologies,
              and nurturing a vibrant learning community.
            </p>
          </div>
          <div className="flex flex-col lg:flex-row md:flex-row gap-4 ">
            <img
              src={BannerImage1}
              alt="banner1"
              loading="lazy"
              className="rounded-md"
            />
            <img
              src={BannerImage2}
              alt="banner2"
              loading="lazy"
              className="rounded-md"
            />
            <img
              src={BannerImage3}
              alt="banner3"
              loading="lazy"
              className="rounded-md"
            />
          </div>
        </section>

        {/* section 2  */}
        <section className="mt-10">
          <Quote />
        </section>

        {/* section 3  */}
        <section className=" mt-10">
          <div className="flex ">
            <div className="w-[100%] md:w-[50%] lg:w-[50%]">
              <h1>Our Founding Story</h1>
              <p>
                Our e-learning platform was born out of a shared vision and
                passion for transforming education. It all began with a group of
                educators, technologists, and lifelong learners who recognized
                the need for accessible, flexible, and high-quality learning
                opportunities in a rapidly evolving digital world.
              </p>
              <p>
                As experienced educators ourselves, we witnessed firsthand the
                limitations and challenges of traditional education systems. We
                believed that education should not be confined to the walls of a
                classroom or restricted by geographical boundaries. We
                envisioned a platform that could bridge these gaps and empower
                individuals from all walks of life to unlock their full
                potential.
              </p>
            </div>
            <div className="w-[50%] mb-20">
              <img
                src={FoundingStory}
                alt="foundingImage"
                loading="lazy"
                className="rounded-md"
              />
            </div>
          </div>

          {/* our mission left box  */}
          <div className="flex mb-20">
            <div className="w-[50%]">
              <h1>Our Vision</h1>
              <p>
                With this vision in mind, we set out on a journey to create an
                e-learning platform that would revolutionize the way people
                learn. Our team of dedicated experts worked tirelessly to
                develop a robust and intuitive platform that combines
                cutting-edge technology with engaging content, fostering a
                dynamic and interactive learning experience.
              </p>
            </div>

            {/* our mission right box  */}
            <div className="w-[50%]">
              <h1>Our Mission</h1>
              <p>
                our mission goes beyond just delivering courses online. We
                wanted to create a vibrant community of learners, where
                individuals can connect, collaborate, and learn from one
                another. We believe that knowledge thrives in an environment of
                sharing and dialogue, and we foster this spirit of collaboration
                through forums, live sessions, and networking opportunities.
              </p>
            </div>
          </div>
        </section>

        {/* section 4  */}
        <StatsComponent />

        {/* section 5  */}
        <section>
          {" "}
          <LearningGrid />
        </section>
        {/* section 6  */}
        <section>
          <ContactForm />
        </section>

        {/* section 7  */}
        <section>
          <h1>Review from other learns</h1>
          {/* review component  */}
        </section>
      </div>
      <Footer />
    </>
  );
}
