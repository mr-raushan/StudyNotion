import CTAButton from "../HomePage/CTAButton";
import HighlightText from "../HomePage/HighlightText";

const LearningGridArray = [
  {
    order: -1,
    heading: "World-Class Learning for",
    highlightText: "Anyone, anywhere",
    description:
      "StudyNotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to inidividuals and organizations worldwide.",
    BtnText: "Learn More",
    BtnLink: "/",
  },
  {
    order: 1,
    heading:
      "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs..",
  },
  {
    order: 2,
    heading: "Our learning Methods",
    description: "The learning process uses the namely online and offline.",
  },
  {
    order: 3,
    heading: "Certification",
    description:
      "You will get a certificate that can be used as a certification during job hunting.",
  },
  {
    order: 4,
    heading: "Rating Auto-grading",
    description:
      "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
  },
  {
    order: 5,
    heading: "Ready to Work",
    description:
      "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
  },
];

export default function LearningGrid() {
  return (
    <div className="grid mx-auto mb-20 grid-cols-1 mt-10 md:grid-cols-4 lg:grid-cols-4">
      {LearningGridArray.map((card, index) => {
        return (
          <div
            key={index}
            className={` ${index === 0 && "md:col-span-2 md:h-[200px]"}
            ${
              card.order % 2 === 1
                ? "bg-richblack-700"
                : "bg-richblack-800 md:h-[200px]"
            }
            ${card.order === 3 && "md:col-start-2"}
            ${card.order < 0 && "bg-transparent"}
            `}
          >
            {card.order < 0 ? (
              <div>
                <div className="text-4xl font-semibold flex flex-col pb-5 gap-3">
                  <p className="">{card.heading}</p>
                  <HighlightText text={card.highlightText} />
                </div>
                <p className="text-base font-medium">{card.description}</p>
                <div className="w-fit mt-2">
                  <CTAButton active={true} linkto={card.BtnLink}>
                    {card.BtnText}
                  </CTAButton>
                </div>
              </div>
            ) : (
              <div className="p-4 flex flex-col gap-5">
                <h1>{card.heading}</h1>
                <p>{card.description}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
