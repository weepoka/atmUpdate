import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Table } from "antd";
import Api from "../../Axios/Api";


const Profile = () => {
  const userData = useSelector((state) => state);
  const navigate = useNavigate()
  const redux = userData?.userInfo?.userInfo?.isEmailVerify
  const red = userData?.userInfo?.userInfo
  const [info, setInf] = useState([""])
  const [result, setResult] = useState([""])
  const [inv, setInv] = useState([""])
  const [given, setGiv] = useState(0)
  const [givenInv, setGivInv] = useState(0)


  //######################## get student start ####
  const getStudent = async () => {
    try {
      const uid = red?._id
      const res = await Api.get(`/atms/api/v1/student/${uid}`)
      if (res.data) {
        setInf(res.data)
      }
    } catch (err) {
      console.log(err.code)
    }

  }
  //######################## get student end ####

  //######################## my course table start ####

  //######active course start####
  const actKur = info?.data?.activeCourse ? Object.entries(info?.data?.activeCourse) : ""
  //######active course end ####
  //######Next course end ####

  //######Next course end ####

  //######Result start####
  const getResult = async () => {
    try {
      const uid = red?._id
      const res = await Api.get(`/atms/api/v1/student/result/${uid}`)
      if (res.data) {
        setResult(res.data.data.result)
      }
    } catch (err) {
      console.log(err.code)
    }

  }


  //######Result end ####

  //######Payment start ####
  const getVoice = async () => {
    try {
      const email = red?.email
      const res = await Api.get(`/atms/api/v1/my-invoice/${email}`)
      if (res.data) {
        setInv(res.data.data)
      }
    } catch (err) {
      console.log(err.code)
    }

  }

  //######Payment end ####



  //##### my next Course ######

  const currentCourse = actKur ? actKur[1][1] : ""

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
    const currentIndex = link.findIndex((course) => course.title === currentCourse);

    // If the current course is not found or is the last one, return an empty array
    if (currentIndex === -1 || currentIndex === link.length - 1) {
      return [];
    }

    // Return the next courses starting from the next index
    return link.slice(currentIndex + 1);
  }

  const nextCourses = getNextCourses(currentCourse);

  const nextKur = nextCourses ? Object.entries(nextCourses) : ""
  const myResult = result[given]?.result ? Object.entries(result[given]?.result) : ""
  const myInv = inv[givenInv] ? Object.entries(inv[givenInv]) : ""




  //######################## my course table end ####


  useEffect(() => {

    if (!redux) {
      navigate("/")
    }
    getStudent()
    getResult()
    getVoice()

  }, [])

  //##### console####
  console.log("Invoice:", inv)
  console.log("nextK:", nextKur)
  //##### console####
  return (
    <div className="mb-10">
      <div className="max-w-screen-2xl mx-auto px-5 md:px-0">
        <div>

          <div className="grid grid-cols-1 md:grid-cols-2  ">
            <div className="md:col-span-2 flex items-center justify-center shadow-xl  p-4 overflow-hidden relative">
              <img src={userData?.userInfo?.userInfo?.url} alt="" className="w-60 rounded-2xl border border-[#2E3658] shadow-xl hover:scale-105 duration-500 ease-in-out" />
              <p className="pt-2 font-semibold absolute bottom-4">
                {userData?.userInfo?.userInfo?.regiNumber}
              </p>
            </div>

            <div className="md:col-span-2 shadow-xl bg-[#2E3658] text-white p-2 rounded-md z-20">
              <h1 className="font-bold text-xl text-center md:text-start border-b-2">
                Profile Details
              </h1>
              <div className="grid grid-cols-1 md:grid-cols-3  gap-10 py-3">
                <div>
                  <h2 className="font-bold">Name </h2>
                  <p className="pt-2">
                    {userData?.userInfo?.userInfo?.name}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold">
                    Email{" "}
                    <span className=" border-l text-[#006fba] pl-1">
                      {" "}
                      Change
                    </span>
                  </h2>
                  <p className="pt-2 text-sm">
                    {userData?.userInfo?.userInfo?.email}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold">
                    Registration{" "}

                  </h2>
                  <p className="pt-2 text-sm">
                    {userData?.userInfo?.userInfo?.regiNumber}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold">
                    Contact No{" "}
                    <span className=" border-l text-[#006fba] pl-1">
                      {" "}
                      Change
                    </span>
                  </h2>
                  <p className="pt-2">
                    {userData?.userInfo?.userInfo?.mobile}
                  </p>
                </div>
                <div>
                  <h2 className="font-bold">
                    Address{" "}
                    <span className=" border-l text-[#006fba] pl-1">
                      {" "}
                      Change
                    </span>
                  </h2>
                  <p className="pt-2">
                    {userData?.userInfo?.userInfo?.addrerss}
                  </p>
                </div>

              </div>

            </div>
          </div>
          
          <div>
            <h1 className="text-center font-bold text-2xl pb-12 pt-5">
              My Course Details
            </h1>

          </div>
          <div className="flex justify-center space-x-10 w-full text-white  overflow-hidden">
            <div className="w-[23%] p-2  hover:scale-105 duration-300 ease-in bg-[#2E3658] rounded-md shadow-xl">
              <p className=" font-medium text-center mb-2">Running Course</p>
              {actKur && actKur?.map((key) => (
                <p key={1} ><span className=" font-semibold text-white">{key[0]}</span>:  <span className=" ml-2">{key[1]}</span> </p>
              ))}

            </div>
            <div className="w-[23%] p-2  hover:scale-105 duration-300 ease-in bg-[#2E3658] rounded-md shadow-xl" >
              <p className=" font-medium text-center mb-2">Next Course</p>
              {nextKur && nextKur?.map((link, title) => (
                <Link key={1} to={link[1].link} className=" font-medium text-green-500 text-sm block mt-1">
                  {title + 1}. {link[1].title}  </Link>
              ))}
              {!nextKur && <p>You have no Course </p>}
            </div>
          </div>


          <h1 className="text-center font-bold text-2xl pt-10">
            My Result
          </h1>

          <div className="flex justify-center mt-4 overflow-hidden ">

            <div className=" relative p-2 w-[50%] h-[300px]  text-white bg-[#2E3658] rounded-md shadow-xl">
              <p className=" font-medium mb-2">{result[given]?.data?.coureName}</p>
              {myResult && myResult?.map((key, i) => (

                <>
                  {myResult.length > i + 2 && (
                    <p key={i} ><span className=" font-semibold">{key[0]}</span>:  <span className=" font-semibold">{key[1]}</span></p>

                  )}


                </>))}
              <div className=" w-[340px] hover:scale-105 duration-300 ease-in h-[180px] bg-white absolute top-4 right-4 rounded-lg p-4 flex justify-between">
                <Link to={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultImg}`} className="w-[50%] shadow-xl rounded-md">
                  <img src={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultImg}`} alt="resul" className="w-[300px] h-[145px]" />
                </Link>

                <Link to={`${Api.defaults.baseURL}/uploads/${result[given]?.result?.resultPdf}`} className="w-[50%]">
                  <img src="https://i.ibb.co/k22KtLx/download-pdf-icon-template-black-color-editable-download-pdf-icon-symbol-flat-sign-isolated-on-white.jpg" alt="resul" />
                </Link>

              </div>
              {myResult &&
                <div className="flex justify-end  space-x-6 ">
                  <p onClick={() => setGiv(given === result.length - 1 ? 0 : given + 1)} className=" text-end font-medium cursor-pointer">NEXT</p>
                  <p onClick={() => setGiv(given - 1 === -1 ? result.length - 1 : given - 1)} className=" text-start font-medium cursor-pointer ">PREV</p>
                </div>}
              {!myResult && <>
                <p onClick={() => setGiv(given === result.length - 1 ? 0 : given + 1)} className=" text-start ml-[140px]   font-medium cursor-pointer">NEXT</p>
                <p onClick={() => setGiv(given - 1 === -1 ? result.length - 1 : given - 1)} className=" text-start ml-[140px] mt-4 font-medium cursor-pointer ">PREV</p>
              </>}
            </div>

          </div>





          <h1 className="text-center font-bold text-2xl pt-10">
            My Payment Details
          </h1>

          <div className="flex justify-center mt-4 overflow-hidden relative ">

            <div className=" relative p-2 w-[50%] h-[300px]  text-white bg-[#2E3658] rounded-md shadow-xl">
              <p className=" font-medium mb-2">{inv[givenInv]?.reason}</p>
              {myInv && myInv?.map((key, i) => (

                <>

                  <p key={i} ><span className=" font-semibold">{key[0]}</span>:  <span className=" font-semibold">{key[1]}</span></p>




                </>))}



            </div>
            {myInv &&
              <div className="flex justify-end  absolute space-x-6 right-[27%] top-4 text-white">
                <p onClick={() => setGivInv(givenInv === inv.length - 1 ? 0 : givenInv + 1)} className=" text-end font-medium cursor-pointer">NEXT</p>
                <p onClick={() => setGivInv(givenInv - 1 === -1 ? inv.length - 1 : givenInv - 1)} className=" text-start font-medium cursor-pointer ">PREV</p>
              </div>}
          </div>


        </div>
      </div>
    </div>

  );
};

export default Profile;
