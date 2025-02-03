import Template from "../components/core/Auth/Template";
import signupImg from "../assets/Images/signup.webp";
export default function Signup() {
  return (
    <Template
      title="Join the millions learning to code with StudyNotion for free"
      description1="Build skills for today, tommorrow, and beyond."
      description2="Education to future-proof your carrer"
      image={signupImg}
      formType="signup"
    />
  );
}
