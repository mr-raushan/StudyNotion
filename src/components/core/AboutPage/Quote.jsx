import HighlightText from "../HomePage/HighlightText";

export default function Quote() {
  return (
    <div className="text-4xl font-semibold text-center mt-10">
      We are passionate about revolutionizing the way we learn. Our innovative
      platform
      <HighlightText text="combines technology," />
      <span className="text-caribbeangreen-400">expertise,</span>
      and community to create an unparalleled educational experience.
    </div>
  );
}
