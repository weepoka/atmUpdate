import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Api from "../HomePage/Api";

const Query = () => {
  const [cont, setCont] = useState([""]);
  const [show, setShow] = useState(false);
  const [data, setData] = useState({
    id: "",
    replyMessage: "",
  });
  const handeleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const replayF = (id) => {
    setShow(true);
    setData({ ...data, id: id });
  };
  ////###### get Conact ########

  const contactList = async () => {
    try {
      const res = await Api.get("/atms/api/v1/query");
      if (res.data) {
        setCont(res.data);
      }
    } catch (err) {
      console.log(err.code);
    }
  };
  ////###### get Conact ########

  ////###### replay Conact start########
  const sendReplay = async () => {
    try {
      if (data.replyMessage === "") {
        alert("Fill the message");
        return;
      }

      await Api.post(`/atms/api/v1/query-reply`, data);
      contactList();
      alert("Replay Send");
      setShow(false);
    } catch (error) {
      console.error("Error:", error.status);
    }
  };
  ////###### replay Conact end########
  useEffect(() => {
    contactList();
  }, []);

  const ContCard =
    cont &&
    cont?.map((info, i) => (
      <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
        <div className=" flex justify-between">
          <p>{info?.senderName}</p>
          <p
            onClick={() => replayF(info?._id)}
            className="cursor-pointer font-medium text-green-600 rounded-md shadow-lg bg-[#2a3544]"
          >
            Replay Now
          </p>
        </div>
        <p>{info?.senderEmail}</p>
        <div className="my-2 ">
          <p className="text-pink-200">Message</p>
          <p className="text-purple-200 ">{info?.message}</p>
        </div>
        <p>{info?.sendDate?.split("T")[0]}</p>
        <p>
          Replay:{" "}
          {info.reply ? (
            <span className="text-cyan-500 ml-2">Done</span>
          ) : (
            <span className="text-orange-700 ml-2">NO</span>
          )}
        </p>
        <hr />
        <p className="text-red-200 ">{info?.replyMessage}</p>
        <p>{info?.replayDate?.split("T")[0]}</p>

        <p
          onClick={() => handle(info._id)}
          className=" text-end text-red-500 font-semibold text-base cursor-pointer"
        >
          Delete
        </p>
      </div>
    ));

  //######### del contact####

  const handle = async (id) => {
    try {
      const confirm = window.confirm("Are you sure? ");
      if (!confirm) {
        return;
      }

      const res = await Api.delete(`/atms/api/v1/query/${id}`);
      alert(res.data.message);
      contactList();
    } catch (error) {
      console.log(error.status);
    }
  };
  //######### del contact####
  //############ log start ################
  console.log(data);
  //############ log end ################
  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div>
        <h1 className="text-center text-2xl underline pb-5">Query</h1>
      </div>

      <div className="flex flex-wrap gap-5">{ContCard}</div>
      {show && (
        <div className="pb-10 mt-4">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl text-center tracking-wide pl-5">
                Replay Query
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    ID Query
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
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Replay
                  </label>
                </div>{" "}
                <div>
                  <textarea
                    type="text"
                    name="replyMessage"
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

export default Query;
