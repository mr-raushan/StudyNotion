import { useState } from "react";
import { AiFillEyeInvisible, AiOutlineEye } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleonSubmit = (e) => {
    e.preventDefault();
    // handle form submission logic here
    dispatch(email, password, navigate);

    setFormData({
      email: "",
      password: "",
    });
  };

  return (
    <div className="mt-4">
      <form onSubmit={handleonSubmit}>
        <label className="">
          <p>
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter email address"
            required
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] my-2 bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <label className="relative">
          <p>
            Password <sup className="text-pink-200">*</sup>
          </p>
          <input
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Enter password"
            required
            value={password}
            onChange={handleOnChange}
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] my-2 bg-richblack-800 p-[12px] text-richblack-5"
          />
          <span
            onClick={() => setShowPassword((prev) => !prev)}
            className="absolute right-3 top-[65px] z-[10] cursor-pointer"
          >
            {showPassword ? (
              <AiFillEyeInvisible fontSize={24} fill="#AFB2BF" />
            ) : (
              <AiOutlineEye fontSize={24} fill="#AFB2BF" />
            )}
          </span>
        </label>
        <button
          type="submit"
          className="mt-6 w-full rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900  "
        >
          Log In
        </button>
      </form>
    </div>
  );
}
