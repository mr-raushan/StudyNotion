import { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { ACCOUNT_TYPE } from "../../../utils/constants";
import Tab from "../../common/Tab";
// import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignUpData } from "../../../slices/authSlices";

export default function SignUpForm() {
  //   const navigate = useNavigate();
  const dispatch = useDispatch();
  //student or instructor
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setShowConfirmPassword] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(formData);

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    const signupData = {
      ...formData,
      accountType,
    };

    //setting signup data to state
    //to be used after otp verification
    dispatch(setSignUpData(signupData));

    //send otp to user for verification
    // dispatch(sendOtp(formData.email, navigate))

    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setAccountType(ACCOUNT_TYPE.STUDENT);
  };

  //data to pass to tab component
  const tabData = [
    {
      id: 1,
      tabName: "Students",
      type: ACCOUNT_TYPE.STUDENT,
    },
    {
      id: 2,
      tabName: "Instructor",
      type: ACCOUNT_TYPE.INSTRUCTOR,
    },
  ];

  return (
    <div>
      {/* Tab component  */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType} />
      {/* form  */}
      <form
        onSubmit={handleOnSubmit}
        className="text-richblack-5 flex w-full flex-col gap-y-4"
      >
        <div className="flex gap-x-4">
          <label className="w-[50%]">
            <p className="mb-1 text-[0.875rem] leading-3-[1.375rem] text-richblack-5">
              First Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="firstName"
              value={firstName}
              onChange={handleOnChange}
              placeholder="Enter First Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
          <label className="w-[50%]">
            <p className="mb-1 text-[0.875rem] leading-3-[1.375rem] text-richblack-5">
              Last Name <sup className="text-pink-200">*</sup>
            </p>
            <input
              type="text"
              required
              name="lastName"
              value={lastName}
              onChange={handleOnChange}
              placeholder="Enter Last Name"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
          </label>
        </div>
        <label>
          <p className="mb-1 text-[0.875rem] leading-3-[1.375rem] text-richblack-5">
            Email Address <sup className="text-pink-200">*</sup>
          </p>
          <input
            type="email"
            required
            name="email"
            value={email}
            onChange={handleOnChange}
            placeholder="Enter Email Address"
            style={{
              boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
            }}
            className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
          />
        </label>
        <div className="flex gap-x-4 ">
          <label className="relative w-[50%]">
            <p className="mb-1 text-[0.875rem] leading-3-[1.375rem] text-richblack-5">
              Create Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showPassword ? "text" : "password"}
              required
              name="password"
              value={password}
              onChange={handleOnChange}
              placeholder="Create Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowPassword((prev) => !prev)}
              className="absolute right-2 top-[30px] z-[10] cursor-pointer"
            >
              {showPassword ? (
                <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
              ) : (
                <AiOutlineEye fontSize={24} fill="#AFB2BF" />
              )}
            </span>
          </label>
          <label className="relative w-[50%]">
            <p className="mb-1 text-[0.875rem] leading-3-[1.375rem] text-richblack-5">
              Confirm Password <sup className="text-pink-200">*</sup>
            </p>
            <input
              type={showconfirmPassword ? "text" : "password"}
              required
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleOnChange}
              placeholder="Confirm Password"
              style={{
                boxShadow: "inset 0px -1px 0px rgba(255,255,255,0.18)",
              }}
              className="w-full rounded-[0.5rem] bg-richblack-800 p-[12px] text-richblack-5"
            />
            <span
              onClick={() => setShowConfirmPassword((prev) => !prev)}
              className="absolute text-richblack-5 top-[30px] right-2 z-[10] cursor-pointer"
            >
              {showconfirmPassword ? (
                <AiOutlineEyeInvisible
                  fontSize={24}
                  fill="#AFB2BF"
                  className="text-richblack-5"
                />
              ) : (
                <AiOutlineEye
                  fontSize={24}
                  fill="AFB2BF"
                  className="text-richblack-5"
                />
              )}
            </span>
          </label>
        </div>
        <button
          type="submit"
          className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900  "
        >
          Create Account
        </button>
      </form>
    </div>
  );
}
