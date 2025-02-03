import Logo1 from "../../../assets/TimeLineLogo/Logo1.svg";
import Logo2 from "../../../assets/TimeLineLogo/Logo2.svg";
import Logo3 from "../../../assets/TimeLineLogo/Logo3.svg";
import Logo4 from "../../../assets/TimeLineLogo/Logo4.svg";
import timelineImage from "../../../assets/Images/TimelineImage.png";

const timeline = [
  {
    id: 1,
    logo: Logo1,
    heading: "Leadership",
    Description: "Fully committed to the success company",
  },
  {
    id: 2,
    logo: Logo2,
    heading: "Responsibility",
    Description: "Student will always be our top priority",
  },
  {
    id: 3,
    logo: Logo3,
    heading: "Flexibility",
    Description: "The ability to switch is an important skills",
  },
  {
    id: 4,
    logo: Logo4,
    heading: "Solve the problem",
    Description: "Code your way to a solution",
  },
];

export default function TimelineSection() {
  return (
    <div className="flex flex-col md:flex-row lg:flex-row">
      <div className="flex flex-col md:flex-row md:w-11/12 max-w-maxContent lg:flex-row gap-20 mt-10 items-center ">
        <div className="w-[100%] md:w-[45%] lg:w-[50%] gap-4">
          {timeline.map((item) => {
            return (
              <div key={item.id} className="flex flex-row gap-10">
                <div className="w-[50px] h-[50px] rounded-full bg-white flex justify-center shadow-[#00000012] shadow-[0_0_62px_0] items-center ">
                  <img src={item.logo} />
                </div>

                <div className="flex flex-col md:flex-col lg:flex-col py-5 ">
                  <h2 className="text-[18px] font-semibold">{item.heading}</h2>
                  <p className="text-base">{item.Description}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className="relative mt-10">
          <img
            src={timelineImage}
            alt="timelineimage"
            className="rounded-md shadow-blue-200 shadow-[5px_-5px_20px_-5px] object-cover h-[400px]"
          />

          <div className=" left-[50%]  translate-y-[-50%] rounded-lg bg-caribbeangreen-600 py-10 w-[50%] h-[50px] md:w-[80%] lg:w-[80%] pl-10 text-lg  uppercase flex items-center gap-20 mx-auto">
            <div className="pl-0 flex items-center gap-2 md:flex-row md:gap-10 lg:gap-10">
              <p className="font-bold text-white text-3xl">10</p>
              <div className="flex flex-col gap-4 text-caribbeangreen-50 text-sm">
                years experience
              </div>
            </div>
            <div className="hidden md:block border h-16 border-caribbeangreen-50 "></div>
            <div className=" hidden md:flex flex-col justify-between  lg:flex">
              <p className=" font-bold text-white text-3xl">250</p>
              <div className=" text-caribbeangreen-50 text-sm">
                <p>Types of</p>
                <p>courses</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
