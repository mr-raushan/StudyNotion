import HighlightText from "./HighlightText";
import compareWithOther from "../../../assets/Images/Compare_with_others.png";
import knowYourProgress from "../../../assets/Images/Know_your_progress.png";
import planYourLesson from "../../../assets/Images/Plan_your_lessons.png";
import CTAButton from "./CTAButton";

export default function LearningLanguageSection() {
  return (
    <div className="mt-10">
      <div className="flex flex-col gap-5 items-center">
        <p className="text-4xl font-semibold text-center">
          Your swiss knife for
          <HighlightText text={" Learning any Language"} />
        </p>
        <p className="text-base text-center w-[100%] md:w-[50%] md:text-[16px] mx-auto">
          Using spin making learning multiple language easy. with 20+ languages
          realastic voice over, process tracking, custom schedule and more
        </p>

        {/* image section  */}
        <div className="flex flex-col gap-2 md:flex-row lg:flex-row mt-1 ">
          <div className="flex flex-col md:flex-row lg:flex-row text-center">
            <img
              src={knowYourProgress}
              alt="planyourlesson"
              className="object-contain -mr-32"
            />
            <img
              src={compareWithOther}
              alt="knowyourprogress"
              className="object-contain "
            />

            <img
              src={planYourLesson}
              alt="comparewithothers"
              className="object-contain md:-ml-48"
            />
          </div>
        </div>
        <div className="w-fit flex items-center justify-center mb-10 mx-auto mt-5">
          <CTAButton active={true} linkto={"/signup"}>
            Learn More
          </CTAButton>
        </div>
      </div>
    </div>
  );
}
