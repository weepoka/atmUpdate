import React, { useRef, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import { Link, useParams } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./BlogDetails.css";
import Api from "../../Axios/Api"




const BlogDetails = () => {
  const [blogs, setBlog] = useState([""]);
  const [recentPosts, setRecentPosts] = useState([""]);
  // console.log(recentPosts);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  // console.log(blogs);
  const { id } = useParams();
  // console.log(id);
  var settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    speed: 2000,
    autoplaySpeed: 2000,

    slidesToShow: 1,
    slidesToScroll: 1,

    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
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
  useEffect(() => {
    filterBlog();
  }, [id]);


  const filterBlog = async () => {

    const SingleBlog = await Api.get("/atms/api/v1/blog")
    console.log(SingleBlog)

    if (SingleBlog.data.length > 0) {
      setRecentPosts(SingleBlog.data.reverse())

      console.log("Post:", SingleBlog.data.length)
      const foundBlog = SingleBlog.data.find((item) => item._id === id);
      console.log("Post:", foundBlog)
      if (foundBlog) {
        setBlog(foundBlog);
      }
    }


  };
  // recent post

  const shuffleArray = (array) => {
    const newArray = [...array];
    for (let i = newArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }
    return newArray;
  };
  const filteredItems = recentPosts.filter((items) => {
    return (
      //   String(items.id) === ProductId
      items.category === blogs?.category
      // items.tag === "PartyDresses"
    );
  });
  const shuffledNames = shuffleArray(filteredItems);
  return (
    <div className="">
      <h1
        className="uppercase text-center bg-gray-300 py-10 font-bold text-[18px] px-5 
      md:text-[24px]"
      >
        ATM's এর মাধ্যমে কানাডার ভিসা । স্বল্প খরচে কানাডার স্বপ্ন পূরণ হলো।
      </h1>
      <div className="max-w-screen-2xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="md:col-span-2">
            <div className="flex gap-8 p-5 ">
              <div className="">
                {" "}
                <img src={`${Api.defaults.baseURL}/uploads/${blogs.url}`} alt="" className=" " />
                <div className="flex gap-10 py-2">
                  {" "}
                  <div className="flex items-center justify-center gap-1">
                    <Icon icon="simple-line-icons:calender" color="red" />
                    <span className="text-[16px]"> {blogs?.date}</span>
                  </div>
                  <div className="flex items-center gap-3 text-[14px]">
                    {" "}
                    <Icon icon="mdi:folder-open" color="red" />
                    {blogs?.category}
                  </div>
                </div>
                <div className="">
                  <h1 className="text-[16px] py-10 text-center md:text-start font-bold text-DarkNevy">
                    {blogs?.title}
                  </h1>{" "}
                  <p className="w-3/4 whitespace-pre-wrap">{blogs?.description}</p>
                </div>
                <div className="py-10">
                  <a
                    href={`https://www.youtube.com/embed/${blogs?.link}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <button className="text-[16px] bg-DarkNevy duration-300 hover:bg-red-500 px-3 py-2 text-white rounded-md">
                      Watch Now
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="border bg-gray-100 my-2">
            <div className="p-5 ">
              <div className="bg-white md:p-5 ">
                <h1 className="md:text-3xl text-xl text-center md:text-start text-DarkNevy font-bold pb-5">
                  Recent Post
                </h1>
                <div className=" h-[60vh] overflow-y-scroll">
                  {recentPosts.map((item) => (
                    <Link key={item._id} to={`/blog/blogDetails/${item?._id}`}>
                      <div
                        key={item.id}
                        className="flex flex-col lg:flex-row  gap-5 px-2"
                      >
                        <div className="">
                          {" "}
                          <img
                            src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                            alt=""
                            className="md:w-[400px] aspect-video"
                          />
                        </div>
                        <div>
                          <h1 className="text-[14px] text-center md:text-start font-bold">
                            {item?.title}
                          </h1>{" "}
                          <div className="flex items-center justify-center md:justify-start  py-2 gap-2">
                            <Icon
                              icon="simple-line-icons:calender"
                              color="red"
                            />
                            <span className="text-[16px]"> {item?.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div className="bg-white md:my-5 md:p-5 px-5 ">
                <h1 className="text-[24px] text-center md:text-start text-DarkNevy font-bold md:py-10 py-5">
                  Categories
                </h1>

                <div className="">
                  <ul>
                    <li className="flex justify-between py-1">
                      Visa Success Stories <span>{recentPosts.filter((item) => item.category === "Visa Successfull Story").length}</span>{" "}
                    </li>
                    <li className="flex justify-between py-1">
                      IELTS Success Stories <span>{recentPosts.filter((item) => item.category === "IELTS Success Stories").length}</span>{" "}
                    </li>
                    <li className="flex justify-between py-1">
                      Motivational Stories <span>{recentPosts.filter((item) => item.category === "Motivational Stories").length}</span>{" "}
                    </li>
                    <li className="flex justify-between py-1">
                      Life Style Stories <span>{recentPosts.filter((item) => item.category === "Life Style Stories").length}</span>{" "}
                    </li>
                  </ul>
                </div>
              </div>
              <div className="bg-white md:p-5">
                <h1 className="text-[24px] text-center md:text-start text-DarkNevy font-bold py-10">
                  Follow Us
                </h1>
                <div className="flex justify-center gap-10">
                  <Link>
                    {" "}
                    <Icon icon="ic:baseline-facebook" width={48} />
                  </Link>
                  <Link>
                    {" "}
                    <Icon icon="mdi:youtube" width={48} />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="py-5 relative">
          <h1 className="py-8 text-[24px] text-DarkNevy font-bold">
            Related Posts
          </h1>
          <Slider {...settings} ref={sliderRef}>
            {shuffledNames.map((item) => (
              <div
                key={item._id}
                className="bg-gray-300 shadow-2xl rounded-xl px-2 py-2 relative mx-2"
              >
                {/* <li className="">{item.title}</li> */}
                <div className="relative group ">
                  <div className="relative overflow-hidden">
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${item?.url}`}
                      alt=""
                      className="rounded-lg p-5 group-hover:scale-105 duration-500 group-hover:duration-500"
                    />
                    <div
                      className="
                      p-2  flex justify-between gap-5 "
                    >
                      <div className="flex items-center justify-center gap-1">
                        <Icon icon="simple-line-icons:calender" color="red" />
                        <span className="text-[12px]"> {item?.date}</span>
                      </div>
                      <div className="flex items-center gap-1 text-[12px]">
                        {" "}
                        <Icon icon="mdi:folder-open" color="red" />
                        {item?.category}
                      </div>
                    </div>
                  </div>

                  <div className="pt-10 pb-3 m-2 mr-5 flex flex-col items-center justify-center">
                    <h1>{item?.title}</h1>
                    <Link key={item._id} to={`/blog/blogDetails/${item?._id}`}>
                      <button
                        onClick={console.log(item?._id)}
                        className="px-4  rounded
                       py-1 mt-5 bg-DarkNevy  hover:text-[#fff] duration-300  hover:scale-105 text-[14px] md:text-[18px] text-white"
                      >
                        READ MORE
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
          <div
            className="absolute 
                    top-[10%] lg:right-[15%]  cursor-pointer
                    opacity-1  text-[#2B3252] md:block hidden 
                  md:top-[5%] md:right-[25%] sm:top-[25%] sm:right-[20%] 
                  right-[10%]"
          >
            <div className="flex gap-3 mb-5 z-[9999]">
              <div className="" onClick={handleClickPrev}>
                <Icon icon="mingcute:arrow-left-fill" width={35} />
              </div>
              <div
                className="custom-arrow right-arrow"
                onClick={handleClickNext}
              >
                <Icon icon="mingcute:arrow-right-fill" width={35} />
              </div>
            </div>
          </div>
        </div>


      </div>
    </div>
  );
};


export default BlogDetails;
