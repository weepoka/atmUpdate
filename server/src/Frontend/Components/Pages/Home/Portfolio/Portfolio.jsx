import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
import Api from "../../../Axios/Api"
const Portfolio = () => {

  const [atm, setAtm] = useState("")
  useEffect(() => {

    const isBanner = async () => {
      try {
        const res = await Api.get("/atms/api/v1/atmsir")

        if (res.data.length > 0) {
          console.log(res.data)
          setAtm(res.data[res.data.length - 1])
        }

      } catch (error) {
        console.log(error.message)
      }
    }
    isBanner()
  }, [])

  console.log(atm)


  return (
    <div className="max-w-screen-2xl mx-auto pb-20 px-5 md:px-0 about">
      <div
        data-aos="fade-up"
        data-aos-delay="50"
        data-aos-duration="1500"
        data-aos-easing="ease-in-out"
        data-aos-once="false"
        data-aos-anchor-placement="top-center"
        className="text-center"
      >
        <h1 className="text-DarkNevy font-bold mb-3 md:text-[35px] text-[20px]">
          Top IELTS Coaching Centre in Dhaka
        </h1>
        <p>
          ATM’s একটা নির্ভরযোগ্য শিক্ষাপ্রতিষ্ঠান এবং ভিসা কনসাল্টেসিস ফার্ম
          <br />
          যার ট্যাগ লাইন হলো সততার চাদরে মোড়ানো প্রতিষ্ঠান
        </p>
      </div>
      <div
        className="grid grid-cols-1 mt-40 md:grid-cols-2
      gap-5"
      >
        <div>
          <div className="relative flex justify-center items-center py-14">
            {/* <div className="">
              {" "}
              <img src={atm} alt="" className="w-[300px] " />
            </div> */}

            <div
              data-aos="fade-right"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
              className=""
            >
              {" "}
              <img src={`${Api.defaults.baseURL}/uploads/${atm.url}`} alt="" className="w-[350px] " />
            </div>

            <div
              data-aos="fade-up"
              data-aos-delay="50"
              data-aos-duration="1500"
              data-aos-easing="ease-in-out"
              data-aos-once="false"
              data-aos-anchor-placement="top-center"
              className="md:top-[-20%] top-[-10%] right-[10%] flex justify-center absolute"
            >
              {" "}
              <div className="speech-bubble speech-bubble-bottom-left speech-bubble-red">
                ATM Mahmud
              </div>
            </div>
          </div>
          <div
            data-aos="fade-up"
            data-aos-delay="60"
            data-aos-duration="1500"
            data-aos-easing="ease-in-out"
            data-aos-once="false"
            data-aos-anchor-placement="top-center"
            className="text-DarkNevy md:px-20 px-5"
          >
            <h1
              className="font-bold text-DarkNevy my-5 text-[18px]
             md:text-start text-center"
            >
              About Me
            </h1>
            <p className="mb-5 md:text-start text-center text-[16px]">
              সততার চাদরে মোড়ানো প্রতিষ্ঠান ATM’s এর প্রতিষ্ঠাতা <br /> এবং CEO।
              সাবেক CEO, S@ifur’s Pvt. Ltd
            </p>
            <div className="w-full shadow-sm py-2  md:text-start text-center text-[16px]">
              <span className="font-bold text-DarkNevy my-5 text-[18px]
             md:text-start text-center">Specialties</span>
              {atm?.specalities?.map((skill, i) => (
                <p key={i}>{skill}</p>
              ))}
            </div>
            <ul className="text-[16px]">
              <li>Visiting Trainer (Ex)</li>
              <li>BPATC, Savar, Dhaka</li>
              <li>B.Sc (Bangalore University) India, MBA.</li>
              <li>Ex-Trainer IELTS, FEEM, Ministry of Finance</li>
            </ul>
          </div>
        </div>
        <div
          data-aos="fade-left"
          data-aos-delay="50"
          data-aos-duration="1500"
          data-aos-easing="ease-in-out"
          data-aos-once="false"
          data-aos-anchor-placement="top-center"
          className="md:text-justify text-center px-5 md:pt-14  "
        >
          <h1 className="text-[36px] font-extrabold text-DarkNevy mb-3 ">
            {" "}
            ATM Sir
          </h1>
          <h6 className="md:text-[20px] text-[18px] mb-3 md:text-start text-center">
            Career Specialist
          </h6>
          <h6 className="text-DarkNevy text-[18px] font-semibold mb-4">
            Top IELTS Coaching Centre in Dhaka
          </h6>
          <p className="mb-7">
            ATM’s একটা নির্ভরযোগ্য শিক্ষাপ্রতিষ্ঠান এবং ভিসা কনসাল্টেসিস ফার্ম
            <br />
            যার ট্যাগ লাইন হলো সততার চাদরে মোড়ানো প্রতিষ্ঠান |
          </p>
          <h2 className="text-DarkNevy mb-3 md:text-[20px] text-[18px] font-bold">
            Mission And Vision
          </h2>
          <p className="mb-3 text-justify leading-relaxed">
            <span className="font-semibold text-DarkNevy md:text-[18px]">
              {" "}
              Mission:
            </span>{" "}
            {!atm.mission ?
              <span className="text-[14px]">
                {" "}
                সততার সাথে IELTS, Spoken, Writing & Freelancing এবংউন্নত দেশ গুলোর
                যেমনঃ কানাডা, অস্ট্রেলিয়া, USA, UK,সুইডেন, ডেনমার্ক, চায়না
                ইত্যািদর সল্প খরচে ভিসা প্রসেসিং।
              </span> :
              <span className="text-[14px]">
                {" "}
                {atm.mission}
              </span>}
          </p>
          <p className="mb-3 md:text-[18px] text-justify leading-relaxed">
            <span className="font-semibold text-DarkNevy md:text-[18px]">
              {" "}
              Vision:
            </span>{" "}
            {atm.vision ? <span className="text-[14px]">
              {atm.vision}
            </span> :
              <span className="text-[14px]">
                বাংলাদেশে একজনও যেন বেকার না থাকে। সততার চাদরে মোড়ানো প্রতিষ্ঠান,
                ATM’s এর কোর্সগুলো করিয়ে দক্ষ করে দেশে বা বিদেশে
              </span>}
          </p>
          <p className="">
            Career opportunities এর মাধ্যমে বেকারত্ব নিরসনে চেষ্টা করা।
          </p>
          <div className="mt-10">
            {" "}
            <Link to="/about" className="">
              <button className="bg-red-500 px-3 py-2 rounded-md text-white hover:scale-110 duration-500 hover:scale-110 duration-500">
                <span className="relative z-10">About More</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
