import { useEffect, useRef, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";


import start from "../../../../../assets/logo/Start-01.png";
import { Link } from "react-router-dom";
import Api from "../../../Axios/Api"
const staticUrl = Api.defaults.baseURL
const Moments = () => {
  const commonblogURL = "/blog";
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  // console.log(Banners);
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


  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  // data fetch from mongo
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
  return (
    <div>
      <div>
        <div
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="mb-8 py-10"
        >
          <div className="flex flex-col items-center justify-center py-2 my-2">
            {" "}
            <img src={start} alt="" className="w-14 " />
          </div>

          <h1 className="text-[24px] text-DarkNevy font-bold text-center ">
            Successful Moments with ATM Sir
          </h1>
        </div>
      </div>
      <div className="w-full py-2 pb-10 banner overflow-hidden relative">
        <Slider ref={sliderRef} {...settings}>
          {Array.isArray(banData) &&
            banData?.map((item, i) => (
              item.position === "Moment" && (
                <motion.div key={i} className="relative  overflow-hidden">
                  <img
                    src={`${staticUrl}/uploads/${item.url}`}
                    alt={`Banner ${i + 1}`}
                    className="w-full sm:h-full h-[200px]  "
                  />
                  <div className="absolute inset-0 bg-black opacity-50"></div>
                  <div className="flex justify-between">
                    <motion.div
                      initial={{ x: "-100%" }}
                      animate={slideStyles(i)}
                      transition={{ duration: 0.5 }}
                      exit={{ opacity: 0 }}
                      className="absolute z-[999] top-[20%] lg:left-[10%] opacity-1  text-[#fff]
                  md:top-[35%] md:left-[5%] sm:top-[30%] sm:left-[5%] left-[5%]"

                    >
                      <h6 className="text-[18px] px-2 lg:px-0 py-2 max-w-xl">
                        {item.detail}
                      </h6>
                      <div className=" mt-2 cursor-pointer z-[999]">
                        <Link to={commonblogURL}>
                          <button className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                            <span className="relative z-10">Learn More</span>
                          </button>
                        </Link>
                      </div>
                    </motion.div>

                  </div>
                </motion.div>
              )

            ))}
        </Slider>
        <div
          className="flex justify-center mt-2 cursor-pointer absolute md:right-[0%] 
          right-[33%] md:rotate-90 
             md:bottom-[50%] bottom-5 "
        >
          {Array.isArray(banData) &&
            banData?.map((_, index) => _.position === "Moment" && (
              <div
                key={index}
                className={`w-4 h-4 mx-2 rounded-full ${currentSlide === index ? "bg-[#FFF200]" : "bg-gray-300"
                  }`}
                onClick={() => handleDotClick(index)}
              />
            ))}
        </div>

      </div>
    </div>
  );
};

export default Moments;
