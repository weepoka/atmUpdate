import React, { useRef, useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { course } from "../../FakeApi/Course";
import { Icon } from "@iconify/react";
import Api from "../../Axios/Api";
import { Countries } from "../../FakeApi/Country";
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { TbCurrencyTaka } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { activeUser } from "../../../../Slice/userSlice"
import { useDispatch, useSelector } from "react-redux";

const Courses = () => {
  // console.log(course);
  const sliderRef = useRef(null);
  const sliderRef1 = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [currentSlide1, setCurrentSlide1] = useState(0);


  const [isLeftCourseOver, setisLeftCourseOver] = useState(true);
  const [isRightCourseOver, setisRightCourseOver] = useState(true);
  const userData = useSelector((state) => state);
  const navigate = useNavigate();
  const redux = userData?.userInfo?.userInfo?.isEmailVerify
  const rxInf = userData?.userInfo?.userInfo

  const handleLeftCourseEnter = () => {
    setisLeftCourseOver(false);
  };
  const handleRightCourseEnter = () => {
    setisRightCourseOver(false);
  };

  const handleLeftCourseLeave = () => {
    setisLeftCourseOver(true);
  };
  const handleRightCourseLeave = () => {
    setisRightCourseOver(true);
  };

  var countrySettings = {
    dots: false,
    infinite: true,

    speed: 2000,

    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
    beforeChange: (current, next) => {
      setCurrentSlide1(next);
    },
    responsive: [
      {
        breakpoint: 1224,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleClickNext1 = () => {
    sliderRef1.current.slickNext();
  };
  const handleClickPrev1 = () => {
    sliderRef1.current.slickPrev();
  };


  // fetch data
  const [kur, setKur] = useState([""])
  const getCourse = async () => {
    try {
      const res = await Api.get("/atms/api/v1/course")
      if (res.data.data) {
        setKur(res.data.data)

      }
    } catch (err) {
      console.log(err.message)
    }
  }
  useEffect(() => {
    getCourse()
  }, [])
  console.log(kur)
  // all uni versity
  const [uni, setUni] = useState([""])
  const studyAbroad = async () => {
    try {
      const res = await Api.get("/atms/api/v1/admin/study-abroad/all-university")
      setUni(res.data.data)
    } catch (err) {
      console.log(err.cdoe)
    }

  }
  useEffect(() => {
    studyAbroad()
  }, [])


  const [selectedItemId, setSelectedItemId] = useState(null);
  const [show, setShow] = useState(false);
  const [cours, setCourse] = useState("");

  const confirmF = (itemId, name) => {
    console.log(itemId, name)
    setCourse(name)
    setSelectedItemId(itemId);
    setShow(true);
  }

  const saetBook = async (course) => {
    console.log(course)
    if (!redux) {
      navigate("/login")
    }

    try {
      const res = await Api.post("/atms/api/v1/booking", {
        stdId: rxInf?._id,
        reg: rxInf?.regiNumber,
        amount: "500",
        name: rxInf?.name,
        email: rxInf?.email,
        course: cours,

        mobile: rxInf?.mobile,

      })
      window.open(res.data.url, "_blank");
    } catch (err) {
      console.log(err.stack)
    }
  }
  return (
    <div className=" ">
      <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px] courses">
        Our Courses
      </h1>
      <div className="max-w-screen-2xl mx-auto py-10">
        <div
          data-aos="fade-down"
          data-aos-offset="100"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="text-center px-5"
        >
          <h6 className="text-[18px] md:text-[24px] pb-2">
            Better Learning. Better Results
          </h6>

          <p className="text-[18px]  text-justify ">
            Accusamus et iusidio dignissimos ducimus blanditiis praesentium{" "}
            voluptatum deleniti atque corrupti quos dolores etmquasa molestias{" "}
            <br />
            epturi sint occaecati cupiditate non providente mikume.
          </p>
        </div>
        <div
          data-aos="fade-up"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="flex justify-center pt-10"
        >
          {" "}
          <Modal />
        </div>
      </div>

      <div
        className="bg-gradient-to-r 
                       from-[#465286]  to-[#141726] md:py-10"
      >
        <div
          className="
         relative  max-w-screen-2xl mx-auto cursor-pointer"
        >
          <div
            className=" overflow-hidden opacity-1 
            rounded grid grid-cols-1 sm:grid-cols-2
           lg:grid-cols-3  gap-5 mx-3 xl:mx-0"
          >
            {kur?.map((item, index) => (
              <div
                // data-aos="fade-down"
                // data-aos-delay="50"
                // data-aos-duration="1000"
                // data-aos-easing="ease-in-out"
                // data-aos-once="false"
                // data-aos-anchor-placement="top-center"
                key={index}
                className="   
                   bg-white shadow-md relative"
              >
                <div>
                  <div className="">
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                      alt=""
                      className="object-cover h-72 w-full"
                    />



                  </div>
                  <div className="px-8">
                    <div className="pb-12 pt-5 ">
                      <Link to={`/courseDetails/${item?.title}`}>
                        <h1
                          className="md:text-[25px] text-[20px] pb-2 text-DarkNevy 
                    font-bold uppercase "
                        >
                          {item?.title}
                        </h1>
                      </Link>
                      <div className="flex justify-between pt-5">
                        <h1 className="  flex item?s-center text-[15px]  ">
                          Online Fee : <TbCurrencyTaka />
                          {/* {item?.offlineFee?.map((course) => (   ))} */}
                          <>
                            <span className="font-bold">
                              {item?.offlineFee?.courseFee} TK.
                            </span>
                          </>

                        </h1>
                        {item?.offline ? (
                          <h1 className=" flex item?s-center   ">
                            Offline Fee : <TbCurrencyTaka />
                            {/* {item?.offlineFee?.map((course) => ( ))} */}
                            <>
                              <span className="font-bold">
                                {item?.offlineFee?.courseFee} TK.
                              </span>
                            </>

                          </h1>
                        ) : (
                          <div>
                            <h1 className="text-[15px]">
                              Offline Course is not available
                            </h1>
                          </div>
                        )}
                      </div>

                    </div>
                    <div className="pb-5  ">
                      <div className=" flex gap-5 justify-around">
                        <Link to={`/courseDetails/${item?.title}`}>
                          <button className=" bg-DarkNevy px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                            <span className="relative z-10">Admission Now</span>
                          </button>
                        </Link>

                        <button onClick={() => confirmF(item._id, item.title)} className="bg-red-300 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                          <span className="relative z-10">Seat Booking </span>
                        </button>

                      </div>
                    </div>
                  </div>
                </div>

                {show && selectedItemId === item._id &&
                  <>

                    <div className=" absolute inset-0 bg-black/50 "></div>
                    <div className=" right-0 left-0 top-40 bottom-0  absolute   z-50 justify-center items-center w-full  ">
                      <div className="relative p-4 w-full max-w-md max-h-full">
                        <div className="relative bg-white rounded-lg shadow w-full dark:bg-gray-700">

                          <div className="p-4 md:p-5 w-full text-center">

                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Are you sure you want to Book this course?</h3>
                            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Booking Fee 500tk</h3>
                            <button onClick={() => saetBook(item)} data-modal-hide="popup-modal" type="button" className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center me-2">
                              Yes, I'm sure
                            </button>
                            <button onClick={() => setShow(false)} data-modal-hide="popup-modal" type="button" className="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
                          </div>
                        </div>
                      </div>
                    </div>

                  </>
                }
              </div>
            ))}
          </div>
        </div>
      </div>
      <div
        data-aos="fade-down"
        data-aos-delay="50"
        data-aos-duration="1000"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="max-w-screen-2xl mx-auto pb-10"
      >
        <div className="py-20 text-center">
          <h1 className="text-DarkNevy font-bold md:text-[34px] text-[24px] py-2">
            স্বপ্ন এখন হাতের মুঠোই
          </h1>
          <p className=" md:text-[20px] text-[16px] px-5 py-2">
            {" "}
            এখান থেকে IELTS -এ ভালো Score করে পছন্দের দেশের ভার্সিটিতে Apply করো
            এখনই ।
          </p>
        </div>
        <div className="">
          <div className=" overflow-hidden opacity-1 relative bg-white">
            <Slider
              {...countrySettings}
              className="md:px-20 px-2 relative overflow-hidden"
              ref={sliderRef1}
            >
              {uni?.map((item, index) => (
                <div key={index} className="border  rounded-xl p-5">
                  <div className="group">
                    <div className="overflow-hidden">
                      <img
                        src={`${Api.defaults.baseURL}/uploads/${item?.urlOne}`}
                        alt=""
                        className="rounded group-hover:scale-105 group-hover:duration-300 duration-300"
                      />
                    </div>
                    <div className="py-4">
                      <h1 className="text-center font-bold md:text-[24px] text-[20px]">
                        {item?.country}
                      </h1>
                      <p className="text-justify py-4 px-5">{item?.countryDetail}</p>
                    </div>

                    <div className="text-center">
                      <Link to={`/course/countryDetails/${item?.country}`}>
                        <button className="bg-DarkNevy px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                          <span className="relative z-10">Learn More</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>

            <div
              className="absolute bg[#2b3252] bg-gray-100 md:block hidden 
              w-[50px] overflow-hidden h-[50px] rounded-full  cursor-pointer
                    right-[0%] top-[30%]
                    opacity-1  text-[#2B3252] "
              onClick={handleClickNext1}
            >
              <Icon
                icon="mingcute:arrow-right-fill"
                width={36}
                className={`absolute top-2 right-2 text-[#505050] hover:translate-x-1 hover:text-[#F90101] hover:duration-300 duration-300 icon2 ${isRightCourseOver ? "animate2 duration-300" : ""
                  }`}
                onMouseEnter={handleRightCourseEnter}
                onMouseLeave={handleRightCourseLeave}
              />
            </div>
            <div
              className="absolute bg[#2b3252] bg-gray-100 md:block hidden
              w-[50px] overflow-hidden h-[50px] rounded-full  cursor-pointer
              left-[0%] top-[30%]
              opacity-1  text-[#2B3252]"
              onClick={handleClickPrev1}
            >
              <Icon
                icon="mingcute:arrow-left-fill"
                width={36}
                className={`absolute top-2 left-2 hover:-translate-x-1 hover:duration-300 duration-300  text-[#505050]  hover:text-[#F90101] icon ${isLeftCourseOver ? "animate" : ""
                  }`}
                onMouseEnter={handleLeftCourseEnter}
                onMouseLeave={handleLeftCourseLeave}
              />
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};

export default Courses;
