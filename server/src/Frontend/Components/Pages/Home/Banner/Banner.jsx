import React, { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Banners } from "../../../FakeApi/Banner";
import { Link } from "react-router-dom";
import { Icon } from "@iconify/react";
import Api from "../../../Axios/Api"
const staticUrl = Api.defaults.baseURL

const Banner = () => {
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // const link = "/about";
  // console.log(Banners);
  const [banData, setBan] = useState("")



  useEffect(() => {

    const isBanner = async () => {
      try {
        const res = await Api.get("/atms/api/v1/banner")

        if (res.data.length > 0) {
          console.log(res.data)
          setBan(res.data)
        }

      } catch (error) {
        console.log(error.message)
      }
    }
    isBanner()
  }, [])
  console.log(banData)
  const [isLeftBannerOver, setisLeftBannerOver] = useState(true);
  const [isRightMouseOver, setisRightBannerOver] = useState(true);

  const handleLeftEnter = () => {
    setisLeftBannerOver(false);
  };
  const handleRightEnter = () => {
    setisRightBannerOver(false);
  };

  const handleLeftLeave = () => {
    setisLeftBannerOver(true);
  };
  const handleRightLeave = () => {
    setisRightBannerOver(true);
  };

  const settings = {
    dots: false,
    lazyLoad: true,
    fade: true,
    infinite: true,
    autoplay: true,
    speed: 500,
    autoplaySpeed: 4000,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
  };
  const slideStyles = (index) => {
    const transition = {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    };

    return {
      x: currentSlide === index ? "0%" : "-100%",
      transition: transition,
    };
  };
  const slideStyles1 = (index) => {
    const transition = {
      duration: 0.5,
      ease: [0.43, 0.13, 0.23, 0.96],
    };

    return {
      x: currentSlide === index ? "0%" : "100%",
      transition: transition,
    };
  };

  const handleClickNext = () => {
    sliderRef.current.slickNext();
  };

  const handleClickPrev = () => {
    sliderRef.current.slickPrev();
  };
  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };
  return (
    <div>
      {" "}
      <div>
        <div className="w-full pb-16 banner overflow-hidden relative">

          <Slider ref={sliderRef} {...settings}>
            {Array.isArray(banData) &&
              banData?.map((item, i) => (
                item.position === "Home" && (
                  <motion.div key={i} className="relative  overflow-hidden ">
                    {/* <div className="w-screen sm:w-full sm:h-[420px] h:screen"> </div> */}
                    <img
                      src={`${staticUrl}/uploads/${item.url}`}
                      alt={`Banner ${i + 1}`}
                      className=" w-full sm:h-full h-[200px] block "
                    />

                    <div className="absolute inset-0 bg-black opacity-50"></div>
                    <div className="flex justify-between">
                      <motion.div
                        initial={{ x: "-100%" }}
                        animate={slideStyles(i)}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute w-[400px] xl:block hidden
                        top-[10%] lg:top-[40%] lg:left-[15%] xl:left-[5%] 2xl:left-[15%]
                        opacity-1  text-[#fff] 
                     md:top-[40%] md:left-[15%] sm:top-[30%]
                      sm:left-[10%] left-5"
                      >


                        <h6 className=" capitalize text-[30px] py-2">
                          {item.tile}
                        </h6>
                        <h6 className=" capitalize text-[24px]">
                          {item.offer}
                        </h6>
                      </motion.div>


                      <motion.div
                        initial={{ x: "0%" }}
                        animate={slideStyles1(i)}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute 
                    top-[15%] lg:top-[10%] lg:right-[45%] 
                    opacity-1  text-[#fff] md:w-[500px]
                  md:top-[20%] md:right-[25%] sm:top-[20%] sm:right-[25%] 
                  right-[0%] px-2 z-[999]"
                      >
                        <h6
                          className="xl:text-[20px] 
                     md:text-[18px] text-right text-[13px] md:pt-10 pt-2"
                        >
                          ami new kindly modify me Bro {item.detail}
                        </h6>

                      </motion.div>


                      <motion.div
                        initial={{ x: "0%" }}
                        animate={slideStyles1(i)}
                        transition={{ duration: 0.5 }}
                        exit={{ opacity: 0 }}
                        className="absolute 
                    top-[15%] lg:top-[30%] lg:right-[15%] 
                    opacity-1  text-[#fff] md:w-[500px]
                  md:top-[20%] md:right-[25%] sm:top-[20%] sm:right-[25%] 
                  right-[0%] px-2 z-[999]"
                      >
                        <h6
                          className="xl:text-[24px] 
                     md:text-[18px] text-right text-[13px] md:pt-10 pt-2"

                        >
                          {item.sub}
                        </h6>
                        <Link
                          to={`/courses`}
                          className="flex justify-end xl:pt-10 pt-2"
                        >
                          <button className="before:ease relative h-10 w-32 overflow-hidden border bg-gradient-to-r from-[#F50202] to-[#000] border-none   before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gradient-to-r from-[#FDD835]  to-[#F50202] before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180 rounded-lg hover:scale-110 duration-500">
                            <span className="relative z-10">About More</span>
                          </button>
                        </Link>
                      </motion.div>


                    </div>

                  </motion.div>
                )

              ))}
          </Slider>

          <div
            className="flex justify-center mt-2 cursor-pointer
             "
          >
            {Array.isArray(banData) &&
              banData?.map((_, index) => _.position === "Home" && (
                <div
                  key={index}
                  className={`w-12 h-[6px] mx-2 rounded-md ${currentSlide === index ? "bg-yellow-600" : "bg-gray-300"
                    }`}
                  onClick={() => handleDotClick(index)}
                />
              ))}
          </div>

          <div
            className="absolute  cursor-pointer
                    top-[10%] lg:top-[25%] lg:right-[16%] 
                    opacity-1  text-yellow-600 md:block hidden 
                  md:top-[20%] md:right-[25%] sm:top-[25%] sm:right-[20%] 
                  right-[10%]"
          >
            <div className="flex gap-3 mb-5 z-[9999]">
              <div className="" onClick={handleClickPrev}>
                {/* <Icon icon="mingcute:arrow-left-fill" width={35} /> */}
                <Icon
                  icon="system-uicons:arrow-left"
                  width={36}
                  className={`icon ${isLeftBannerOver ? "animate duration-300" : ""
                    }`}
                  onMouseEnter={handleLeftEnter}
                  onMouseLeave={handleLeftLeave}
                />
              </div>

              <div
                className={`icon2 ${isRightMouseOver ? "animate2" : ""}`}
                onMouseEnter={handleRightEnter}
                onMouseLeave={handleRightLeave}
                onClick={handleClickNext}
              >
                <Icon icon="system-uicons:arrow-right" width={35} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
