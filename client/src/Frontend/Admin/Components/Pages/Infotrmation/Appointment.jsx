import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../HomePage/Api";

const Appointmentt = () => {
  const [cont, setCont] = useState([""]);

  const [show, setShow] = useState(false);
  const [up, setUp] = useState(true);
  const [today, setToday] = useState(true);
  const [card, setcard] = useState(true);
  const [data, setData] = useState({
    id: "",
    confirmDate: "",
    visited: "",
  });
  const handeleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const replayF = (id) => {
    setShow(!show);
    setUp(true);
    setData({ ...data, id: id });
  };
  ////###### get Conact ########

  const contactList = async (end) => {
    try {
      const res = await Api.get(`/atms/api/v1/${end}`);
      console.log(res);
      if (res.data.data) {
        setcard(true);
        return setCont(res.data.data);
      }
    } catch (err) {
      console.log(err.code);
      setcard(false);
      alert(err.status === undefined ? " NO Appointment" : err.status);
    }
  };
  ////###### get Conact ########

  ////###### replay Conact start########
  const sendReplay = async () => {
    console.log(data);
    try {
      if (data.visited === "") {
        alert("Fill the message");
        return;
      }

      await Api.post(`/atms/api/v1/appointment-update`, data);

      // alert("Replay Send")
      setShow(false);
    } catch (error) {
      console.error("Error:", error.status);
    }
  };
  ////###### replay Conact end########

  const ContCard =
    cont &&
    cont?.map((info, i) => (
      <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
        <div className=" ">
          <p className="text-red-700">{info?.reasonForVisit}</p>
          <p>{info?.firstName}</p>
          <p>{info?.email}</p>
          <p>{info?.mobile}</p>
        </div>

        <div className="my-2 ">
          <p className="text-pink-200">Visited : {info?.visited}</p>
          <p className="text-pink-200">isFirstVisit: {info?.isFirstVisit}</p>

          <p className="text-purple-200 ">
            Visiting approve: {info?.approve ? "Confirm" : " NO"}
          </p>
          <p className="text-purple-200 ">{info?.visitingTime}</p>
        </div>
        <p>{info?.sendDate?.split("T")[0]}</p>

        <hr />
        <p className="text-red-200 ">{info?.replyMessage}</p>
        <p className="inline-block mr-2">Visiting Date:</p>
        <p className="inline-block"> {info?.visitingDate?.split("T")[0]}</p>
        <p className="inline-block mr-2">Confirm Date:</p>
        <p className="inline-block"> {info?.confirmDate?.split("T")[0]}</p>
        <div className=" flex justify-between items-center mt-4">
          {up && (
            <p
              onClick={() => replayF(info?._id)}
              className="cursor-pointer font-medium py-2 px-2 text-green-600 rounded-md shadow-lg bg-[#2a3544]"
            >
              Update Now
            </p>
          )}
          <p
            onClick={() => handle(info._id)}
            className=" text-end text-red-500 font-semibold text-base cursor-pointer"
          >
            Delete
          </p>
        </div>
      </div>
    ));

  //######### del contact####

  const handle = async (id) => {
    try {
      const confirm = window.confirm("Are you sure? ");
      if (!confirm) {
        return;
      }

      const res = await Api.delete(`/atms/api/v1/appointment/${id}`);
      contactList();
      alert(res.data.message);
    } catch (error) {
      console.log(error.status);
    }
  };
  //######### del contact####
  //############ log start ################
  console.log(cont);
  //############ log end ################

  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div>
        <h1 className="text-2xl text-center underline">Appointment Query</h1>
      </div>
      <div className="flex flex-wrap gap-4 p-4">
        <button
          onClick={() => (
            contactList("appointment-today"),
            setUp(true),
            setToday(false),
            setShow(false)
          )}
          className="bg-blue-600 rounded-md text-center  px-10 py-2"
        >
          Today
        </button>
        <button
          onClick={() => (
            contactList("appointment-next"), setUp(false), setShow(false)
          )}
          className="bg-blue-600 rounded-md text-center  px-10 py-2"
        >
          Next
        </button>
        <button
          onClick={() => (
            contactList("appointment-ex"),
            setUp(true),
            setToday(true),
            setShow(false)
          )}
          className="bg-blue-600 rounded-md text-center  px-10 py-2"
        >
          Waiting For Approve
        </button>
        <button
          onClick={() => (
            contactList("appointment-del"), setUp(false), setShow(false)
          )}
          className="bg-blue-600 rounded-md text-center  px-10 py-2"
        >
          Expired Appointment
        </button>
      </div>
      {card && <div className="flex gap-2 flex-wrap">{ContCard}</div>}
      {show && (
        <div className="pb-10 mt-4">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl text-center tracking-wide pl-5">
                Appointment Update
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Appointment ID
                  </label>
                </div>{" "}
                <div>
                  <input
                    type="text"
                    name="id"
                    size="lg"
                    color="blue"
                    value={data.id}
                    className="border text-center py-2  bg-[#21262E] px-5 font-semibold text-cyan-500
               rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="Id"
                    onChange={(e) => handeleChange(e)}
                    disabled
                  />
                </div>
              </div>
            </div>
            {today && (
              <div className=" mb-7 px-5">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-20">
                  {" "}
                  <div>
                    <label className="mb-2 md:text-lg  text-gray-400">
                      Confirm Date
                    </label>
                  </div>{" "}
                  <div>
                    <input
                      type="date"
                      name="confirmDate"
                      required
                      size="lg"
                      color="blue"
                      className="border py-6 px-5 bg-[#21262E] text-white resize-none
               rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                      label=" Replay"
                      onChange={(e) => handeleChange(e)}
                    />
                  </div>
                </div>
              </div>
            )}
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Has Visited
                  </label>
                </div>{" "}
                <div>
                  <select
                    name="visited"
                    required
                    size="lg"
                    color="blue"
                    className="border py-2 px-3 bg-[#21262E] text-white resize-none
               rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Replay"
                    onChange={(e) => handeleChange(e)}
                  >
                    <option value="No">NO</option>
                    <option value="Yes">YES</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-10">
            <button
              onClick={sendReplay}
              className="bg-blue-600 rounded-md text-center  px-10 py-2"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Appointmentt;
