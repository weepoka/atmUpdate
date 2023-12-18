import { Icon } from "@iconify/react";
import React, { useState, useEffect } from "react";

import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";

import ReactApexChart from "react-apexcharts";
import Api from "../HomePage/Api";

import {
  Card,
  Typography,
  CardBody,
  Chip,
  Avatar,
} from "@material-tailwind/react";
const data = {
  series: [
    {
      name: "Revenue",
      data: [76, 85, 101, 98, 87, 105, 91, 114, 94],
    },
  ],
  options: {
    chart: {
      type: "bar",
      height: 350,
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: "55%",
        endingShape: "rounded",
      },
    },
    dataLabels: {
      enabled: false,
    },
    stroke: {
      show: true,
      width: 2,
      colors: ["transparent"],
    },
    xaxis: {
      categories: [
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
      ],
    },
    yaxis: {
      title: {
        text: "taka (thousands)",
      },
    },
    fill: {
      opacity: 1,
    },
    tooltip: {
      y: {
        formatter: function (val) {
          return "Taka " + val + " thousands";
        },
      },
    },
  },
};

const TABLE_HEAD = [
  "Course",
  "Start date",
  "Duration",
  "Total Student",
  "Status",
];

const TABLE_ROWS = [
  {
    name: "Spotify",
    amount: "$2,500",
    date: "Wed 3:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "",
    name: "Amazon",
    amount: "$5,000",
    date: "Wed 1:00pm",
    status: "paid",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "",
    name: "Pinterest",
    amount: "$3,400",
    date: "Mon 7:40pm",
    status: "pending",
    account: "master-card",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "",
    name: "Google",
    amount: "$1,000",
    date: "Wed 5:00pm",
    status: "paid",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
  {
    img: "",
    name: "netflix",
    amount: "$14,000",
    date: "Wed 3:30am",
    status: "cancelled",
    account: "visa",
    accountNumber: "1234",
    expiry: "06/2026",
  },
];
const Dashboard = () => {
  const [value, onChange] = useState(new Date());
  const [state, setState] = useState(data);
  const [visit, setVisit] = useState("");
  const [std, setStd] = useState("");
  const [kur, setKur] = useState("");
  const [emp, setEmp] = useState("");
  const [qr, setQr] = useState("");
  const [to, setTo] = useState("");
  const [koge, setKo] = useState([""]);

  //############ Count visitor start #############
  const vsitor = async () => {
    try {
      const res = await Api.get(`/atms/api/v1/visitor`);

      setVisit(res.data.data);
      const std = await Api.get(`/atms/api/v1/all-student`);
      setStd(std.data.message);
      const cur = await Api.get(`/atms/api/v1/course`);
      setKo(cur.data.data);
      setKur(cur.data.data.length);
      const empp = await Api.get(`/atms/api/v1/employee`);
      setEmp(empp.data.length);
      const qrr = await Api.get(`/atms/api/v1/query`);
      setQr(qrr.data.length);
      const today = await Api.get(`/atms/api/v1/appointment-today`);
      setTo(today.data.data.length);
    } catch (error) {
      console.error("We got error:", error);
    }
  };
  useEffect(() => {
    vsitor();
  }, []);
  console.log("visit:", visit);
  //############ Count visitor end ###############

  //######### log #######

  //######### log #######

  return (
    <div className="m-10 lg:w-full w-[60%] ">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4  gap-10 w-full">
        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="mdi:graph-bar" color="#fde047" width={25} />
          </p>
          <h1 className="py-1">Total Visitors</h1>
          <p className="text-[#ec4899]">{visit}</p>
        </div>
        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="icons8:student" width={30} color="#fde047" />
          </p>
          <h1 className="py-1">Total Students</h1>
          <p className="text-[#ec4899]">{std.split(":")[1]}</p>
        </div>

        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="tdesign:course" width={25} color="#fde047" />
          </p>
          <h1 className="py-1">Total Courses</h1>
          <p className="text-[#ec4899]">{kur}</p>
        </div>
        {/* <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="tabler:currency-taka" color="#fde047" width={25} />
          </p>
          <h1 className="py-1">Total Earn</h1>
          <p className="text-[#ec4899] flex items-center gap-2">
            <Icon icon="tabler:currency-taka" color="#ec4899" width={20} />
            200
          </p>
        </div> */}
        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="tdesign:course" width={25} color="#fde047" />
          </p>
          <h1 className="py-1">Total Employee</h1>
          <p className="text-[#ec4899]">{emp}</p>
        </div>
        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon icon="carbon:query" width={25} color="#fde047" />
          </p>
          <h1 className="py-1">Total Query</h1>
          <p className="text-[#ec4899]">{qr}</p>
        </div>
        <div
          className="hover:shadow-[10px_10px_10px_rgba(253,224,71,0.1)] cursor-pointer transition-all duration-300
               hover:duration-300 border-[1px] rounded-[0.55rem]  
               border-amber-admin p-[20px] flex flex-col items-center
                justify-center text-cyan-400 font-semibold 
               text-md"
        >
          <p>
            <Icon
              icon="ant-design:schedule-twotone"
              width={25}
              color="#fde047"
            />
          </p>
          <h1 className="py-1">Todays Appointments Schedules</h1>
          <p className="text-[#ec4899]">{to}</p>
        </div>
      </div>
      <div></div>

      <div className="grid grid-cols-1 gap-5 py-10">
        {/* <div className="">
          <ReactApexChart
            options={state.options}
            series={state.series}
            type="bar"
            className="bg-white rounded-3xl p-2"
            height={350}
          />
        </div> */}
        <div className="bg-[#ff6a59] rounded-3xl">
          {" "}
          <div className="p-[1.87rem] flex-1 ">
            <Calendar
              onChange={onChange}
              value={value}
              // tileClassName="text-white "
              className="bg-inherit text-white  border-0 w-full"
            />
          </div>
        </div>
      </div>

      <section className="py-10">
        <Card className=" lg:w-full md:w-[80%] w-[350px]">
          <CardBody
            className="overflow-x-visible 
           overflow-auto  px-0"
          >
            <table className="w-full min-w-max table-auto text-left">
              <thead>
                <tr>
                  {TABLE_HEAD.map((head) => (
                    <th
                      key={head}
                      className="border-y border-blue-gray-100 bg-blue-gray-50/50 p-4"
                    >
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal leading-none opacity-70"
                      >
                        {head}
                      </Typography>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {koge?.map(
                  (
                    {
                      title,
                      startDate,
                      courseDuration,
                      totalBuyerList,
                      onLine,
                      offLine,
                    },
                    index
                  ) => {
                    const isLast = index === TABLE_ROWS.length - 1;
                    const classes = isLast
                      ? "p-4"
                      : "p-4 border-b border-blue-gray-50";

                    return (
                      <tr key={name}>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {title}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {startDate?.split("T")[0]}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {courseDuration}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <Typography
                            variant="small"
                            color="blue-gray"
                            className="font-normal"
                          >
                            {totalBuyerList?.length}
                          </Typography>
                        </td>
                        <td className={classes}>
                          <div className="w-max">
                            <Chip
                              size="sm"
                              variant="ghost"
                              value={offLine}
                              color={onLine ? "Online" : "red"}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  }
                )}
              </tbody>
            </table>
          </CardBody>
        </Card>
      </section>
    </div>
  );
};

export default Dashboard;
