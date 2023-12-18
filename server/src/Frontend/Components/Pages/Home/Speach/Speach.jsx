import { Icon } from "@iconify/react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AiFillPlayCircle } from "react-icons/ai";
import video from "../../../../../assets/logo/video-01.png";
import { useEffect, useRef, useState } from "react";
import Api from "../../../Axios/Api"



import "./Speech.css";

const Speach = () => {
  const [speech, setSpeech] = useState("")
  const sliderRef = useRef(null);
  
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

  const [imageVisibility, setImageVisibility] = useState(
    // speaches.map(() => true)
    Array.isArray(speech) &&
    speech?.map(() => true)
  );
  var settings = {
    dots: false,
    infinite: true,

    speed: 2000,

    slidesToShow: 3,
    slidesToScroll: 1,
    cssEase: "linear",
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
  const handleClickNext = () => {
    sliderRef.current.slickNext();
  };

  const handleClickPrev = () => {
    sliderRef.current.slickPrev();
  };
  const toggleImageAndYoutube = (index) => {
    setImageVisibility((prevVisibility) => {
      const updatedVisibility = [...prevVisibility];
      updatedVisibility[index] = !prevVisibility[index];
      return updatedVisibility;
    });
  };


  // data fetch from mongo


  

  useEffect(() => {

    const isBanner = async () => {
      try {
        const res = await Api.get("/atms/api/v1/video")
        console.log("hello", res)
        if (res.data.length > 0) {
          console.log(res.data)
          setSpeech(res.data)
        }

      } catch (error) {
        console.log(error.message)
      }
    }
    isBanner()
  }, [])
  console.log("hello", speech)
  return (
    <div
      className="bg-gradient-to-l
    from-[#151828]  to-[#455083] bg-opacity-75 py-24 speach"
    >
      <div
        data-aos="fade-down"
        data-aos-delay="50"
        data-aos-duration="1500"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="max-w-screen-2xl mx-auto py-10 bg-white rounded-2xl"
      >
        <div>
          <div className="flex flex-col items-center justify-center py-2">
            {" "}
            <img src={video} alt="" className="w-14" />
          </div>

          <h1 className="text-[24px] text-DarkNevy font-bold text-center mb-10">
            ATM Sir's Speechs & videos
          </h1>
        </div>
        <div className="py-5 relative overflow-hidden cursor-pointer">
          <div className=" overflow-hidden opacity-1  bg-white">
            <Slider
              {...settings}
              className="md:px-5 relative overflow-hidden"
              ref={sliderRef}
            >
              {Array.isArray(speech) &&
                speech?.reverse().map((item, i) => (

                  <div
                    key={i}
                    className="border  rounded-xl p-5"
                    style={{
                      boxShadow:
                        "rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px;",
                    }}
                  >
                    <div>
                 

                      <div className="relative">
                        {imageVisibility[i] ? (
                          <div
                            onClick={() => toggleImageAndYoutube(i)}
                            className=" z-[999]"
                          >
                            <div
                              className="absolute inset-0 bg-gray-900
                         bg-opacity-60 "
                            ></div>
                       
                            <div className="wrapper ">
                              <div className="video-main">
                                <div className="promo-video">
                                  <div className="waves-block">
                                    <div className="waves wave-1"></div>
                                    <div className="waves wave-2"></div>
                                    <div className="waves wave-3"></div>
                                  </div>
                                </div>
                                <button className="video relative video-popup mfp-iframe">
                                  <AiFillPlayCircle
                                    size={30}
                                    className="fa fa-play absolute top-[20%] left-[18%] "
                                  ></AiFillPlayCircle>
                                </button>
                              </div>
                            </div>
                          </div>
                        ) : (
                          ""
                        )}

                  
                        <iframe
                          width="230"
                          height="270"
                          src={`https://www.youtube.com/embed/${item.link}`}
                          title="YouTube video player"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          allowfullscreen
                          className="md:w-full w-full rounded aspect-video"
                        ></iframe>
                      </div>
                      <div>
                        <h1 className="text-DarkNevy text-base text-justify py-3 font-semibold">
                          {item.title}
                        </h1>
                        <p className="text-justify leading-relaxed text-sm">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>

            <div
              className="absolute bg[#2b3252] bg-white md:block hidden w-[100px] overflow-hidden h-[100px] rounded-full  cursor-pointer
                    right-[-2%] top-[30%]
                    opacity-1  text-[#2B3252] "
              onClick={handleClickNext}
            >
              <Icon
                icon="mingcute:arrow-right-fill"
                width={36}
                className={`absolute top-8 right-10 text-[#505050] hover:translate-x-1 hover:text-[#F90101] hover:duration-300 duration-300 icon2 ${isRightMouseOver ? "animate2 duration-300" : ""
                  }`}
                onMouseEnter={handleRightMouseEnter}
                onMouseLeave={handleRightMouseLeave}
              />
            </div>

            <div
              className="absolute bg[#2b3252] bg-white md:block hidden w-[100px] overflow-hidden h-[100px] rounded-full  cursor-pointer left-[-2%] top-[30%] opacity-1  text-[#2B3252]"
              onClick={handleClickPrev}
            >
              <Icon
                icon="mingcute:arrow-left-fill"
                width={36}
                className={`absolute text-[#505050] top-8 left-10 hover:-translate-x-2 hover:duration-300 duration-300 hover:text-[#F90101] icon ${isLeftMouseOver ? "animate" : ""
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

export default Speach;
