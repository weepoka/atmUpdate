import Hamburger from "hamburger-react";
import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import { BsSearch } from "react-icons/bs";
import { RxCross2 } from "react-icons/rx";
import { Link, NavLink, useLocation } from "react-router-dom";
import logo from "../../../../../../assets/logo/Logo-01.png";

// import component 👇
import Drawer from "react-modern-drawer";

//import styles 👇
import "react-modern-drawer/dist/index.css";
//redux stroe
import { useNavigate } from "react-router-dom";
import { activeUser } from "../../../../../../Slice/userSlice";
import { useDispatch, useSelector } from "react-redux";

const NavbarLinks = [
  {
    id: 1,
    link: "/",
    title: "Home",
  },
  {
    id: 2,
    link: "/courses",
    title: "Courses",
    subLinks: [
      {
        link: "/courseDetails/IELTS COURSE",
        title: "IELTS COURSE",
      },
      {
        link: "/courseDetails/LEVEL-1",
        title: "LEVEL-1 ",
      },
      {
        link: "/courseDetails/LEVEL-2",
        title: "LEVEL-2",
      },
      {
        link: "/courseDetails/LEVEL-0",
        title: "LEVEL-0 ",
      },
      {
        link: "/courseDetails/PHONETICS ",
        title: "PHONETICS ",
      },
      {
        link: "/courseDetails/FREELANCING",
        title: "FREELANCING",
      },
      {
        link: "/courseDetails/DIGITAL MARKETING",
        title: "DIGITAL MARKETING",
      },
    ],
  },
  {
    id: 3,
    link: "/visa",
    title: "Visa Processing",
  },
  {
    id: 4,
    link: "/study",
    title: "Study Abroad",
    subLinks: [
      {
        link: "/course/countryDetails/UNITED STATES",
        title: "UNITED STATES",
      },
      {
        link: "/course/countryDetails/CANADA",
        title: "CANADA",
      },
      {
        link: "/course/countryDetails/UK",
        title: "UK",
      },
      {
        link: "/course/countryDetails/DENMARK",
        title: "DENMARK",
      },
      {
        link: "/course/countryDetails/AUSTRALIA",
        title: "AUSTRALIA",
      },
      {
        link: "/course/countryDetails/CHAINA",
        title: "CHAINA",
      },
      {
        link: "/course/countryDetails/SOUTH KOREA",
        title: "SOUTH KOREA",
      },
    ],
  },
  {
    id: 5,
    link: "/blog",
    title: "Blog",
  },
  {
    id: 6,
    link: "/contact",
    title: "Contact",
  },
  {
    id: 7,
    link: "/team",
    title: "Team",
  },
  {
    id: 8,
    link: "/team",
    title: "Team",
  },
  {
    id: 9,
    link: "/login",
    title: "Login",
  },
  {
    id: 10,
    link: "/signup",
    title: "Signup",
  },
  {
    id: 11,
    link: "/profile",
    title: "Profile",
  },
  {
    id: 11,
    link: "/appointment",
    title: "Appointment",
  },
  {
    id: 12,
    link: "/about",
    title: "About",
  },
  {
    id: 13,
    link: "*",
    title: "",
  },
];

const Navbar = () => {
  const { pathname } = useLocation();
  const userData = useSelector((state) => state);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  const [Open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [foundResult, setFoundResult] = useState(null);
  const [sublinksOpen, setSublinksOpen] = useState(false);
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const redux = userData?.userInfo?.userInfo?.isEmailVerify
  const red = userData?.userInfo?.userInfo


  // logout
  let logOut = () => {
    localStorage.removeItem("userInfo");
    dispatch(activeUser(null))
    console.log("Sing Out from:", window.location.pathname.split("/")[1]);

    navigate("/");

  }
  //show profile
  const goProfile = () => {
    if (redux && red?.role==="Student") {
      navigate("/profile")
    }


  }
  const toggleSublinks = () => {
    setSublinksOpen(!sublinksOpen);
  };
  const [showModal, setShowModal] = React.useState(false);
  // drawer
  const [isOpen, setIsOpen] = React.useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };
  //##########################search start#########
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
    setFoundResult(null);


  };

  const handleSearchKeyDown = (event) => {
    if (event.key === "Enter") {

      const result = performSearch(searchQuery);
      console.log(result)
      if (result) {

        setFoundResult(result);
        navigate(result.link);
      } else {
        navigate("*")
      }
    }
  };

  const performSearch = (query) => {
    const allLinks = NavbarLinks.reduce((links, section) => {
      if (section.subLinks) {
        return [...links, ...section.subLinks];
      }
      return links;
    }, NavbarLinks);
    const result = allLinks.find(
      (link) =>
        link.link.includes(query.toLowerCase()) ||
        link.title.toLowerCase().includes(query.toLowerCase())
    );

    return result;
  };


  //##########################search end########
  const activeLink =
    "text-[#F90101] font-semibold group  transition duration-300 my-0 ";
  const normalLink =
    "group transition duration-300 my-0 hover:text-[#F90101] border border-dashed px-2";

  console.log(redux)
  return (
    <div className="sticky top-0 z-[9999] navbar border-b-2">
      {" "}
      <nav className="bg-white p-4 relative">
        <div
          className="max-w-screen-2xl  mx-auto flex flex-col lg:flex-row  gap-5
          items-center relative"
        >
          <div className=" ">
            <Link to="/">
              <img src={logo} alt="" className="w-28 xl:w-44" />
            </Link>
          </div>
          <div className="sm:block hidden">
            <div
              // onClick={handleSearchClick}
              className="flex gap-3  relative"
            >
              <input
                className="border-gray-300 border w-full lg:w-32 xl:w-full p-1 px-8  rounded-2xl outline-none"
                type="text"
                placeholder="search"
                value={searchQuery}
                onChange={handleSearchChange}
                onKeyDown={handleSearchKeyDown}
              />
              <Link to={``}>
                <BsSearch
                  className={`absolute left-2 top-2 lg:top-0 mr-3 mt-2 ${searchQuery ? "hidden" : "block"
                    } text-gray-400`}
                  size={20}
                // onClick={handleSearchClick}
                />
              </Link>
              <div className="lg:hidden block">
                {/* <Icon icon="mingcute:user-4-fill" width={30} color="#8C8C8C" /> */}
                <div
                  tabIndex="0"
                  className="group relative inline-block z-[999]"
                >
                  <button className="p-2  text-[16px] text-white focus:outline-none">
                    <Icon
                      icon="mingcute:user-4-fill"
                      width={35}
                      color="#8C8C8C"
                    />
                  </button>
                  <ul
                    className="hidden group-focus-within:block 
                list-none absolute right-0 bg-gray-50 w-40 z-1 shadow-lg animate-slideIn"
                  >
                    <li onClick={goProfile} className="py-3 px-4 cursor-pointer  hover:text-[#F90101]">
                      Profile
                    </li>

                    <li onClick={redux ? logOut : () => navigate("/login")}
                      className="py-3 px-4 cursor-pointer hover:bg-gray-200 hover:text-secondaryRed"
                    >
                      {redux ? "Log Out" : "Log In"}
                    </li>


                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="hidden uppercase   md:flex flex-grow items-center relative  nav-container justify-end space-x-2 xl:space-x-4">
            {NavbarLinks.map((link, i) => (link.id < 7 &&
              (

                <div
                  key={i}
                  // tabIndex="0"
                  className="group relative inline-block z-[999] bg-white"
                >
                  <button className=" text-[16px]  text-black focus:outline-none">
                    <NavLink
                      key={i}
                      to={`${link.link}`}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {" "}
                      {link.title}
                    </NavLink>{" "}
                  </button>
                  {link.subLinks && link.subLinks.length > 0 && (
                    <ul
                      className="hidden group-hover:block 
                    group-focus-within:block list-none 
                    absolute left-0 bg-white w-48 z-1 shadow-lg animate-slideIn"
                    >
                      {link.subLinks.map((el) => {
                        return (
                          <Link
                            to={el.link}
                            key={el.id}
                            onClick={() => setOpen(!open)}
                          >
                            <li className="py-3 px-4 cursor-pointer hover:text-[#F90101] duration-300">
                              {el.title}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </div>
              )
            ))}

            <div className="flex items-center border-l z-[99999]  border-gray-500 pl-4 py-1">
              <button onClick={toggleDrawer}>
                <Icon
                  icon="subway:menu"
                  width={22}
                  className="text-[#F90101] hover:scale-110 duration-500"
                />
              </button>
              <Drawer
                open={isOpen}
                onClose={toggleDrawer}
                direction="right"
                className="z-[]"
              >
                <div className="flex justify-center flex-col items-center z-[99999] py-10 text-[14px]">
                  <div className="flex flex-col gap-5  py-5">
                    <img src={logo} alt="" className="w-32" />
                    <h1 className="">সততার চাদরে মোড়ানো প্রতিষ্ঠান</h1>
                  </div>

                  <ul className="-ml-6">
                    <Link to="/about">
                      {" "}
                      <li className="py-1 hover:text-[#F90101] duration-300 hover:scale-105 hover:translate-x-1">
                        About Atm's Sir
                      </li>
                    </Link>
                    <Link to="/appointment">
                      {" "}
                      <li className="py-1 hover:text-[#F90101] duration-300 hover:scale-105 hover:translate-x-1">
                        Contact With Atm's Sir
                      </li>
                    </Link>
                    <Link to="/team">
                      {" "}
                      <li className="py-1 hover:text-[#F90101] duration-300 hover:scale-105 hover:translate-x-1">
                        Our Team
                      </li>
                    </Link>
                  </ul>

                  <div className="px-8">
                    <h1 className="py-5 text-base text-[#F90101]">
                      Any Query ?
                    </h1>
                    <div className="md:text-start text-center font-normal">
                      <a
                        href="tel:+8801712808193"
                        className="flex items-center 
                      justify-center md:justify-start gap-2 "
                      >
                        <Icon
                          icon="fluent:call-24-filled"
                          width={20}
                          color="red"
                          className="-ml-1"
                        />
                        <span className="duration-300 hover:scale-105 hover:translate-x-1 hover:text-[#F90101]">
                          +8801712-808193
                        </span>
                      </a>
                      <a
                        href="mailto: Info@gmail.com"
                        className="flex capitalize items-center 
                      justify-center md:justify-start gap-2 py-2"
                      >
                        <Icon
                          icon="basil:gmail-outline"
                          width={20}
                          color="red"
                        />
                        <span className="duration-300 hover:scale-105 hover:translate-x-1 hover:text-[#F90101]">
                          {" "}
                          Info@gmail.com
                        </span>
                      </a>{" "}
                      <p className="py-2 capitalize">
                        3rd Floor, House #91, Outer Circular Rd, Mouchak,
                        Dhaka-1217
                      </p>
                    </div>

                    <div className="flex gap-5 py-5 justify-start">
                      <a href="" target="_blank" rel="noopener noreferrer">
                        <Icon
                          icon="ic:baseline-facebook"
                          width={30}
                          className="hover:bg-[#1877F2] text-[#1877F2] hover:text-white rounded-full hover:scale-110 duration-300 hover:p-1"
                        />
                      </a>
                      <a href="" target="_blank" rel="noopener noreferrer">
                        <Icon
                          icon="ri:youtube-fill"
                          width={33}
                          className="hover:bg-[#F90101] text-[#F90101] hover:text-white rounded-full hover:p-1 hover:scale-110 duration-300"
                        />
                      </a>
                    </div>
                    <div></div>
                  </div>
                </div>
              </Drawer>
            </div>
            <div className="hidden lg:block">
              <div tabIndex="0" className="group relative inline-block">
                <button className="py-2 text-[16px] text-white focus:outline-none">
                  <Icon
                    icon="mingcute:user-4-fill"
                    width={35}
                    color="#8C8C8C"
                    className="hover:scale-110 duration-500"
                  />
                </button>
                <ul
                  className="hidden group-focus-within:block 
                list-none absolute right-0 w-40 z-1 shadow-lg animate-slideIn bg-white"
                >
                  <li onClick={goProfile} className="py-3 px-4 cursor-pointer  hover:text-[#F90101]">
                    Profile
                  </li>


                  <li onClick={redux ? logOut : () => navigate("/login")}
                    className="py-3 px-4 cursor-pointer hover:bg-gray-200 hover:text-secondaryRed"
                  >
                    {redux ? "Log Out" : "Log In"}
                  </li>


                </ul>
              </div>
            </div>
          </div>
        </div>
        {/* Mobile hamburger */}
        <div className="block md:hidden py-5 my-3 ">
          <div>
            <div
              className="text-2xl absolute left-5
          top-[80px] sm:top-[92px] cursor-pointer"
            >
              <Hamburger color="#777" toggled={Open} toggle={setOpen} />{" "}
            </div>
            <div
              // onClick={handleSearchClick}
              className="flex absolute right-5 block sm:hidden
                top-[83px]  "
            >
              <div className="flex justify-between gap-10  relative">
                <div onClick={() => setShowModal(true)}>
                  <Link to={``}>
                    <BsSearch
                      className="absolute left-1 top-0 mr-3 mt-2 text-gray-400"
                      size={25}
                    // onClick={handleSearchClick}
                    />
                  </Link>
                </div>
                <div className="lg:hidden block">
                  <div
                    tabIndex="0"
                    className="group relative inline-block z-[999] bg-white"
                  >
                    <button className=" text-[16px] text-white focus:outline-none">
                      <Icon
                        icon="mingcute:user-4-fill"
                        width={35}
                        color="#8C8C8C"
                      />
                    </button>
                    <ul
                      className="hidden group-focus-within:block 
                list-none absolute right-0 bg-white w-40 z-1 shadow-lg animate-slideIn"
                    >
                      <li onClick={goProfile} className="py-3 px-4 cursor-pointer  hover:text-[#F90101]">
                        Profile
                      </li>

                      <li onClick={redux ? logOut : () => navigate("/login")}
                        className="py-3 px-4 cursor-pointer hover:bg-gray-200 hover:text-secondaryRed"
                      >
                        {redux ? "Log Out" : "Log In"}
                      </li>


                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {showModal ? (
          <>
            <div className="justify-center items-center flex overflow-x-hidden px-5 overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="relative w-auto my-6 mx-auto max-w-3xl">
                {/*content*/}
                <div
                  className="border-0 rounded-lg 
                shadow-lg relative flex flex-col w-full
                 bg-white outline-none focus:outline-none"
                >
                  {/*header*/}
                  <div
                    className="flex items-start justify-between 
                   rounded-t"
                  >
                    <button
                      className="p-2 ml-auto bg-transparent border-0
                       text-black  float-right text-3xl leading-none
                        font-semibold outline-none focus:outline-none"
                      onClick={() => setShowModal(false)}
                    >
                      <span
                        className="bg-transparent text-black 
                       h-6 w-6 text-2xl block outline-none focus:outline-none"
                      >
                        <RxCross2 />
                      </span>
                    </button>
                  </div>
                  {/*body*/}
                  <div className="relative p-6 flex-auto">
                    {" "}
                    <div
                      // onClick={handleSearchClick}
                      className="flex gap-3  relative"
                    >
                      <input
                        className="border-gray-200 border   p-1 px-4 rounded-lg outline-none "
                        type="text"
                      // placeholder="Enter any product name..."
                      // value={searchQuery}
                      // onChange={handleSearchChange}
                      // onKeyDown={handleSearchKeyDown}
                      />
                      <Link to={``}>
                        <BsSearch
                          className="absolute right-7 top-0 mr-3 mt-2 text-gray-400"
                          size={20}
                        // onClick={handleSearchClick}
                        />
                      </Link>

                      {/* <div
              className={`absolute   shadow-md overflow-hidden  overflow-y-visible 
              top-10 z-[999999] w-full bg-white`}
            >
              <div>
                {searchQuery && suggestions?.length > 0 && (
                  <ul className="h-[300px]  p-10">
                    {suggestions?.map((item) => (
                      <li key={item?._id} className="my-2 border-b-2">
                        <Link to={`/products/singleProduct/${item?._id}`}>
                          <div className="flex gap-2">
                            <img
                              src={item?.img}
                              alt={item.name}
                              className="w-20"
                            />
                            <div>
                              <div>Name: {item?.name}</div>
                              <div>Category: {item?.category}</div>
                              <div>Price: {item?.price}</div>
                            </div>
                          </div>
                        </Link>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div> */}
                    </div>
                  </div>
                  {/*footer*/}
                  {/* <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                    <button
                      className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Close
                    </button>
                    <button
                      className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                      type="button"
                      onClick={() => setShowModal(false)}
                    >
                      Save Changes
                    </button>
                  </div> */}
                </div>
              </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
          </>
        ) : null}

        {/* Mobile menu */}
        <div
          className={` md:flex md:items-center  md:hidden h-[100vh]  shadow-md md:pb-0 
          pb-2 absolute md:static   bg-white  left-0 z-[99999]
         w-60 md:w-auto  transition-all duration-500 ease-in ${Open ? "left-0 top-[150px] " : "left-[-500px] top-[150px]  "
            } transition-all ease-in-out duration-300 transform `}
        >
          <div className="flex flex-col uppercase items-start gap-6 p-4 ">
            {NavbarLinks.map((link, i) => {
              return (
                <div
                  key={i}
                  // tabIndex="0"
                  className="group relative inline-block  bg-white"
                >
                  <button
                    className=" text-[16px] text-black 
                  focus:outline-none"
                  >
                    <NavLink
                      key={i}
                      to={`${link.link}`}
                      onClick={() => setOpen(!open)}
                      className={({ isActive }) =>
                        isActive ? activeLink : normalLink
                      }
                    >
                      {" "}
                      {link.title}
                    </NavLink>{" "}
                  </button>
                  {link.subLinks && link.subLinks.length > 0 && (
                    <ul
                      className="hidden group-hover:block 
                       group-focus-within:block list-none absolute
                     left-10 z-[9999] bg-white w-40 z-1 shadow-lg
                      animate-slideIn"
                    >
                      {link.subLinks.map((el) => {
                        return (
                          <Link
                            to={el.link}
                            key={el.id}
                            onClick={() => setOpen(!open)}
                          >
                            <li className="py-3 px-4 cursor-pointer hover:text-[#F90101] duration-300">
                              {el.title}
                            </li>
                          </Link>
                        );
                      })}
                    </ul>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
