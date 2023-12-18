import React, { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import Api from "../../../Axios/Api"

const Stories = () => {
  const [activeTab, setActiveTab] = useState("all");
  const [blog, setBlog] = useState([""])
  const [categories, setCategories] = useState([]);
  const handleTabClick = (category) => {
    console.log("ami cat:", category)
    setActiveTab(category === "All" ? "All" : category);
  };

  useEffect(() => {
    const blogData = async () => {
      try {
        const res = await Api.get("/atms/api/v1/blog")

        if (res.data.length > 0) {
        
          setBlog(res.data)
        }

      } catch (error) {
        console.log(error.message)
      }
    }
    blogData()

  }, [])
  useEffect(() => {
    setActiveTab("All");
    if (Array.isArray(blog)) {
      const uniqueCategories = [...new Set(blog.map((item) => item.category))];
      setCategories(["All", ...uniqueCategories]);
    }
  }, [blog]);

  const filteredData =
    activeTab === "All"
      ? blog
      : blog.filter((item) => item.category === activeTab);
  // console.log(filteredData);
  // console.log("Active Tab:", activeTab);
  const slice = filteredData?.slice(0, 6);
  return (
    <div className="max-w-screen-2xl mx-auto px-5 py-10">
      <div>
        <div
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          className={``}
        >
          <h1 className="text-[24px] md:text-[30px] text-DarkNevy font-bold text-center pb-5 capitalize">
            Successful stories with ATM Sir
          </h1>
          <div className="flex md:flex-row flex-col space-x-4 md:py-0 py-2">
            {categories?.map((category) => (
              <button
                key={category}
                onClick={() => handleTabClick(category)}
                className={`${activeTab === category
                  ? " bg-gradient-to-r from-[#465286] to-[#141726] text-white text-[16px] xl:text-2xl "
                  : "bg-gray-100  text-[16px] xl:text-2xl p-3 "
                  } px-4 py-2 my-2 rounded-t-lg `}
              >
                {category}
              </button>
            ))}
          </div>

          <div className={`${" xl:p-5 "}`}>
            {/* <h2>{activeTab.toUpperCase()}</h2> */}
            <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 xl:gap-10 py-10">
              {slice?.map((item) => (
                <div
                  key={item._id}
                  className="bg-gray-100 shadow rounded-xl w-full"
                >
                  {/* <li className="">{item.title}</li> */}
                  <div className="relative p-2 group overflow-hidden">
                    <div className="relative ">
                      <img
                        src={`${Api.defaults.baseURL}/uploads/${item.url}`}
                        alt=""
                        className="w-full rounded-t-lg aspect-video group-hover:scale-105 group-hover:duration-500 
                        duration-500"
                      />
                      <div className="absolute left-0 right-0 -bottom-5 flex justify-center px-5">
                        <div className="flex justify-between px-3 py-2 gap-2 2xl:gap-5 bg-white w-96 mx-auto shadow rounded">
                          <div className="flex items-center justify-center gap-1">
                            <Icon
                              icon="simple-line-icons:calender"
                              color="red"
                            />
                            <span className="text-[11px] xl:text-[14px] ">
                              {" "}
                              {item.date}
                            </span>
                          </div>
                          <div className="flex items-center gap-2 xl:gap-3 text-[11px] xl:text-[14px]">
                            {" "}
                            <Icon icon="mdi:folder-open" color="red" />
                            {item.category}
                          </div>
                        </div>
                      </div>
                      {/* <div className="absolute  p-3 flex gap-5 w-96 justify-center  -bottom-5 right-0 left-0 ">
                        <div className="flex bg-white w-96 mx-auto">
                          <div className="flex items-center justify-center gap-1">
                            <Icon
                              icon="simple-line-icons:calender"
                              color="red"
                            />
                            <span className="text-[16px]"> {item.date}</span>
                          </div>
                          <div className="flex items-center gap-3 text-[14px]">
                            {" "}
                            <Icon icon="mdi:folder-open" color="red" /> 
                          </div>
                        </div>
                      </div> */}
                    </div>

                    <div className="pt-10 pb-3 m-2 mr-5 flex flex-col items-center justify-center">
                      <h1 className="text-justify leading-relaxed font-bold">
                        {item.title}
                      </h1>
                      <h1 className="text-justify leading-relaxed py-3">
                        {/* {item.subtitle ? item.subtitle.slice(0, 100) : ""}... */}
                      </h1>
                      <Link to={`/blog/blogDetails/${item?._id}`}>
                        <button className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                          <span className="relative z-10">Read More</span>
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </ul>
          </div>

          <div className=" py-10 flex md:justify-end justify-center ">
            <Link to="/blog">
              <button className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
                <span className="relative z-10">More Success Stories</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;
