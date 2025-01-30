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
    <div className={`flex ${position} my-20 justify-between `}>
      {/* section 1 */}
      <div className="'w-[100%] lg:w-[40%] flex flex-col gap-5 ml-10">
        {heading}
        <div>{subheading}</div>
        <div className="flex gap-7 mt-7">
          <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
            <div className="flex items-center gap-4">
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

      <div className="h-fit w-[100%] mr-20 code-border text-[15px] flex flex-row py-4 lg:w-[500px]">
        {backgroundGradient}
        <div className="text-center flex flex-col w-[10%] text-richblack-400 font-inter font-bold">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
          <p>5</p>
          <p>6</p>
          <p>7</p>
          <p>8</p>
          <p>9</p>
          <p>10</p>
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
