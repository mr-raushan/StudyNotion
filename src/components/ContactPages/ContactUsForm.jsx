/*eslint-disable*/
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CountryCode from "../../data/countrycode.json";

export default function ContactUsForm() {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm();

  const submitContactForm = async (data) => {};

  useEffect(() => {
    if (isSubmitSuccessful) {
      reset({
        firstname: "",
        lastname: "",
        email: "",
        message: "",
        phoneNo: "",
      });
    }
  }, [reset, isSubmitSuccessful]);

  return (
    <form onSubmit={handleSubmit(submitContactForm)}>
      <div>
        {/* firstname  */}
        <div className="flex gap-4 w-full">
          <div className="flex flex-col w-[50%]">
            <label htmlFor="firstname">First Name</label>
            <input
              type="text"
              id="firstname"
              name="firstname"
              placeholder="Enter First Name"
              {...register("firstname", { required: true })}
              className="p-2 outline-none rounded-md my-2 text-black "
            />
            {errors.firstname && <span>Please enter your First Name</span>}
          </div>
          {/* last name  */}
          <div className="flex flex-col w-[50%]">
            <label htmlFor="lastname">Last Name</label>
            <input
              type="text"
              id="lastname"
              name="lastname"
              placeholder="Enter Last Name"
              {...register("lastname")}
              className="p-2 outline-none rounded-md my-2 text-black "
            />
          </div>
        </div>
        <div className="flex flex-col">
          <label htmlFor="email">Email Address</label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter Email Address"
            {...register("email", { required: true })}
            className="p-2 outline-none rounded-md  my-2 text-black "
          />
          {errors.email && <span>Please Enter Your Email Address</span>}
        </div>

        <div className="flex flex-col ">
          <label htmlFor="phonenumber">Phone Number</label>
          <div className="flex flex-row gap-5">
            <div className="flex gap-4 w-[25%] bg-richblack-800">
              <select
                className="bg-richblack-800 p-2 rounded-md w-full"
                name="dropdown"
                id="dropdown"
                {...register("contrycode", { required: true })}
              >
                {CountryCode.map((elem, index) => {
                  return (
                    <option key={index} value={elem.code}>
                      {elem.code} - {elem.country}
                    </option>
                  );
                })}
              </select>
            </div>
            <div className="w-[80%]">
              <input
                type="number"
                id="phoneNo"
                name="phoneNo"
                placeholder="12345 67890"
                {...register("phoneNo", {
                  required: true,
                  message: "Please enter your phone number",
                  maxLength: {
                    value: 10,
                    message: "Phone number should be 10 digits long",
                  },
                  minLength: { value: 8, message: "Invalid phone number" },
                })}
                className=" outline-none my-2 text-black w-full rounded-md p-2"
              />
              {errors.phoneNo && <span>{errors.phoneNo.message}</span>}
            </div>
          </div>

          <div className="flex flex-col">
            <label htmlFor="message">Message</label>
            <textarea
              name="message"
              id="message"
              cols="30"
              rows="7"
              placeholder="Enter Your Message"
              {...register("message", { required: true })}
              className="p-2 outline-none rounded-md  my-2 text-black "
            />

            {errors.message && <span>Please Enter Your Message</span>}
          </div>
        </div>

        <button
          type="submit"
          className="bg-yellow-50 text-black rounded-md py-2 mt-3 px-10 font-semibold text-[16px] w-full hover:scale-100 transition-all duration-200 ease-in-out"
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
