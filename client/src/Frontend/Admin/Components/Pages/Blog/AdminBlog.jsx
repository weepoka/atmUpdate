import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../HomePage/Api";
import { MdDelete } from "react-icons/md";
const AdminBlog = () => {
  const [kurs, setKurs] = useState([]);
  const [mess, setMess] = useState("");
  // get course start #######

  const getKurs = async () => {
    try {
      const res = await Api.get("/atms/api/v1/blog");

      if (res.data.length > 0) {
        setKurs(res.data);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  // get course end #######
  //  course del #######
  const handelDel = async (id) => {
    try {
      const res = await Api.delete(`/atms/api/v1/blog/${id}`);
      setMess(res.data.message);
      setTimeout(() => {
        setMess("");
      }, 2000);
      getKurs();
    } catch (err) {
      console.error("Error reason:", err);
      setMess(err.stack);
      setTimeout(() => {
        setMess("");
      }, 2000);
    }
  };
  //###useEffect ####
  //#################
  useEffect(() => {
    getKurs();
  }, []);
  //######## console log #########
  console.log("Kurs:", kurs);

  //#################
  return (
    <div className="m-7 lg:w-full w-full text-white">
      <div>
        <h1 className="text-center underline text-cyan-400 text-3xl py-5">
          {" "}
          Blog List
        </h1>
      </div>
      <div className=" flex flex-wrap gap-10 ">
        {kurs &&
          kurs?.map((kur, i) => (
            <div
              key={i}
              className="w-80 relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                loading="lazy"
                className="rounded-t-lg object-contain w-full h-[200px] "
                src={`${Api.defaults.baseURL}/uploads/${kur?.url}`}
                alt="kurs"
              />

              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-md  tracking-tight text-gray-900 dark:text-white">
                    {kur?.title}
                  </h5>
                  <h5 className="mb-2 text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {kur?.category}
                  </h5>
                </a>

                <div className="flex justify-between">
                  <a
                    href={`/blog/blogDetails/${kur?._id}`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Details
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>
                  <a
                    href={`https://www.youtube.com/embed/${kur?.link}`}
                    rel="noreferrer"
                    target="_blank"
                  >
                    <button className="text-[16px] bg-DarkNevy duration-300 hover:bg-red-500 px-3 py-2 text-white rounded-md">
                      Watch Now
                    </button>
                  </a>
                  <p
                    onClick={() => handelDel(kur._id)}
                    className="inline-flex cursor-pointer 
                    items-center text-2xl font-medium text-center
                     text-red-500  rounded-lg hover:text-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    <MdDelete />
                  </p>
                </div>
              </div>
            </div>
          ))}
        {mess && (
          <div className="max-w-sm relative w-[400px] h-[200px] bg-[#2B3252] border flex justify-center items-center border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <p className="text-center text-orange-600 text-lg font-bold ">
              {mess}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminBlog;
