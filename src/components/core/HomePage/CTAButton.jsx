/*eslint-disable*/
import { Link } from "react-router-dom";

export default function CTAButton({ children, linkto, active }) {
  return (
    <Link to={linkto}>
      <div
        className={`text-center text-[13px] px-6 py-3 rounded-md font-bold transition-all duration-200 ease-in-out
        ${active ? "bg-yellow-50 text-black" : "bg-richblack-800"}
        hover:scale-95
        `}
      >
        {children}
      </div>
    </Link>
  );
}
