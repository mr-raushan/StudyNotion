import LoginImg from "../assets/Images/login.webp";
import Template from "../components/core/Auth/Template";

export default function Login() {
  return (
    <Template
      title="Welcome Back"
      description1="Build skills for today, tommorrow, and beyond."
      description2="Education to future-proof your carrer."
      image={LoginImg}
      formType="Login"
    />
  );
}
