import React, { useState, useEffect } from "react";

import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

import { blog } from "../../FakeApi/Blog";

import { Button } from "@material-tailwind/react";
import Api from "../../Axios/Api"

const Blog = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [recentPosts, setRecentPosts] = useState([""]);
  const [blogs, setBlog] = useState([""])
  // console.log(recentPosts);
  // const postsPerPage = 5; // Adjust this based on your requirement
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [postsPerPage, setPostsPerPage] = useState(5);

  // fetch data from mongo 
  useEffect(() => {
    const blogData = async () => {
      try {
        const res = await Api.get("/atms/api/v1/blog")

        if (res.data.length > 0) {

          setBlog(res.data)
          setRecentPosts(res.data.reverse())
        }

      } catch (error) {
        console.log(error.message)
      }
    }
    blogData()

  }, [])
  console.log("blog:", blogs)
  const handlePostsPerPageChange = (event) => {
    setPostsPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to first page when changing posts per page
  };
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const getFilteredPosts = () => {
    if (selectedCategory === "All") {
      return blogs;
    } else {
      return blogs.filter((post) => post.category === selectedCategory);
    }
  };
  const filteredPosts = getFilteredPosts();
  // console.log(filteredPosts);
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  //page controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);
  // recent post

  const getCategoryPostCount = (category) => {
    if (category === "All") {
      return blogs.length;
    } else {
      return blogs.filter((post) => post.category === category).length;
    }
  };
  const categories = [
    "All",
    "Visa Successfull Story",
    "IELTS Success Stories",
    "Motivational Stories",
    "Life Style Stories",
  ];
  return (
    <div className="blog">
      <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px]">
        Blogs
      </h1>
      <div className="max-w-screen-2xl mx-auto px-5 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className="md:col-span-2 "
          >
            {currentPosts.map((post) => {

              return (
                <div
                  key={post?._id}
                  className="grid grid-cols-1 md:grid-cols-3 gap-8 group
 bg-gray-100 md:p-5 px-2 my-5 rounded-xl py-5"
                >
                  <div className="overflow-hidden">
                    {" "}
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${post.url}`}
                      alt=""
                      className=" w-[500px] group-hover:scale-105 group-hover:duration-500 
    duration-500"
                    />
                  </div>
                  <div className="col-span-2">
                    <h1 className="md:text-[18px] text-center md:text-start  font-bold">
                      {post?.title}
                    </h1>
                    <div className="flex flex-col md:flex-row justify-center md:justify-start items-center md:items-start md:gap-10 py-2">
                      {" "}
                      <div className="flex items-center justify-center gap-1">
                        <Icon icon="simple-line-icons:calender" color="red" />
                        <span className="text-[16px]"> {post?.date}</span>
                      </div>
                      <div className="flex items-center gap-3 text-[14px]">
                        {" "}
                        <Icon icon="mdi:folder-open" color="red" />
                        {post?.category}
                      </div>
                    </div>{" "}
                    <p className="pt-3 text-center text-sm md:text-start">
                      {/* {post?.subtitle ? post?.subtitle.slice(0, 100) : ""}... */}
                    </p>
                    <Link to={`/blog/blogDetails/${post?._id}`}>
                      <div className="pt-10 flex justify-center md:justify-start">
                        <Button className="px-3 py-2 bg-DarkNevy text-white rounded-md hover:scale-110 duration-500">
                          Continue ...
                        </Button>
                      </div>
                    </Link>
                  </div>
                </div>
              );
            })}
            {/* Pagination controls */}
            <div
              className="flex flex-col md:flex-row 
            justify-center  items-center gap-5 my-5"
            >
              <div className="mb-5 flex items-center mt-5  gap-5">
                <h1 className="text-xl">Per Page:</h1>
                <select
                  id="postsPerPage"
                  className="px-2 py-1 border rounded cursor-pointer"
                  value={postsPerPage}
                  onChange={handlePostsPerPageChange}
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={15}>15</option>
                </select>
              </div>
              <div>
                <button
                  onClick={prevPage}
                  disabled={currentPage === 1}
                  className={`mx-1 px-3 py-1 rounded ${currentPage === 1
                    ? "bg-gray-200 duration-300 hover:bg-secondaryRed hover:duration-300 hover:rounded-xl"
                    : "bg-gray-400"
                    }`}
                >
                  Previous
                </button>
              </div>
              <div>
                {[...Array(Math.ceil(blog.length / postsPerPage)).keys()].map(
                  (number) => (
                    <button
                      key={number}
                      onClick={() => paginate(number + 1)}
                      className={`mx-1 px-3 py-1 rounded ${currentPage === number + 1
                        ? "bg-gray-400"
                        : "bg-gray-200"
                        }`}
                    >
                      {number + 1}
                    </button>
                  )
                )}
              </div>
              <div>
                <button
                  onClick={nextPage}
                  disabled={
                    currentPage === Math.ceil(blogs.length / postsPerPage)
                  }
                  className={`mx-1 px-3 py-1 rounded ${currentPage === Math.ceil(blogs.length / postsPerPage)
                    ? "bg-gray-200"
                    : "bg-gray-400"
                    }`}
                >
                  Next
                </button>
              </div>
            </div>

          </div>

          <div
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className="border bg-gray-100"
          >
            <div className="p-5 ">
              <div
                data-aos="fade-down"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
                className="bg-white md:p-5"
              >
                <h1 className="md:text-2xl text-xl text-center md:text-start text-DarkNevy font-bold p-5">
                  Recent Post
                </h1>
                <div className=" h-[60vh] overflow-y-scroll">
                  {recentPosts.map((item) => (
                    <Link key={item._id} to={`/blog/blogDetails/${item?._id}`}>
                      <div
                        key={item.id}
                        className="flex flex-col lg:flex-row  gap-5 my-5 p-2 bg-gray-100"
                        style={{
                          boxShadow:
                            "rgba(0, 0, 0, 0.05) 0px 6px 24px 0px, rgba(0, 0, 0, 0.08) 0px 0px 0px 1px",
                        }}
                      >
                        <div className="">
                          {" "}
                          <img
                            src={`${Api.defaults.baseURL}/uploads/${item.url}`}
                            alt=""
                            className="md:w-[400px] aspect-video p-1"
                          />
                        </div>
                        <div>
                          <h1 className="text-[11px] text-center md:text-start font-bold">
                            {item?.title}
                          </h1>{" "}
                          <div className="flex items-center justify-center md:justify-start  py-2 gap-2">
                            <Icon
                              icon="simple-line-icons:calender"
                              color="red"
                              width={12}
                            />
                            <span className="text-[12px]"> {item?.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
              <div
                data-aos="fade-down"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
                className="bg-white cursor-pointer 
              hover:shadow-[0_0px_30px_rgba(215,224,252,0.45)] transition-all duration-300
               hover:duration-300
              my-5 p-5 px-5 border-[1px] rounded-[10px] border-[#f4eefb]"
              >
                <h1 className="text-[24px] text-center md:text-start text-DarkNevy font-bold md:py-10 py-5">
                  Categories
                </h1>

                <div className="">
                  <ul>
                    {categories.map((category) => (
                      <button
                        key={category}
                        className={`flex justify-between py-1 ${selectedCategory === category ? "font-bold" : ""
                          }`}
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}{" "}
                        <span>({getCategoryPostCount(category)})</span>
                      </button>
                    ))}
                  </ul>
                </div>
              </div>
              <div
                data-aos="fade-down"
                data-aos-delay="50"
                data-aos-duration="1000"
                data-aos-easing="ease-in-out"
                data-aos-once="false"
                data-aos-anchor-placement="top-center"
                className="bg-white p-5 border-[1px] rounded-[10px] border-[#f4eefb] hover:shadow-[0_0px_30px_rgba(215,224,252,0.45)] duration-300 hover:duration-300"
              >
                <h1 className="text-[24px] text-center md:text-start text-DarkNevy font-bold">
                  Follow Us
                </h1>
                <div className="px-5">
                  <ul className="wrapperr ">
                    <li className="icon facebook group  ">
                      <span className="tooltip">Facebook</span>
                      <span>
                        {" "}
                        <Icon
                          icon="ic:baseline-facebook"
                          width={35}
                          className="text-blue-500 group-hover:text-white hover:p-[2px]  duration-300"
                        />
                      </span>
                    </li>
                    <li className="icon twitter group">
                      <span className="tooltip">Youtube</span>
                      <span>
                        <Icon
                          icon="mdi:youtube"
                          width={38}
                          className="text-red-500 group-hover:text-white hover:p-[2px] duration-300"
                        />
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Blog;
