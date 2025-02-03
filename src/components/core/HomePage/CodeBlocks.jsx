/*eslint-disable*/

import CTAButton from "./CTAButton";
import { FaArrowRight } from "react-icons/fa";
import { TypeAnimation } from "react-type-animation";

export default function CodeBlocks({
  heading,
  subheading,
  ctabtn1,
  ctabtn2,
  codecolor,
  codeBlock,
  backgroundGradient,
  position,
}) {
  return (
    <div className={`flex ${position} my-20 justify-between lg:gap-10 gap-10`}>
      {/* section 1 */}
      <div className="'w-[100%] md:w-[80%] lg:w-[50%] flex flex-col gap-5 ml-5 md:ml-10">
        {heading}
        <div>{subheading}</div>
        <div className="flex flex-col md:flex-row gap-4 md:gap-7 mt-5 md:mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-2 md:gap-4">
              {ctabtn1.btnText}
              <FaArrowRight />
            </div>
          </CTAButton>
          <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
            {ctabtn2.btnText}
          </CTAButton>
        </div>
      </div>

      {/* section 2  */}

      <div className="md:flex h-fit w-[90%] md:w-[80%] lg:w-[500px] mt-10 lg:mt-0 mr-20 code-border text-[13px] md:text-[15px] flex flex-row py-4 ">
        {backgroundGradient}
        <div className="text-center select-none flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          {[...Array(10).keys()].map((num) => (
            <p key={num}>{num + 1}</p>
          ))}
        </div>
        <div
          className={`w-[90%] font-bold flex flex-col gap-2 font-mono pr-2 ${codecolor}`}
        >
          <TypeAnimation
            sequence={[codeBlock, 2000, ""]}
            repeat={Infinity}
            cursor={true}
            omitDeletionAnimation={true}
            style={{
              whiteSpace: "pre-line",
              display: "block",
            }}
          />
        </div>
      </div>
    </div>
  );
}
