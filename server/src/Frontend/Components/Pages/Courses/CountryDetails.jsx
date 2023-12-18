import { useParams } from "react-router-dom";
import icon1 from "../../../../assets/logo/icon1-01.png";
import icon2 from "../../../../assets/logo/icon2-01.png";
import icon3 from "../../../../assets/logo/icon3-01.png";
import icon4 from "../../../../assets/logo/icon4-01.png";

import Api from "../../Axios/Api";
import React, { useState, useEffect } from "react";

const CountryDetails = () => {
  const { id } = useParams();
  console.log(id);

  // Fetch data
  const [uni, setUni] = useState(null);

  const studyAbroad = async () => {
    try {
      const res = await Api.get(`/atms/api/v1/admin/study-uni/${id}`);

      setUni(res.data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    studyAbroad();
  }, [id]);

  console.log(uni);

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [varsityPerpage, setVarsityPerPage] = useState(5);

  const handleVarsityPerPageChange = (event) => {
    setVarsityPerPage(parseInt(event.target.value, 10));
    setCurrentPage(1); // Reset to the first page when changing posts per page
  };

  const totalUniversities = uni?.university?.length || 0;
  const totalPages = Math.ceil(totalUniversities / varsityPerpage);
  const pageNumbers = Array.from({ length: totalPages }, (_, index) => index + 1);

  const indexOfLastUniversity = currentPage * varsityPerpage;
  const indexOfFirstUniversity = indexOfLastUniversity - varsityPerpage;

  const currentUniversities = uni?.university?.slice(
    indexOfFirstUniversity,
    indexOfLastUniversity
  );

  // Page controls
  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const nextPage = () => setCurrentPage((prevPage) => prevPage + 1);
  const prevPage = () => setCurrentPage((prevPage) => prevPage - 1);

  return (
    <div className="country-details">
      <div className="">
        <img
          src={`${Api.defaults.baseURL}/uploads/${uni?.url}`}
          alt=""
          className="w-full object-cover aspect-auto h-[600px]"
        />
        <div
          className="absolute bottom-[40%] md:left-[10%] left-0 w-full md:w-96 right-0 px-4 py-6
          bg-black bg-opacity-60"
        >
          <h3 className="md:text-3xl text-xl capitalize text-white font-extrabold">
            {" "}
            study in {uni?.country}
          </h3>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto ">
        {currentUniversities?.map((item, index) => (
          <div
            key={index}
            data-aos="fade-down"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className="bg-gray-100 py-10 my-10"
          >
            {/* ... (rest of your university item rendering) ... */}
            <div className="flex md:flex-row flex-col justify-between gap-5 px-5">
              <div className="flex flex-col justify-center items-center ">
                <img className=" w-40 h-40 rounded-full" src={`${Api.defaults.baseURL}/uploads/${item?.logo}`} />
                <div className="">
                  <h1 className="text-center text-xl font-medium">
                    {item?.uniName}
                  </h1>
                </div>
                <div className="pt-10">
                  <button className="px-3 py-1 text-xl rounded bg-secondaryRed text-white font-bold">
                    IETLS {item.ielts}
                  </button>
                </div>
              </div>
              <div>
                <h1
                  className="text-xl font-bold
                 text-gray-800
                 inline-block 
                  duration-300 hover:duration-300"
                >
                  {" "}
                  {item?.programTitle}
                </h1>
                <ul className="pt-5">
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.degree}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.applyStart}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.duration}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.session}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.tution}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.isPartTime}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.rank}
                  </li>
                  <li className="flex gap-5  py-2">
                    <img src={icon1} alt="" className="w-8" /> {item?.workPermit}
                  </li>
                 
                  <li className="flex gap-5 py-2">
                    <img src={icon2} alt="" className="w-8" />
                    Manufacturing, {item?.creditOne} credits
                  </li>
                  
                  <a href={item.map} className="flex">
                    {" "}
                    <li className=" flex items-center gap-5 border-indigo-400  my-2 inline-block">
                      <img src={icon4} alt="" className="w-7 h-7" />{" "}
                      <h1 className="border border-[#0c6f78] py-1 px-3">
                        {" "}
                        {item.map} Map Link
                      </h1>
                    </li>
                  </a>
                </ul>
              </div>
              <div className="relative">
                <div className="p-2 shadow rounded-md bg-red-600">
                  <p className="text-white uppercase text-xl py-2">Deadline</p>
                  <p className="text-white">{item.deadLine}</p>
                </div>
                <div className="mt-20 ">
                  <a href={item.moreInfo}>
                    <button className="before:ease relative h-10 w-28 overflow-hidden border bg-gradient-to-r from-[#F50202] to-[#000] border-none   before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gradient-to-r from-[#FDD835]  to-[#F50202] before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180 rounded-lg hover:scale-110 duration-500">
                      <span className="relative z-10">More Info</span>
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>


        ))}
        {/* Pagination controls */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-5 my-5">
          <div className="mb-5 flex items-center gap-5">
            <h1 className="text-xl">Per Page:</h1>
            <select
              id="postsPerPage"
              className="px-2 py-1 border rounded"
              value={varsityPerpage}
              onChange={handleVarsityPerPageChange}
            >
              <option value={2}>2</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
            </select>
          </div>
          <div>
            <button
              onClick={prevPage}
              disabled={currentPage === 1}
              className={`mx-1 px-3 py-1 rounded ${currentPage === 1 ? "bg-gray-200" : "bg-gray-400"
                }`}
            >
              Previous
            </button>
          </div>
          <div>
            {pageNumbers.map((number) => (
              <button
                key={number}
                onClick={() => paginate(number)}
                className={`mx-1 px-3 py-1 rounded ${currentPage === number ? "bg-gray-400" : "bg-gray-200"
                  }`}
              >
                {number}
              </button>
            ))}
          </div>
          <div>
            <button
              onClick={() => nextPage()}
              disabled={
                currentPage ===
                Math.ceil(totalUniversities / varsityPerpage)
              }
              className={`mx-1 px-3 py-1 rounded ${currentPage ===
                Math.ceil(totalUniversities / varsityPerpage)
                ? "bg-gray-200"
                : "bg-gray-400"
                }`}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CountryDetails;
