import React, { useState, useRef, useEffect } from "react";

import Slider from "react-slick";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Api from "../../Axios/Api";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
const Country = () => {
  const sliderRef1 = useRef(null);
  const [currentSlide1, setCurrentSlide1] = useState(0);

  const [isLeftMouseOver, setisLeftMouseOver] = useState(true);
  const [isRightMouseOver, setisRightMouseOver] = useState(true);

  const handleLeftMouseEnter = () => {
    setisLeftMouseOver(false);
  };
  const handleRightMouseEnter = () => {
    setisRightMouseOver(false);
  };

  const handleLeftMouseLeave = () => {
    setisLeftMouseOver(true);
  };
  const handleRightMouseLeave = () => {
    setisRightMouseOver(true);
  };

  var countrySettings = {
    dots: false,
    infinite: true,

    speed: 2000,

    slidesToShow: 1,
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
  console.log("uni:", uni)
  return (
    <div className="abroad">
      <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px]">
        Study Abroad
      </h1>
      <div className="max-w-screen-2xl mx-auto">
        <div
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="py-10 text-center"
        >
          <h1 className="text-DarkNevy font-bold md:text-[34px] text-[24px] py-2">
            স্বপ্ন এখন হাতের মুঠোই
          </h1>
          <p className=" md:text-[20px] text-[16px] px-5 py-2">
            {" "}
            এখান থেকে IELTS -এ ভালো Score করে পছন্দের দেশের ভার্সিটিতে Apply করো
            এখনই ।
          </p>
        </div>
        <div>
          <div
            data-aos="fade-up"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className=" overflow-hidden opacity-1 relative bg-white py-10"
          >
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
                        src={`${Api.defaults.baseURL}/uploads/${item.url}`}
                        alt=""
                        className="rounded group-hover:scale-105 group-hover:duration-300 duration-300"
                      />
                    </div>
                    <div className="py-4">
                      <h1 className="text-center font-bold md:text-[24px] text-[20px]">
                        {item.country}
                      </h1>
                      <p className="text-justify py-4 px-5">{item.countryDetail}</p>
                    </div>

                    <div className="text-center">
                      <Link to={`/course/countryDetails/${item.country}`}>
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
              w-[70px] overflow-hidden h-[70px] rounded-full  cursor-pointer
                    right-[0%] top-[30%]
                    opacity-1  text-[#2B3252] "
              onClick={handleClickNext1}
            >
              <Icon
                icon="mingcute:arrow-right-fill"
                width={36}
                className={`absolute top-4 right-5 text-[#505050] hover:translate-x-1 hover:text-[#F90101] hover:duration-300 duration-300 icon2 ${isRightMouseOver ? "animate2 duration-300" : ""
                  }`}
                onMouseEnter={handleRightMouseEnter}
                onMouseLeave={handleRightMouseLeave}
              />
            </div>
            <div
              className="absolute bg[#2b3252] bg-gray-100 md:block hidden
              w-[70px] overflow-hidden h-[70px] rounded-full  cursor-pointer
              left-[0%] top-[30%]
              opacity-1  text-[#2B3252]"
              onClick={handleClickPrev1}
            >
              <Icon
                icon="mingcute:arrow-left-fill"
                width={36}
                className={`absolute top-4 left-5 text-[#505050] hover:-translate-x-2 hover:duration-300 duration-300 hover:text-[#F90101] icon ${isLeftMouseOver ? "animate" : ""
                  }`}
                onMouseEnter={handleLeftMouseEnter}
                onMouseLeave={handleLeftMouseLeave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Country;
