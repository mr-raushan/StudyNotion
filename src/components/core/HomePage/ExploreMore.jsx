import { useState } from "react";
import { HomePageExplore } from "../../../data/homepage-explore";
import HighlightText from "./HighlightText";
import CourseCard from "./CourseCard";

const tabsName = [
  "Free",
  "New to Coding",
  "Most Popular",
  "Skills paths",
  "Carrer paths",
];

export default function ExploreMore() {
  const [currentTab, setCurrentTab] = useState(tabsName[0]);
  const [course, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setCurrentTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="mb-10 ">
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={" Power of Code"} />
      </div>
      <p className="text-center text-richblack-200 mt-3 mb-3">
        Learn to build, anything You can Imagine
      </p>

      <div className="bg-richblack-700 rounded-full py-1 px-6 mt-10 hidden sm:hidden  md:block ">
        {tabsName.map((tab, index) => (
          <button
            onClick={() => setMyCards(tab)}
            key={index}
            className={`${
              currentTab === tab
                ? "bg-richblue-900 text-richblack-5 font-medium"
                : "bg-richblack-700 text-richblack-200"
            } py-3 px-6 rounded-full transition-all duration-200 select-none ease-in-out hover:bg-richblack-900 hover:text-richblack-5 text-[14px]`}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="lg:h-[150px]"></div>

      {/* course card ka group  */}
      <div className="lg:absolute gap-10 justify-center lg:gap-0 flex lg:justify-between flex-wrap w-full lg:bottom-[0] lg:left-[50%] lg:translate-x-[-50%] lg:translate-y-[50%] text-black lg:mb-0 mb-7 lg:px-0 px-3">
        {course.map((element, index) => {
          return (
            <CourseCard
              key={index}
              CardData={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}
