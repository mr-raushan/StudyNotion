/*eslint-disable*/

import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

export default function CourseCard({ CardData, currentCard, setCurrentCard }) {
  return (
    <div
      className={`w[350px] lg:w-[30%] ${
        currentCard === CardData.heading
          ? "bg-white shadow-[12px_12px_0_0] shadow-yellow-50"
          : " bg-richblack-800"
      } text-richblack-25 h-[300px] box-border cursor-pointer`}
      onClick={() => setCurrentCard(CardData.heading)}
    >
      <div className="border-b-[2px] border-richblack-400 border-dashed h-[80%] p-6 flex flex-col gap-3">
        <div
          className={` ${
            currentCard === CardData?.heading && "text-richblack-800"
          } font-semibold text-[20px]  `}
        >
          {CardData?.heading}
        </div>

        <div className="text-richblack-400">{CardData?.description}</div>
      </div>

      <div
        className={`flex justify-between items-center gap-3 ${
          currentCard === CardData?.heading
            ? "text-blue-300"
            : "text-richblack-300"
        } py-3 font-medium px-6`}
      >
        {/* level 1 */}
        <div className="flex items-center gap-2">
          {" "}
          <HiUsers />
          <p>{CardData?.level}</p>
        </div>

        <div className="flex items-center gap-2 text-[16px]">
          <ImTree />
          <p>{CardData?.lessionNumber} Lession</p>
        </div>
      </div>
    </div>
  );
}
