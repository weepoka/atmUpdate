
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import Api from "../../Axios/Api";
import { Icon } from "@iconify/react";
import { Button, Table } from "antd";
import { useSelector } from "react-redux";
import BuyerList from "../../BuyerList";

const CourseDetails = () => {
  const { id } = useParams();
  const userData = useSelector((state) => state);
  const rxInf = userData?.userInfo?.userInfo;


  // kurs details
  const [uni, setUni] = useState(null);

  const studyAbroad = async () => {
    try {
      const res = await Api.get(`/atms/api/v1/course-id/${id}`);
      setUni(res.data.data);
    } catch (err) {
      console.error(err);
    }
  };

  // online and oofline Product start
  const [onlineView, setOnlineView] = useState([""]);
  const [oflineView, setOflineView] = useState([""]);
  const [showOn, setOn] = useState(true);
  const [showOFF, setOf] = useState(true);
  const [hide, setHide] = useState(true);
  const [buyer, setBuyer] = useState(false);
  const [list, setLsit] = useState(['']);
  const [me, setMe] = useState(['']);
  const uid = id;

  const onLine = async () => {
    setOf(false);
    setOn(true);
    try {
      const regi = rxInf?.regiNumber.split("-")[1]
      const res = await Api.get(`/atms/api/v1/course/online/${uid}`);
      setOnlineView(res.data.data);
      setOver(false);
      const meData = await Api.get(`/atms/api/v1/regi-view/${regi}`)
      if (meData.data.data[0]) {
        setMe(meData.data.data[0])
      }
    } catch (err) {
      console.error(err);
      setOver(true);
    }
  };


  const offLine = async () => {
    setOf(true);
    setOn(false);
    try {

      const res = await Api.get(`/atms/api/v1/course/offline/${uid}`);
      setOflineView(res.data.data);
      setOver(false);
    } catch (err) {
      console.error(err);
      setOver(true);
    }
  };

  const [over, setOver] = useState(true);
  const courseOveronlineView = () => {
    setOver(!over);
    setOf(false);
    setOn(false);
  };


  // online and oofline Product end 

  //########## total student #######

  const offSum = oflineView?.reduce((prev, curr) => {
    console.log(prev);
    return prev + curr.remainingSeat;
  }, 0);

  const onSum = onlineView?.reduce((prev, curr) => {
    return prev + curr.remainingSeat;
  }, 0);




  //########## total student end  #######


  //*************************************************** *//
  useEffect(() => {
    studyAbroad();
    offLine();
    onLine();
  }, [uid]);



  //*************************************************** *//
  //*************************************************** *//
  //*********************Payment Create**************** *//

  const makePayment = async (idx, a, uni, rxInf, courseFee) => {
    try {
      let id = rxInf._id;
      let name = rxInf.name;
      let email = rxInf.email;

      let cid = uni._id;
      let courseName = uni.title;

      let option = a;
      let startDate = uni.startDate;
      let routine = idx.routine;
      let classTime = idx.classTime;
      console.log(
        "payment:",
        id,
        cid,
        name,
        email,
        courseName,
        option,
        startDate,
        routine,
        classTime,
        courseFee
      );

      const res = await Api.post("atms/api/v1/student/purchase", {
        id,
        cid,
        name,
        email,
        courseName,
        option,
        startDate,
        routine,
        classTime,
        courseFee,
      });

      console.log(res);
      window.open(res.data.url, "_blank");
    } catch (err) {
      console.log(err.code);
    }
  };
  //*********************Payment End***************** *//
  //*************************************************** *//
  //*************************************************** *//
  const columns = [
    {
      title: "SL",
      dataIndex: "SeriulNumber",
      key: "SeriulNumber",
    },
    {
      title: "Class Time",
      dataIndex: "classTime",
      key: "classTime",
    },
    {
      title: "Routine",
      dataIndex: "routine",
      key: "routine",
    },
    {
      title: "SEAT",
      dataIndex: "seat",
      key: "seat",
      render: (text, item) => <p>{item.seat}</p>,
    },
    {
      title: "REMAINING SEAT",
      dataIndex: "remainingSeat",
      key: "remainingSeat",
      render: (text, item) => <p>{item.remainingSeat}</p>,
    },
    {
      title: "Admission",
      dataIndex: "",
      key: "x",
      render: (text, item, i) =>
        item.remainingSeat === 0 ? (
          <Button className="text-center text-red-400 cursor-not-allowed">Admit</Button>
        ) : (
          <Button
            onClick={() =>
              makePayment(
                item,
                onlineView.length === 4 ? i + 1 : i + 5,
                uni,
                rxInf,
                onlineView.length === 4
                  ? uni?.onlineFee?.courseFee
                  : uni?.offlineFee?.courseFee
              )
            }
            className={`text-center  cursor-pointer  ${item.remainingSeat === 0 || !hide ? "text-red-600 cursor-not-allowed opacity-50" : ""
              }`}
            disabled={item.remainingSeat === 0 || !hide}
          >
            Admit
          </Button>
        ),
    },
  ];
  const modifiedOnlineView = onlineView.map((item, index) => ({
    ...item,
    SeriulNumber: index + 1,
  }));
  const columnss = [
    {
      title: "SL",
      dataIndex: "SeriulNumber",
      key: "SeriulNumber",
    },
    {
      title: "Class Time",
      dataIndex: "classTime",
      key: "classTime",
    },
    {
      title: "Routine",
      dataIndex: "routine",
      key: "routine",
    },
    {
      title: "SEAT",
      dataIndex: "seat",
      key: "seat",
      render: (text, item) => <p>{item.seat}</p>,
    },
    {
      title: "REMAINING SEAT",
      dataIndex: "remainingSeat",
      key: "remainingSeat",
      render: (text, item) => <p>{item.remainingSeat}</p>,
    },
    {
      title: "Admission",
      dataIndex: "",
      key: "x",
      render: (text, item, i) =>
        (item.remainingSeat === 0) ? (
          <div className="text-center text-red-400 cursor-not-allowed ">Admit</div>
        ) : (

          <Button
            onClick={() =>
              makePayment(
                item,
                onlineView.length === 4 ? i + 1 : i + 5,
                uni,
                rxInf,
                onlineView.length === 4
                  ? uni?.onlineFee?.courseFee
                  : uni?.offlineFee?.courseFee
              )
            }
            className={`text-center  cursor-pointer  ${item.remainingSeat === 0 || !hide ? "cursor-not-allowed opacity-50" : ""
              }`}
            disabled={item.remainingSeat === 0 || !hide}
          >
            Admit
          </Button>
        ),
    },
  ];
  const modifiedOnlineViews = oflineView.map((item, index) => ({
    ...item,
    SeriulNumber: index + 1,
  }));

  //################# view student #########
  const viewStd = async (sub) => {

    try {
      const res = await Api.get(`/atms/api/v1/view-student/${sub}`)

      setLsit(res.data.data)
      setBuyer(true)

    } catch (error) {
      console.error("We got error:", error)
    }

  }
  //############### console.log###
  console.log("oflineView:", oflineView)
  console.log("onlineView:", onlineView)
  console.log("List:", list)
  console.log("me:", me)

  //############### console.log###
  return (
    <>
      <div>
        <div className="">
          <img
            src={`${Api.defaults.baseURL}/uploads/${uni?.url}`}
            alt=""
            className="object-cover h-[600px] w-full"
          />
        </div>
        <div className="max-w-screen-2xl mx-auto py-24 px-5">
          <div className="border md:p-10 p-2 rounded-2xl">
            <div className="relative ">
              <h1
                data-aos=""
                className="text-[20px] md:text-[34px] capitalize text-center pb-10 font-bold"
              >
                Top {uni?.title} in Dhaka, Bangladesh{" "}
              </h1>
              <img
                src={uni?.url}
                alt=""
                className="rounded-2xl"
                data-aos="fade-up"
              />

              <div>
                <div className="flex justify-between">
                  <div>
                    <h3 className="text-xl font-bold my-10">
                      Course OveronlineView
                    </h3>
                    <ul className="md:px-10">
                      <li className="flex items-center  gap-2">
                        {" "}
                        <Icon
                          icon="charm:square-tick"
                          color="blue "
                          width={25}
                        />
                        Duration {uni?.courseDuration} Months
                      </li>
                      <li className="flex py-2 items-center gap-2">
                        <Icon
                          icon="charm:square-tick"
                          color="blue "
                          width={25}
                        />
                        Class {uni?.classesNumber} (Main Class)
                      </li>
                      <li className="flex items-center gap-2">
                        <Icon
                          icon="charm:square-tick"
                          color="blue "
                          width={25}
                        />
                        Extra Class {uni?.extarClass} free
                      </li>
                      <li className="flex items-center py-2 gap-2">
                        <Icon
                          icon="charm:square-tick"
                          color="blue "
                          width={25}
                        />
                        Mock Test {uni?.mockTest}+ free
                      </li>
                    </ul>
                  </div>

                  <div>
                    <div className="my-10">
                      <h1 className="font-bold my-10  text-xl">
                        {"Online Fee"}
                      </h1>


                      <ul className="md:px-10">
                        <li className="flex items-center  gap-2">
                          {" "}
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Course Fee: {uni?.onlineFee?.courseFee} Tk.
                        </li>
                        <li className="flex py-2 items-center gap-2">
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Books Fee: {uni?.onlineFee?.bookFee} (Main Class)
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Total Fee: {uni?.onlineFee?.totalFee} Tk
                        </li>
                      </ul>

                    </div>
                  </div>

                  <div>
                    <div className="">
                      <h1 className="font-bold my-10  text-xl">
                        {"Offline Fee"}
                      </h1>


                      <ul className="md:px-10">
                        <li className="flex items-center  gap-2">
                          {" "}
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Course Fee: {uni?.offlineFee?.courseFee} Tk.
                        </li>
                        <li className="flex py-2 items-center gap-2">
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Books Fee: {uni?.offlineFee?.bookFee} (Main Class)
                        </li>
                        <li className="flex items-center gap-2">
                          <Icon
                            icon="charm:square-tick"
                            color="red "
                            width={25}
                          />
                          Total Fee: {uni?.offlineFee?.totalFee} Tk
                        </li>
                      </ul>

                    </div>
                  </div>


                </div>
              </div>

              <div className="h-[240px] shadow-xl p-4  border rounded-md flex justify-between">
                <div>
                  <p className="font-medium">Running Class</p>
                  {uni?.runningClass && Object.values(uni?.runningClass).map((classData, i) => {

                    const checkDate = classData.split("T")[0]
                    const matchToday = new Date().toISOString().split("T")[0]



                    return (<>
                      {
                        (checkDate === matchToday && i === 4) ? (
                          <>
                            {() => setHide(false)}
                            <p key={i} className="mt-1 text-red-600 font-semibold text-xl">
                              "Students are not allowed to enroll in this course as five classes have already been completed."
                            </p>
                          </>
                        ) : (
                          <li key={i} className={`mt-1 ${i === 4 ? "text-red-600" : "text-green-600"}`}>
                            {classData.split("T")[0]}
                          </li>
                        )
                      }

                    </>)

                  })}
                </div>
                {me?.role === "Admin" &&
                  <div onClick={() => viewStd(uni.title)} className=" text-md font-semibold p-1 cursor-pointer text-end shadow-xl h-[100px] rounded-md">
                    <p>Offline Student: {300 - offSum || 0}</p>
                    <p className="border-b pb-1 border-black">Online Student:  {120 - onSum || 0}</p>
                    <p> Total Students:{(300 - offSum || 0) + (120 - onSum || 0)} </p>
                  </div>}
              </div>


              <h1 className="text-xl font-bold mt-10 mb-5">Online Schedule </h1>
              <Table columns={columns} dataSource={modifiedOnlineView} />
              {showOn && (
                <h1 className="font-bold py-5 text-red-600 text-xl">
                  {!uni?.online && "Offline No Schedule"}
                </h1>
              )}
              <h1 className="text-xl font-bold mt-10 mb-5">
                Offline Schedule{" "}
              </h1>
              <Table columns={columnss} dataSource={modifiedOnlineViews} />

              {showOFF && (
                <h1 className="font-bold py-5 text-red-600 text-xl">
                  {!uni?.offline && "Offline No Schedule"}
                </h1>
              )}


              {(me?.role === "Admin" && buyer) && <div className="max-w-2xl mx-auto absolute top-32 right-20">

                <div className="p-4 max-w-md bg-white rounded-lg border shadow-md sm:p-8 dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Buyer List</h3>
                    <h3 className="text-xl font-bold leading-none text-gray-900 dark:text-white">Purchase</h3>

                  </div>
                  <div className="flow-root h-[700px]  overflow-y-scroll">
                    <ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
                      {list && list?.map((info, i) => (
                        <li key={i} className="py-3 sm:py-4 shadow-xl rounded-md mb-1 w-[300px] bg-[#2E3658] text-white ">

                          <div className="flex items-center space-x-4">
                            <div className="flex-shrink-0">
                              <img className="w-10 h-10 rounded-full" src={`${Api.defaults.baseURL}/uploads/${info?.url}`} alt="img" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium truncate">
                                {info?.name}
                              </p>
                              <p className="text-sm truncate">
                                {info?.email}

                              </p>
                              <p className="text-sm  truncate ">
                                {info?.regiNumber}

                              </p>
                            </div>
                            <div className="inline-flex items-center text-base font-semibold  ">
                              {info?.myCourse?.length}
                            </div>
                          </div>

                        </li>
                      ))}

                    </ul>
                  </div>
                  <p onClick={() => setBuyer(false)} className="text-center text-red-600  cursor-pointer text-xl font-bold">X</p>
                </div>

              </div>}




            </div>

          </div>

        </div>
      </div >
    </>
  );
};

export default CourseDetails;
