import React, { useEffect, useRef, useState } from "react";
import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import { appointments } from "../../FakeApi/Appointment";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Api from "../../Axios/Api";
const Appointment = () => {

  const userData = useSelector((state) => state);
  const navigate = useNavigate()
  const redux = userData?.userInfo?.userInfo?.isEmailVerify
  const uid = userData?.userInfo?.userInfo?._id

  const [startDate, setStartDate] = useState(new Date());
  const [show, setShow] = useState(true);
  console.log(startDate);

  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    responsive: [
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
  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  //navigate 
  const goLog = () => {
    navigate("/login")
  }

  // data send database 
  let [formData, setData] = useState({
    email: userData?.userInfo?.userInfo?.email,

    firstName: "",
    lastName: "",
    address: "",
    mobile: "",
    reasonForVisit: "",
    isFirstVisit: "",
    visitingDate: startDate,
    visitingTime: "4:00 PM To 8:00 PM",
    uid: uid
  });
  const handelChange = (e) => {
    let { name, value } = e.target;
    setData({ ...formData, [name]: value });


  }

  const handleSend = async () => {

    hasVisited()

    try {
      await Api.post("/atms/api/v1/appointment", formData)

    } catch (err) {
      console.log(err.message)
    }
  }

  //  get data visited 

  const hasVisited = async () => {
    try {
      const res = await Api.post("/atms/api/v1/visited", { uid });
      if (res.data.data === "Yes") {
        setShow(false);
        console.log(res.data.data);
      } else {
        setShow(true);
      }
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    hasVisited();
  }, []);

  return (
    <div className="bg-gray-100 appointment">
      <div className="max-w-screen-2xl mx-auto ">
        <div>
          <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
            <div className="bg-white text-gray-500 rounded-3xl shadow-xl w-full  overflow-hidden">
              <div className="md:flex w-full grid grid-cols-2 gap-5">
                <div className="hidden md:block md:w-[50%] bg-white py-10 px-10 relative ">
                  <Slider ref={sliderRef} {...settings}>
                    {appointments.map((item) => (
                      <div key={item?.id} className=" relative">
                        <img src={item.url} alt="" className=" " />
                        <div className="absolute inset-0 bg-black opacity-50"></div>
                        <div className="absolute top-1/2 flex flex-col justify-center items-center ">
                          <h1 className="text-xl text-white">
                            ATM Mahmud(ATM Sir){" "}
                          </h1>
                          <h2 className="text-gray-300">Career Specialist</h2>
                          <p className="text-center px-20 py-5 text-gray-300">
                            Lorem ipsum dolor sit amet consectetur adipisicing
                            elit. Ullam similique dolores ratione explicabo
                            aliquam dicta delectus! Blanditiis est incidunt
                            soluta!
                          </p>
                        </div>
                      </div>
                    ))}
                  </Slider>
                  <div className="flex justify-center  mt-2 cursor-pointer  absolute bottom-20 left-0 right-0 ">
                    {appointments.map((_, index) => (
                      <div
                        key={index}
                        className={`w-4 h-4 mx-2 rounded-full ${currentSlide === index ? "bg-red-600" : "bg-gray-300"
                          }`}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full col-span-2 md:col-span-1 md:w-1/2 py-10 px-5 md:px-10">
                  <div className="text-center mb-10">
                    {show ?
                      <h1 className="font-bold text-xl xl:text-3xl text-red-600 uppercase">
                        {redux ? "Book an Appointment" : <span className="cursor-pointer" onClick={goLog}>Kindly sign up first click here</span>}
                      </h1> : <h1 className="font-bold text-xl xl:text-3xl text-red-600 uppercase">Booking request sent </h1>}
                  </div>
                  <div className="text-gray-600">
                    <div className="flex -mx-3 ">
                      <div className="w-1/2 px-3 mb-5">
                        <label className="text-md mb-2  font-semibold px-1">
                          First Name :
                        </label>
                        <div className="flex pt-1">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <Icon icon="mdi:user" width={25} />
                          </div>
                          <input
                            type="text"
                            name="firstName"
                            onChange={handelChange}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 
                                outline-none focus:border-red-600"
                            placeholder="John"
                          />
                        </div>
                      </div>

                      <div className="w-1/2 px-3 mb-5">
                        <label className="text-md mb-2 font-semibold px-1">
                          Last Name:
                        </label>
                        <div className="flex pt-1">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <Icon icon="mdi:user" width={25} />
                          </div>
                          <input
                            onChange={handelChange}
                            name="lastName"
                            type="text"
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200
                                 outline-none focus:border-red-600"
                            placeholder="Smith"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-md mb-2 font-semibold px-1">
                          Your Phone Number
                        </label>
                        <div className="flex pt-1">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <Icon icon="ic:baseline-phone" width={25} />
                          </div>
                          <input
                            type="tel"
                            name="mobile"
                            onChange={handelChange}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2
                                 border-gray-200 outline-none focus:border-red-600"
                            placeholder="phone number"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-md mb-2 font-semibold px-1">
                          Your Present Address:
                        </label>
                        <div className="flex pt-1">
                          <div className="w-10 z-10 pl-1 text-center pointer-events-none flex items-center justify-center">
                            <Icon icon="mdi:address-marker" width={25} />
                          </div>
                          <input
                            type="text"
                            name="address"
                            onChange={handelChange}
                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2
                                 border-gray-200 outline-none focus:border-red-600"
                            placeholder="Your address"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-md mb-2 font-semibold px-1">
                          Reason For Visit:
                        </label>
                        <div className="flex pt-1">
                          <div
                            className="w-10 z-10 pl-1 text-center
                           pointer-events-none flex items-center justify-center"
                          ></div>

                          <select

                            onChange={handelChange}
                            name="reasonForVisit"

                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2
                                 border-gray-200 outline-none focus:border-red-600"
                            placeholder="Reason"
                          >
                            <option value="IELTS">IELTS</option>
                            <option value="Visa">Visa</option>
                            <option value="Spoken">Spoken</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className="flex -mx-3">
                      <div className="w-full px-3 mb-5">
                        <label className="text-md mb-3 font-semibold px-1">
                          Is this your first visit?
                        </label>
                        <div className="flex pt-1 items-center">
                          <input
                            type="checkbox"
                            name="isFirstVisit"
                            value="Yes"
                            onChange={handelChange}
                            className="pl-2 pr-3 rounded-lg border-2 border-gray-200
                   outline-none focus:border-red-600 w-4 h-4"
                          />
                          <label className="text-md px-1 font-semibold">Yes</label>
                          <input
                            type="checkbox"
                            name="isFirstVisit"
                            value="No"
                            onChange={handelChange}
                            className="pl-2 pr-3 py-2 rounded-lg border-2 border-gray-200
                   outline-none focus:border-red-600 w-4 h-4"
                          />
                          <label className="text-md font-semibold px-1">No</label>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col md:flex-row -mx-3">
                      <div className="w-1/2 px-3 mb-5">
                        <label className="text-md mb-2 font-semibold px-1">
                          Date
                        </label>
                        <div
                          className="w-10 z-10 pl-1 text-center 
                        pointer-events-none flex items-center justify-center"
                        >
                          {/* <Icon icon="bi:calendar-date-fill" /> */}
                        </div>

                        <DatePicker
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          isClearable
                          showIcon
                          placeholderText=" cleared!"
                          dateFormat="yyyy/MM/dd"
                          className=" md:w-48  h-11 rounded-lg border-2 border-gray-200"
                        />
                      </div>
                      <div className="md:w-1/2 w-full  px-3 mb-10">
                        <label className="text-md mb-2 font-semibold px-1">
                          Time
                        </label>
                        <div className="flex">
                          <div
                            className="w-10 z-10 pl-1 text-center 
                          pointer-events-none flex items-center 
                          justify-center"
                          >
                            <Icon icon="ri:time-fill" width={25} />
                          </div>
                          <select




                            className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2
                                 border-gray-200 outline-none focus:border-red-600"
                            placeholder="Time"
                          >
                            <option value="4:00 PM To 8:00 PM">4:00 PM To 8:00 PM</option>
                          </select>
                        </div>
                      </div>
                    </div>
                    {redux &&
                      <div className="flex justify-center">

                        {show ? <button onClick={handleSend} className="before:ease relative h-10 w-48 overflow-hidden border bg-gradient-to-r from-[#F50202] text-black to-[#000] border-none   before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gradient-to-r from-[#FDD835]  to-[#F50202] before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180 rounded-lg hover:scale-110 duration-500">
                          <span className="relative z-10 font-bold">
                            {" "}
                            Book NOW
                          </span>
                        </button>



                          : ""}

                      </div>
                    }
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Appointment;
