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
  const [activeTab, setActiveTab] = useState(tabsName[0]);
  const [course, setCourses] = useState(HomePageExplore[0].courses);
  const [currentCard, setCurrentCard] = useState(
    HomePageExplore[0].courses[0].heading
  );

  const setMyCards = (value) => {
    setActiveTab(value);
    const result = HomePageExplore.filter((course) => course.tag === value);
    setCourses(result[0].courses);
    setCurrentCard(result[0].courses[0].heading);
  };

  return (
    <div className="mb-10 ">
      <div className="text-4xl font-semibold text-center">
        Unlock the
        <HighlightText text={"Power of Code"} />
      </div>
      <p className="text-center text-richblack-200 mt-3">
        Learn to build, anything You can Imagine
      </p>

      <div className="bg-richblack-700 rounded-full py-1 px-10 mt-10">
        {tabsName.map((tab, index) => (
          <button
            onClick={() => setMyCards(tab)}
            key={index}
            className={`${
              activeTab === tab
                ? "bg-richblue-900 text-richblack-5 font-medium"
                : "bg-richblack-700 text-richblack-200"
            } py-3 px-6 rounded-full transition-all duration-200 select-none ease-in-out hover:bg-richblack-900 hover:text-richblack-5 `}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="lg:h-[150px]"></div>

      {/* course card ka group  */}
      <div>
        {course.map((element, index) => {
          return (
            <CourseCard
              key={index}
              element={element}
              currentCard={currentCard}
              setCurrentCard={setCurrentCard}
            />
          );
        })}
      </div>
    </div>
  );
}
