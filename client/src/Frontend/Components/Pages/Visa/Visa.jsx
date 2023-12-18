
import React, { useState, useEffect } from "react";
import { CountriesImage } from "../../FakeApi/CountriesImage";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import Api from "../../Axios/Api";
const Visa = () => {
  const [mes, setmes] = useState("")
  const [formData, setData] = useState({
    userName: "",
    mobile: "",
    age: "",
    email: "",
    location: "",
    ssc: "",
    hsc: "",
    bsc: "",
    master: "",
    ieltRead: "",
    ieltWrite: "",
    ieltSpeak: "",
    ieltListen: "",
    ieltOver: "",


  })
  //############ onChange data ###########
  const handleChange = (e) => {
    e.preventDefault();
    const { name, value } = e.target
    setData({ ...formData, [name]: value })
  }

  //############ data send ###########
  const handleSend = async () => {
    try {
      const res = await Api.post("/atms/api/v1/visa", formData)
      setmes(res.data.data.message)
      setData("")
    } catch (err) {
      console.log(err.code)
      setmes("Fill up all fields")
    }

  }
  return (
    <>
      <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px] z-10">
        Visa Processing
      </h1>
      <div className="max-w-screen-xl mx-auto p-4">
        {/* Personal Details Section */}
        <h1 className="text-2xl text-center font-bold  py-5">
          Want to know Your chances of Student visa ? Do the Quick Assessment
          HERE!
        </h1>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Name:</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Your Name"
            className="w-full p-2 border border-gray-300 rounded"
            name="userName"
            value={formData.userName || ""}

          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Phone:</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Your Phone Number"
            className="w-full p-2 border border-gray-300 rounded"
            name="mobile"
            value={formData.mobile || ""}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-bold">Email</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Your Eamil"
            className="w-full p-2 border border-gray-300 rounded"
            name="email"
            value={formData.email || ""}
          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Age:</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Your Age"
            className="w-full p-2 border border-gray-300 rounded"
            name="age"
            value={formData.age || ""}

          />
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Location:</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Your Location"
            className="w-full p-2 border border-gray-300 rounded"
            name="location"
            value={formData.location || ""}
          />
        </div>

        {/* Educational Background Section */}
        <h2 className="text-2xl font-semibold mb-4">Educational Background</h2>

        <div className="mb-4  flex justify-between">
          <div className="w-[48%]">
            <label className="block mb-1 font-bold">
              SSC/ Dakhil/ Equivalent:
            </label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Your SSC Result"
              className="w-full block p-2 border border-gray-300 rounded"
              name="ssc"
              value={formData.ssc || ""}
            />
          </div>

          <div className="w-[48%]">
            <label className="block mb-1 font-bold">
              HSC / Alim/ Diploma/ Equivalent:
            </label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Your HSC Result"
              className="w-full p-2 border border-gray-300 rounded"
              name="hsc"
              value={formData.hsc || ""}
            />
          </div>
        </div>
        <div className="mb-4 flex justify-between">
          <div className="w-[48%]">
            <label className="block mb-1 font-bold">
              Bachelor / BSC/ Degree/ Equivalent
            </label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Bachelor / BSC/ Degree/ Equivalent"
              className="w-full p-2 border border-gray-300 rounded"
              name="bsc"
              value={formData.bsc || ""}
            />
          </div>
          <div className="w-[48%]">
            <label className="block mb-1 font-bold">Masters/ Equivalent</label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Masters/ Equivalent"
              className="w-full p-2 border border-gray-300 rounded"
              name="master"
              value={formData.master || ""}
            />
          </div>
        </div>

        {/* IELTS Score Section */}
        <h2 className="text-2xl font-semibold mb-4">IELTS Score</h2>
        <div className="flex justify-between">
          <div className="mb-4">
            <label className="block mb-1 font-bold">Reading:</label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Reading Score"
              className="w-full p-2 border border-gray-300 rounded"
              name="ieltRead"
              value={formData.ieltRead || ""}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Writing:</label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Writing Score"
              className="w-full p-2 border border-gray-300 rounded"
              name="ieltWrite"
              value={formData.ieltWrite || ""}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Speaking:</label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Speaking Score"
              className="w-full p-2 border border-gray-300 rounded"
              name="ieltSpeak"
              value={formData.ieltSpeak || ""}
            />
          </div>

          <div className="mb-4">
            <label className="block mb-1 font-bold">Listening:</label>
            <input onChange={(e) => handleChange(e)}
              type="text"
              placeholder="Listening Score"
              className="w-full p-2 border border-gray-300 rounded"
              name="ieltListen"
              value={formData.ieltListen || ""}

            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block mb-1 font-bold">Overall:</label>
          <input onChange={(e) => handleChange(e)}
            type="text"
            placeholder="Overall Score"
            className="w-full p-2 border border-gray-300 rounded"
            name="ieltOver"
            value={formData.ieltOver || ""}
          />
        </div>
        {formData ?
          <button onClick={handleSend} className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
            <span className="relative z-10">Submit</span>
          </button>
          : <button className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500">
            <span className="relative z-10">Kindly Give You Data</span>
          </button>}

      </div>
      <div className="bg-gray-900 py-20">
        <div className=" max-w-screen-2xl mx-auto grid grid-cols-1 md:grid-cols-1 gap-10 px-5">
          <div
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className="grid grid-cols-1 md:grid-cols-4 gap-5 "
          >
            {CountriesImage.map((item) => (
              <div
                key={item.id}
                className="flex justify-center text-center items-center mx-5"
              >
                <div className="text-center mx-auto">
                  <img
                    src={item.url}
                    alt=""
                    className="md:w-[80%] block w-80 mx-auto"
                  />
                  <p className="text-white text-xl mt-2 ">{item.title}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto  flex justify-between items-center py-10">
        <div className="w-[65%]">
          <p className=" text-2xl font-semibold"> ATM Sir</p>
          <p className="font-medium mt-2">
            <strong className="text-2xl ">I</strong>  invite you to arrange a Consultation with ATM Sir to explore your
            visa options and career.
          </p>
          <p className="font-medium">For an appointment click</p>
          <Link to="/appointment">
            <button className="bg-red-500 px-3 mt-5 py-2 rounded-md text-white hover:scale-110 duration-500">
              <span className="relative z-10 ">Continue</span>
            </button>
          </Link>
        </div>
        <div className="w-[30%]">
          <img src="./public/single photo png.png" alt="" />
        </div>
      </div>
    </>
  );
};

export default Visa;