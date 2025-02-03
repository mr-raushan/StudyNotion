/*eslint-disable*/
import { NavbarLinks } from "../../data/navbar-links";
import logo from "../../assets/Logo/Logo-Full-Light.png";
import { Link, matchPath } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { useEffect, useState } from "react";
import { apiConnector } from "../../services/apiConnector";
import { categories } from "../../services/apis";
import { IoIosArrowDown } from "react-icons/io";

const subLinks = [
  {
    title: "Python",
    link: "/catalog/python",
  },
  {
    title: "Web Dev",
    link: "/catalog/web-development",
  },
];

export default function Navbar() {
  const { token } = useSelector((state) => state.auth);
  const { user } = useSelector((state) => state.profile);
  const { totalItems } = useSelector((state) => state.cart);

  const [ssubLinks, setSsubLinks] = useState([]);

  const fetchSubLinks = async () => {
    try {
      const result = await apiConnector("GET", categories.CATEGORIES_API);
      console.log("printing sublinks result", result);
      setSsubLinks(result.data.data);
    } catch (error) {
      console.log("Could not fetch catalog links");
      console.error(error);
    }
  };

  useEffect(() => {
    fetchSubLinks();
  }, []);

  const location = useLocation();
  const matchRoute = (route) => {
    return matchPath({ path: route }, location.pathname);
  };

  return (
    <div className="flex items-center h-14 justify-center border-b-[1px] border-b-richblack-700">
      <div className="w-11/12 flex max-w-maxContent items-center justify-between">
        <Link to={"/"}>
          <img src={logo} width={160} height={42} loading="lazy" />
        </Link>
        <nav>
          <ul className="flex gap-x-6 items-center">
            {NavbarLinks.map((link, index) => {
              return (
                <li key={index}>
                  {link.title === "Catalog" ? (
                    <div className="relative flex items-center gap-2 group">
                      <p className="text-richblack-400 hover:cursor-pointer">
                        {link?.title}
                      </p>
                      <IoIosArrowDown className="text-richblack-400 font-bold" />

                      <div
                        className="invisible absolute
                       left-[50%] top-[50%] flex flex-col rounded-md
                       translate-x-[-50%] translate-y-[80%]
                        transition-all opacity-0 duration-200 p-4 bg-richblack-5 text-richblack-900 group-hover:visible group-hover:opacity-100 lg:w-[200px]"
                      >
                        <div className="absolute left-[50%] top-0 rounded rotate-45 bg-richblack-5 h-6 w-6 translate-x-[80%] translate-y-[-50%]"></div>

                        {subLinks.length ? (
                          <div>
                            {subLinks.map((link, index) => (
                              <Link to={`${link.link}`} key={index}>
                                <p>{link.title}</p>
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <div></div>
                        )}
                      </div>
                    </div>
                  ) : (
                    <div
                      className={`${
                        matchRoute(link?.path)
                          ? "text-yellow-25"
                          : "text-richblack-400"
                      }`}
                    >
                      <Link to={link?.path}>{link?.title}</Link>
                    </div>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>
        <div className="flex items-center gap-4">
          {user && user?.accountType != "Instructor" && (
            <Link to="/dashboard/cart" className="relative">
              <AiOutlineShoppingCart />
              {totalItems > 0 && (
                <span className="absolute top-0 left-0 text-2xl text-white bg-caribbeangreen-500 p-2 rounded-full">
                  {totalItems}
                </span>
              )}
            </Link>
          )}

          {token === null && (
            <Link to="/login">
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md transition-all duration-200 ease-in-out text-richblack-100 hover:bg-richblack-900">
                Log in
              </button>
            </Link>
          )}

          {token === null && (
            <Link to={"/signup"}>
              <button className="border border-richblack-700 bg-richblack-800 px-[12px] py-[8px] rounded-md transition-all duration-200 ease-in-out text-richblack-100 hover:bg-richblack-900">
                Sign up
              </button>
            </Link>
          )}

          {token !== null && <ProfileDropDown />}
        </div>
      </div>
    </div>
  );
}
