import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import Api from "../HomePage/Api";
import { Input } from "@material-tailwind/react";

const AdminStudent = () => {
  const navigate = useNavigate();
  const [kurs, setKurs] = useState([""]);
  const [all, setAll] = useState([""]);
  const [mess, setMess] = useState("");
  const [id, setId] = useState("");
  const [buyer, setBuyer] = useState(false);
  const [showIn, setShowIn] = useState(false);
  const [mes, setMes] = useState(false);
  const [res, setRes] = useState(false);
  const [hide, setHide] = useState(false);
  const [dro, setDro] = useState(true);
  const [list, setLsit] = useState([""]);
  const [info, setInf] = useState([""]);
  const [result, setResult] = useState([""]);
  const [inv, setInv] = useState([""]);
  const [dropp, setDropp] = useState([""]);
  const [given, setGiv] = useState(0);
  const [givenInv, setGivInv] = useState(0);
  const [meo, setMeo] = useState({
    id: "",
    mes: "",
    name: "",
  });
  const [data, setData] = useState({
    regi: "",
  });

  const [resultData, setResultData] = useState({
    point: "",
    grade: "",
    mark: "",
    score: "",
    totalMark: "",
    negativeMark: "",
    rightAnswer: "",
    wrongAnswer: "",
    percentage: "",
    comment: "",
  });
  const [resultPdf, setResultPdf] = useState(null);
  const [resultImg, setResultImg] = useState(null);
  // ##################### search ######
  const handleMessChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setMeo({ ...meo, [name]: value });
  };

  const handeleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };
  const sendData = async (e) => {
    e.preventDefault();
    if (e.key === "Enter") {
      try {
        const regi = data?.regi;
        if (regi === "") {
          return alert("Inter Regi ");
        }
        const res = await Api.get(`/atms/api/v1/regi-view/${regi}`);
        setShowIn(true);
        setHide(false);
        setLsit(res?.data?.data);
        const uid = res?.data?.data[0]?._id;
        const email = res?.data?.data[0]?.email;
        const ress = await Api.get(`/atms/api/v1/student/${uid}`);
        if (ress?.data) {
          setInf(ress?.data);
        }

        const resss = await Api.get(`/atms/api/v1/student/result/${uid}`);
        if (resss.data) {
          setResult(resss.data.data.result);
        }

        const ressss = await Api.get(`/atms/api/v1/my-invoice/${email}`);
        if (ressss.data) {
          setInv(ressss.data.data);
        }

        setBuyer(true);
      } catch (error) {
        console.error("We got error:", error);
      }
    }
  };

  //######active course start####
  const actKur = info?.data?.activeCourse
    ? Object.entries(info?.data?.activeCourse)
    : "";
  //######active course end ####

  console.log("Ak:", actKur);

  const currentCourse = actKur ? actKur[1][1] : "";

  function getNextCourses(currentCourse) {
    const link = [
      { link: "/courseDetails/LEVEL-0", title: "LEVEL-0" },
      { link: "/courseDetails/LEVEL-1", title: "LEVEL-1" },
      { link: "/courseDetails/LEVEL-2", title: "LEVEL-2" },
      { link: "/courseDetails/PHONETICS", title: "PHONETICS" },
      { link: "/courseDetails/DIGITAL MARKETING", title: "DIGITAL MARKETING" },
      { link: "/courseDetails/FREELANCING", title: "FREELANCING" },
    ];

    // Find the index of the current course in the link array
    const currentIndex = link.findIndex(
      (course) => course.title === currentCourse
    );

    // If the current course is not found or is the last one, return an empty array
    if (currentIndex === -1 || currentIndex === link.length - 1) {
      return [];
    }

    // Return the next courses starting from the next index
    return link.slice(currentIndex + 1);
  }

  const nextCourses = getNextCourses(currentCourse);

  const nextKur = nextCourses ? Object.entries(nextCourses) : "";
  const myResult = result[given]?.result
    ? Object.entries(result[given]?.result)
    : "";
  const myInv = inv[givenInv] ? Object.entries(inv[givenInv]) : "";
  // ##################### search #######################################
  /// ########## get Kurs ##########
  const getKurs = async () => {
    try {
      const res = await Api.get("/atms/api/v1/course");

      if (res.data.data.length > 0) {
        setKurs(res.data.data);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  /// ########## get Kurs end ##########
  //########################## all student start#########
  const getAll = async () => {
    try {
      const res = await Api.get("/atms/api/v1/all-student");
      setMess(res.data.message);
      if (res.data.data.length > 0) {
        setAll(res.data.data);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  //########################## all student end #########
  //########################## view start #########
  const viewStd = async (sub) => {
    try {
      const res = await Api.get(`/atms/api/v1/view-student/${sub}`);

      setLsit(res?.data?.data);
      setBuyer(false);
    } catch (error) {
      console.error("We got error:", error);
    }
  };

  //########################## view end #########

  //########################## kurs card start#########
  const ContCard =
    kurs &&
    kurs?.map((info, i) => (
      <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
        <div className=" flex  gap-x-4">
          <p>{info?.title}</p> Running
        </div>

        <div className="my-2 flex justify-between ">
          <p className="text-pink-200">
            <span className="text-cyan-500 mr-2">
              {`Total Student${info?.totalBuyerList?.length > 1 ? "s" : ""}`}:
            </span>
            {info?.totalBuyerList?.length}
          </p>
          <p
            onClick={() => (
              viewStd(info.title),
              setShowIn(!showIn),
              setMes(false),
              setRes(false),
              setHide(false)
            )}
            className="text-purple-200 cursor-pointer "
          >
            View
          </p>
        </div>
      </div>
    ));
  //########################## kurs card end#########
  //################### result Publish start ########
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setResultData({
      ...resultData,
      [name]: value,
    });
  };
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    const file = files[0];

    if (name === "resultPdf") {
      setResultPdf(file);
    } else if (name === "resultImg") {
      setResultImg(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prepare form data including files
    const formData = new FormData();
    formData.append("resultPdf", resultPdf);
    formData.append("resultImg", resultImg);
    Object.entries(resultData).forEach(([key, value]) => {
      formData.append(key, value);
    });

    try {
      const res = await Api.post(
        `/atms/api/v1/admin/result-publish/${id}`,
        formData,
        {
          "Content-type": "multipart/form-data",
        }
      );

      if (res.data.message !== "") {
        alert(res.data.message);
      }
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  const resultPub = async (info) => {
    setId(info);
  };
  //################### result Publish end ##########
  //################# permission start ##############

  //################# permission end ##############
  //################# drop start ##############
  const dropSt = async () => {
    try {
      const drop = await Api.get(`/atms/api/v1/drop`);
      if (drop) {
        setDropp(drop);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const mesFun = async (id, name) => {
    setMeo({ ...meo, id: id, name: name });
  };

  const handleMess = async (e) => {
    e.preventDefault();

    try {
      const id = meo?.id;
      const mess = meo?.mes;
      const res = await Api.post(`/atms/api/v1/admin/mess-drop/${id}`, {
        mess,
      });
      if (res.data.message !== "") {
        setMeo({
          id: "",
          mess: "",
        });
        alert(res.data.message);
      }
    } catch (error) {
      console.error("We got error:", error);
    }
  };
  //################# drop end ##############
  /// ########## log ##########

  useEffect(() => {
    getKurs();
    getAll();
    dropSt();
  }, []);
  console.log(kurs);
  console.log(all);

  console.log("info:", info);
  console.log("result:", result);
  console.log("inv:", inv);
  console.log("list:", list);
  console.log("id:", id);
  console.log("drop:", dropp);
  console.log("meo:", meo);
  /// ########## log end end ##########
  return (
    <div className="m-7  w-full text-white">
      <p className="text-cyan-700 text-center font-semibold my-4 ">{mess}</p>

      <div className=" ">
        <div>
          <label className="mb- md:text-lg  text-cyan-400">
            Search By Registration Number
          </label>
        </div>{" "}
        <div className="pt-2">
          <input
            type="text"
            name="regi"
            size="lg"
            color="blue"
            onKeyDown={sendData}
            className="border text-center  py-2  bg-[#21262E] px-5 font-semibold text-cyan-500
               rounded  "
            onChange={(e) => handeleChange(e)}
          />
        </div>
      </div>

      <p
        onClick={() => (
          setHide(!hide),
          setMes(false),
          setShowIn(false),
          setBuyer(false),
          setRes(false)
        )}
        className="text-cyan-700 inline-block rounded-md mb-5 cursor-pointer px-4 py-2 border  font-semibold mt-5 "
      >
        {dropp?.data?.message}
      </p>
      <div className="flex flex-wrap gap-4">{ContCard}</div>

      {showIn && (
        <div
          className=" mt-10 max-h-[700px] w-[500px] lg:w-full
         overflow-x-scroll overflow-y-scroll"
        >
          <div
            className="divide-y flex flew-wrap gap-4
           divide-gray-200 dark:divide-gray-700 w-full "
          >
            {list &&
              list?.map((info, i) => (
                <div
                  key={i}
                  className="py-3 p-5 sm:py-4 shadow-xl flex justify-center
                   flex-col items-center rounded-md mb-1 w-[300px]
                   ] text-black bg-gray-300"
                >
                  <div className="flex  flex-col items-center ">
                    <div className="pb-2">
                      <img
                        className="w-20 h-20 rounded-full"
                        src={`${Api.defaults.baseURL}/uploads/${info?.url}`}
                        alt="img"
                      />
                    </div>
                    <div className="">
                      <p className="text-sm py-2 font-bold truncate">
                        {info?.name}
                      </p>
                      <p className="text-sm py-1 truncate">
                        Email: {info?.email}
                      </p>
                      <p className="text-sm py-1 truncate">
                        Mobile: {info?.mobile}
                      </p>
                      <p className="text-sm py-1 truncate">{info?.addrerss}</p>
                      <p className="text-sm py-1 truncate ">
                        {info?.regiNumber}
                      </p>
                      <p className="text-sm py-1 truncate ">
                        Number of course buy: {info?.myCourse?.length}
                      </p>
                      <p className="text-sm  truncate ">
                        Running Course: {info?.activeCourse?.name}
                      </p>
                      <p className="text-sm  truncate ">
                        Running Course end:{" "}
                        {info?.activeCourseEnd?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex justify-between py-2 gap-3">
                    <button
                      onClick={() => (
                        resultPub(info._id), setMes(false), setRes(!res)
                      )}
                      className=" border border-DarkNevy hover:bg-indigo-300 hover:text-white rounded-md px-3 py-1 "
                    >
                      Result Publish
                    </button>
                    <button
                      onClick={() => (
                        mesFun(info._id, info.name),
                        setRes(false),
                        setDro(false),
                        setMes(!mes)
                      )}
                      className=" border border-DarkNevy hover:bg-indigo-300 hover:text-white rounded-md px-3 py-1 "
                    >
                      Message
                    </button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
      {/* ####################### result start ############### */}
      {res && (
        <div className=" mt-4 ">
          <div
            className=" relative p-2 w-full  text-white
           bg-[#2E3658] rounded-md shadow-xl"
          >
            <p className=" text-center text-2xl pb-5">Result</p>

            <form onSubmit={handleSubmit} encType="multipart/form-data">
              <div className="grid grid-cols-1 p-3 lg:grid-cols-2 gap-10">
                <div className="border p-3 border-amber-50">
                  <div className="mb-2 flex justify-between items-center gap-1">
                    <label htmlFor=" "> Point:</label>
                    <input
                      className="bg-[#2E3658]
                       text-white border rounded w-96 py-2 px-2"
                      type="text"
                      name="point"
                      value={resultData.point}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center py-2 gap-1">
                    Grade:
                    <input
                      className="bg-[#2E3658]
                       text-white border rounded w-96  py-2 px-2"
                      type="text"
                      name="grade"
                      value={resultData.grade}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center gap-1">
                    Mark:
                    <input
                      className="bg-[#2E3658]
                  text-white border rounded w-96 py-2 px-2"
                      type="text"
                      name="mark"
                      value={resultData.mark}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-2 flex justify-between items-center py-2 gap-1">
                    Score:
                    <input
                      className="bg-[#2E3658]
                     text-white border rounded w-96 py-2 px-2"
                      type="text"
                      name="score"
                      value={resultData.score}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center gap-1">
                    Total Mark:
                    <input
                      className="bg-[#2E3658]
                    text-white border rounded w-96 py-2 px-2"
                      type="text"
                      name="totalMark"
                      value={resultData.totalMark}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
                <div className="border p-3">
                  <div className="mb-2 flex justify-between items-center gap-1 py-2">
                    <h1 className="text-xl">Result PDF</h1>
                    <input
                      className="bg-[#2E3658] text-white border py-2 rounded-md px-2
                       w-96"
                      type="file"
                      name="resultPdf"
                      accept=".pdf"
                      onChange={handleFileChange}
                    />
                  </div>

                  <div className="mb-2 flex justify-between gap-1">
                    <h1 className="text-xl"> Result Image:</h1>
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="file"
                      name="resultImg"
                      accept="image/*"
                      onChange={handleFileChange}
                    />
                  </div>
                </div>
                <div className=" border p-3 rounded">
                  <div className="mb-2 flex justify-between items-center py-2">
                    NegativeMark:
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="text"
                      name="negativeMark"
                      value={resultData.negativeMark}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center py-2">
                    RightAnswer:
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="text"
                      name="rightAnswer"
                      value={resultData.rightAnswer}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center">
                    WrongAnswer:
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="text"
                      name="wrongAnswer"
                      value={resultData.wrongAnswer}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="mb-2 flex justify-between items-center py-2">
                    Percentage:
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="text"
                      name="percentage"
                      value={resultData.percentage}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="mb-2 flex justify-between items-center py-2">
                    Comment:
                    <input
                      className="bg-[#2E3658] w-96 py-2 text-white border rounded-md px-2"
                      type="text"
                      name="comment"
                      value={resultData.comment}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center py-10">
                {" "}
                <button
                  className="shadow-xl border px-10  py-2 rounded-md hover:bg-blue-gray-300  ease-in duration-500 "
                  type="submit"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {/* ####################### result end ############### */}
      {/* ######## data form ########################### start */}
      {buyer && (
        <div>
          <div>
            <h1 className="text-center font-bold text-2xl pb-12 pt-5">
              {list[0]?.name}`s Course Details
            </h1>

            <div className="flex flex-wrap gap-5 w-full text-white  ">
              <div className=" p-5   bg-[#2E3658] rounded-md shadow-xl">
                <p className=" font-medium text-center mb-2">Running Course</p>
                {actKur &&
                  actKur?.map((key) => (
                    <p key={1} className="py-1">
                      <span className=" font-semibold capitalize text-white">
                        {key[0]}
                      </span>
                      : <span className=" ml-2">{key[1]}</span>{" "}
                    </p>
                  ))}
              </div>
              <div className=" p-5    bg-[#2E3658] rounded-md shadow-xl">
                <p className=" font-medium text-center mb-2">Next Course</p>
                {nextKur &&
                  nextKur?.map((link, title) => (
                    <Link
                      key={1}
                      to={link[1].link}
                      className=" font-medium text-green-500 hover:text-red-400 text-sm block mt-1"
                    >
                      {title + 1}. {link[1].title}{" "}
                    </Link>
                  ))}
                {!nextKur && <p>You have no Course </p>}
              </div>
            </div>
          </div>
          <div className="bg-[#2E3658] shadow-xl mt-10 p-3">
            <h1 className="text-center font-bold text-2xl pt-10">
              {list[0]?.name}`s Result
            </h1>

            <div className=" mt-4  ">
              <div
                className=" grid grid-cols-1 lg:grid-cols-2  gap-10 p-5   text-white 
              rounded-md "
              >
                <div className="border p-5">
                  <p className=" font-medium text-2xl text-yellow-900 mb-2">
                    {result[given]?.data?.coureName}
                  </p>
                  {myResult &&
                    myResult?.map((key, i) => (
                      <ul key={i}>
                        {myResult.length > i + 2 && (
                          <li key={i} className="py-1">
                            <span className="capitalize font-semibold ">
                              {key[0]}
                            </span>
                            : <span className=" font-semibold">{key[1]}</span>
                          </li>
                        )}
                      </ul>
                    ))}
                </div>
                <div
                  className="  
                 border  rounded-lg p-4 gap-5 flex justify-between"
                >
                  <Link
                    to={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultImg}`}
                    className=" shadow-xl rounded-md"
                  >
                    <img
                      src={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultImg}`}
                      alt="resul"
                      className=" object-contain w-[300px] h-[300px]"
                    />
                  </Link>

                  <Link
                    to={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultPdf}`}
                    className=""
                  >
                    <img
                      src="https://i.ibb.co/k22KtLx/download-pdf-icon-template-black-color-editable-download-pdf-icon-symbol-flat-sign-isolated-on-white.jpg"
                      alt="resul"
                      className=" object-contain w-[300px] h-[300px] pb-3"
                    />
                    <span className="px-2 py-2  bg-red-400"> Download</span>
                  </Link>
                </div>
              </div>{" "}
              {myResult && (
                <div className="flex justify-end pt-5  space-x-6 ">
                  <p
                    onClick={() =>
                      setGiv(given === result.length - 1 ? 0 : given + 1)
                    }
                    className=" text-end font-medium cursor-pointer"
                  >
                    NEXT
                  </p>
                  <p
                    onClick={() =>
                      setGiv(given - 1 === -1 ? result.length - 1 : given - 1)
                    }
                    className=" text-start font-medium cursor-pointer "
                  >
                    PREV
                  </p>
                </div>
              )}
              {!myResult && (
                <>
                  <p
                    onClick={() =>
                      setGiv(given === result.length - 1 ? 0 : given + 1)
                    }
                    className=" text-start ml-[140px]   font-medium cursor-pointer"
                  >
                    NEXT
                  </p>
                  <p
                    onClick={() =>
                      setGiv(given - 1 === -1 ? result.length - 1 : given - 1)
                    }
                    className=" text-start ml-[140px] mt-4 font-medium cursor-pointer "
                  >
                    PREV
                  </p>
                </>
              )}
            </div>
          </div>
          <div className=" mt-4 bg-[#2E3658]  ">
            <h1 className="text-center font-bold text-2xl py-10">
              {list[0]?.name}`s Payment Details
            </h1>
            <div className="  p-5 border    text-white   rounded-md shadow-xl">
              <p className=" font-medium mb-2">{inv[givenInv]?.reason}</p>
              {myInv &&
                myInv?.map((key, i) => (
                  <>
                    <p key={i} className="py-1">
                      <span className=" font-semibold capitalize">
                        {key[0]} :
                      </span>
                      <span className=" "> {key[1]}</span>
                    </p>
                  </>
                ))}
            </div>
            {myInv && (
              <div className="flex justify-end  absolute space-x-6 right-[27%] top-4 text-white">
                <p
                  onClick={() =>
                    setGivInv(givenInv === inv.length - 1 ? 0 : givenInv + 1)
                  }
                  className=" text-end font-medium cursor-pointer"
                >
                  NEXT
                </p>
                <p
                  onClick={() =>
                    setGivInv(
                      givenInv - 1 === -1 ? inv.length - 1 : givenInv - 1
                    )
                  }
                  className=" text-start font-medium cursor-pointer "
                >
                  PREV
                </p>
              </div>
            )}
          </div>
          {/* ################# permission ######################## start */}
          <div className=" mt-4 hidden">
            <div className=" relative p-2 w-[50%] h-[300px]  text-white bg-[#2E3658] rounded-md shadow-xl">
              <p className="text-center">
                Permission :{list[0]?.changePermission}
              </p>

              <div className=" flex justify-between mt-2 h-full ">
                <div className=" border-r w-[50%] h-full">
                  <p className="border-b">Hold</p>
                  {list[0]?.stopCourse?.map((info, i) => (
                    <li key={i}>
                      {info?.courseName} {info?.Schedule}{" "}
                      {info?.approve ? "Yes" : "No"}{" "}
                    </li>
                  ))}
                </div>
                <div className="  w-[50%] h-full">
                  <p className="border-b text-end">Wish</p>
                  {list[0]?.changeTo?.map((info, i) => (
                    <li key={i}>
                      {info?.courseName} {info?.Schedule}{" "}
                      {info?.startDate?.split("T")[1]}{" "}
                    </li>
                  ))}
                </div>
              </div>
            </div>
          </div>
          {/* ################# permission ######################## end */}
        </div>
      )}

      <div>
        {hide && (
          <div className=" mt-5 max-h-[700px] w-[500px] lg:w-full overflow-x-scroll overflow-y-scroll">
            <h1 className="text-2xl py-5">Drop Students</h1>

            <div className="divide-y flex flew-wrap gap-4 divide-gray-200 dark:divide-gray-700 w-full ">
              {dropp?.data &&
                dropp?.data?.data?.map((info, i) => (
                  <div
                    key={i}
                    className="py-3 sm:py-4 shadow-xl  rounded-md mb-1 w-[300px] bg-[#2E3658] text-white "
                  >
                    <div className="flex  flex-col items-center">
                      <div className="pb-2">
                        <img
                          className="w-20 h-20 rounded-full"
                          src={`${Api.defaults.baseURL}/uploads/${info?.url}`}
                          alt="img"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          Name: {info?.name}
                        </p>
                        <p className="text-sm  py-1 truncate">
                          Email: {info?.email}
                        </p>
                        <p className="text-sm py-1 truncate">
                          Mobile: {info?.mobile}
                        </p>
                        <p className="text-sm  py-1truncate">
                          Address: {info?.addrerss}
                        </p>
                        <p className="text-sm  py-1 truncate ">
                          Registration: {info?.regiNumber}
                        </p>
                        <p className="text-sm  py-1 truncate ">
                          Number of course buy: {info?.myCourse?.length}
                        </p>
                        <p className="text-sm  py-1 truncate ">
                          Running Course: {info?.activeCourse?.name}
                        </p>
                        <p className="text-sm  truncate ">
                          Running Course end:{" "}
                          {info?.activeCourseEnd?.split("T")[0]}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-center pt-5">
                      <button
                        onClick={() => (
                          mesFun(info._id, info.name),
                          setMes(!mes),
                          setRes(false)
                        )}
                        className=" border rounded-md px-3 py-1 "
                      >
                        Send Message
                      </button>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}

        {mes && (
          <div className=" mt-4">
            <div className=" relative p-5 w-full  h-[300px]  text-white bg-[#2E3658] rounded-md shadow-xl">
              <p className=" text-center  lg:text-start py-3">To {meo.name}</p>

              <div className="">
                <div className="mb-2 ">
                  <textarea
                    rows={5}
                    cols={60}
                    style={{ resize: "none" }}
                    className="bg-[#2E3658] text-white
                      w-full lg:w-96 border p-2 rounded-md px-2"
                    type="text"
                    name="mes"
                    onChange={handleMessChange}
                  />
                </div>

                <button
                  onClick={handleMess}
                  className="shadow-xl border px-4 py-2 rounded-md hover:bg-blue-gray-300  ease-in duration-500 "
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
export default AdminStudent;
