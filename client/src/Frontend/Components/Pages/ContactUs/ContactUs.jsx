import React, { useState, useEffect } from "react";
import location from "../../../../assets/logo/location-01.png";
import gamil from "../../../../assets/logo/gmail-01.png";
import phone from "../../../../assets/logo/phone-01.png";
import hotline from "../../../../assets/logo/hotline1-01.png";
import { Icon } from "@iconify/react";
import Api from "../../Axios/Api";
const ContactUs = () => {

  const [cont, setCont] = useState([""])
  const [hot, setHot] = useState([""])
  const contactList = async () => {
    try {
      const res = await Api.get("/atms/api/v1/contact")
      if (res.data) {
        setCont(res.data)
      }
    } catch (err) {
      console.log(err.code)
    }

  }
  const hotList = async () => {
    try {
      const res = await Api.get("/atms/api/v1/hotline")
      if (res.data) {
        setHot(res.data.reverse())
      }
    } catch (err) {
      console.log(err.code)
    }

  }


  useEffect(() => {
    contactList()
    hotList()
  }, [])
  // form data
  const [formData, setData] = useState({
    senderName: "",
    senderEmail: "",
    message: ""

  })



  const handelChange = (e) => {
    let { name, value } = e.target
    setData({ ...formData, [name]: value });

  }
  const [mess, setMess] = useState("")
  const handleSend = async () => {

    try {
      if (formData.message === " ") {
        return
      }
      const res = await Api.post("/atms/api/v1/query", formData)
      if (res.data.message !== "") {
        setMess(res.data.message)
        console.log(res.data.message)
      }

    } catch (err) {
      setMess("Kindly fillup the All fields ")

    }
  }
  console.log(hot)
  return (
    <div>
      <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px]">
        Contact Us
      </h1>
      <div className="max-w-screen-2xl mx-auto pt-20  px-5">
        <div
          data-aos="fade-down"
          data-aos-delay="50"
          data-aos-duration="1000"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="grid grid-cols-1 md:grid-cols-3 gap-10"
        >
          <div
            className="border py-10 flex justify-center items-center flex-col border-gray-500 text-DarkNevy
          "
          >
            <img src={location} alt="" className="w-32" />
            <h1 className="font-bold py-5">Our Location</h1>
            <p className="text-center flex  px-10 font-semibold py-2">
              <Icon icon="mdi:location" color="red" width={25} />
              {cont[0]?.address}
            </p>
          </div>
          <div
            className="border flex justify-center  py-2 items-center flex-col border-gray-500 text-DarkNevy
          "
          >
            <img src={phone} alt="" className="w-32" />
            <h1 className="font-bold py-5 ">Phone</h1>
            <p className="font-semibold  py-2">
              <ul>
                <li className="flex items-center  py-1 gap-2">
                  {" "}
                  <Icon icon="fluent:call-24-filled" color="red" width={25} />
                  <a
                    href="tel:+8801712808193"
                    className="hover:scale-105 hover:translate-x-2 duration-500"
                  >
                    {" "}
                    {cont[0]?.mobileOne}

                  </a>
                </li>
                <li className="flex items-center py-1 gap-2">
                  {" "}
                  <Icon icon="fluent:call-24-filled" color="red" width={25} />
                  <a
                    href="tel:+8801612808193"
                    className="hover:scale-105 hover:translate-x-2 duration-500"
                  >
                    {" "}
                    {cont[0]?.mobileTwo}

                  </a>
                </li>
              </ul>
            </p>
          </div>
          <div
            className="border flex justify-center items-center  py-2 flex-col border-gray-500
             text-DarkNevy
          "
          >
            <img src={gamil} alt="" className="w-32" />
            <h1 className="text-DarkNevy font-bold py-5">Email</h1>
            <p className="font-semibold  py-2">
              {" "}
              <li className="flex items-center py-1 gap-2">
                <Icon icon="mdi:email" color="red" width={25} />
                <a
                  href="mailto:md.ceo.atms@gmail.com"
                  className="hover:scale-105 hover:translate-x-2 duration-500"
                >
                  {" "}
                  {cont[0].emailOne}
                </a>
              </li>
            </p>
          </div>
        </div>
        <div className="py-14 text-DarkNevy flex lg:flex-row flex-col gap-20  ">
          <div
            data-aos="fade-right"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
          >
            <h1 className="text-DarkNevy font-bold md:text-2xl text-xl">
              Fill out form below and we will contact you as soon as possible
            </h1>
            <div className="py-10 flex md:gap-10 md:flex-row flex-col gap-5">
              {/* <label htmlFor="" className="mr-3 font-bold text-[24px]">
                Name{" "}
              </label> */}
              <input
                type="text"
                name="senderName"
                onChange={handelChange}
                placeholder="Name"
                className="border border-gray-500 py-2 px-10 outline-none"
              />
              {/* <label htmlFor="" className="ml-14 mr-5 font-bold text-[24px]">
                Email
              </label> */}
              <input
                type="text"
                name="senderEmail"
                onChange={handelChange}
                placeholder="email"
                className="border border-gray-500 py-2 px-10 outline-none"
              />
            </div>
            <div>
              <textarea
                onChange={handelChange}
                rows="8"
                name="message"
                placeholder="type your message"
                className="border border-gray-500 py-2 px-10 md:w-[600px] w-full outline-none"
              ></textarea>
            </div>
            <div className="py-5 flex justify-center md:justify-start">

              {mess ?
                mess :
                <button
                  onClick={handleSend}
                  className="rounded-md px-5 py-3 
               font-bold bg-DarkNevy  text-white"
                >
                  Submit
                </button>
              }
            </div>
          </div>
          <div
            data-aos="fade-left"
            data-aos-delay="50"
            data-aos-duration="1000"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className=" text-DarkNevy "
          >
            <h1 className="text-DarkNevy font-bold text-2xl text-center md:text-start ">
              Hotline
            </h1>
            <div className="flex md:flex-row flex-col gap-10 pt-5">
              <div className="flex justify-center items-center w-28 h-20">

                <img src={`${Api.defaults.baseURL}/uploads/${hot[0]?.url}`} alt="" />

              </div>
              <div className="md:py-5 flex flex-col justify-center md:justify-start md:items-start  md:item items-center">
                <h1 className="text-xl font-bold py-2">Help Desk 01</h1>
                <h3 className="py-2 font-semibold">Executive</h3>
                <ul>
                  <li className="flex items-center py-1 gap-2 font-bold">
                    Phone:{" "}
                    <a
                      href="tel:+8801303004414"
                      className="hover:scale-105 hover:translate-x-2 duration-500"
                    >
                      {hot[0]?.phoneA}

                    </a>
                  </li>

                  <a
                    href="mailto:Email: info@gmail.com "
                    className="hover:scale-105 hover:translate-x-2 duration-500 inline-block"
                  >
                    Email:{hot[0]?.emailA}
                  </a>
                </ul>
              </div>
            </div>
            <div className="flex  md:flex-row flex-col gap-10 md:py-0 py-10">
              <div className="flex justify-center items-center ">
                <img src={`${Api.defaults.baseURL}/uploads/${hot[1]?.url}`} alt="" className="w-56" />

              </div>
              <div className="py-5 flex flex-col justify-center md:justify-start md:items-start items-center">
                <h1 className="text-xl font-bold py-2">Help Desk 02</h1>
                <h3 className="py-2 font-semibold">Executive</h3>
                <ul>
                  <li className="flex items-center py-1 gap-2 font-bold">
                    Phone:{" "}
                    <a
                      href="tel:+8801303004414"
                      className="hover:scale-105 hover:translate-x-2 duration-500"
                    >
                      {" "}
                      {hot[1]?.phoneA}
                    </a>
                  </li>
                  <li>
                    <a
                      href="mailto:Email: info@gmail.com "
                      className="hover:scale-105 hover:translate-x-2 duration-500 inline-block"
                    >
                      Email:   {hot[1]?.emailA}
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3652.0593810006817!2d90.4099757759722!3d23.74526178897236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755b861f70bf765%3A0x8f121f597ea08095!2sATM&#39;s%20English!5e0!3m2!1sen!2sbd!4v1696249316383!5m2!1sen!2sbd"
          allowfullscreen=""
          loading="lazy"
          className="w-full h-[60vh]"

        ></iframe>
      </div>
    </div>
  );
};

export default ContactUs;
