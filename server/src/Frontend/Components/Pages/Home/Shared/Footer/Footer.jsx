import React from "react";
import logo from "../../../../../../assets/logo/Logo-01.png";
import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";
import "./Footer.css";
const Footer = () => {
  return (
    <div
      className="bg-gradient-to-l
    from-[#465286]  to-[#141726]  mt-auto"
    >
      <div className="max-w-screen-2xl mx-auto px-5  border-b  py-20">
        <div
          className=" grid grid-cols-1 md:grid-cols-2  
      lg:grid-cols-4 gap-10"
        >
          <div>
            <div className="flex justify-center flex-col items-center">
              <img src={logo} alt="" className="md:w-96 w-60" />
              <div className="py-5 text-white md:text-start text-center">
                <p>
                  3rd Floor, House #91, Outer Circular Rd, <br /> Mouchak,
                  Dhaka-1217
                </p>
                <a className="flex items-center justify-center md:justify-start gap-2 py-2">
                  <Icon icon="fluent:call-24-filled" />

                  <a
                    href="tel:+8801712808193"
                    className="hover:scale-105 hover:translate-x-2 duration-300"
                  >
                    +8801712-808193
                  </a>
                </a>

                <p className="flex items-center justify-center md:justify-start gap-2">
                  <Icon icon="ic:round-email" />
                  <a
                    href="mailto:Info@gmail.com"
                    className="hover:scale-105 hover:translate-x-2 duration-300"
                  >
                    Info@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className="px-5 flex justify-center md:justify-start">
              <ul className="wrapperr">
                <li className="icon facebook">
                  <span className="tooltip">Facebook</span>
                  <span>
                    {" "}
                    <Icon
                      icon="ic:baseline-facebook"
                      width={35}
                      className="text-white hover:p-[2px] duration-300"
                    />
                  </span>
                </li>
                <li className="icon twitter">
                  <span className="tooltip">Youtube</span>
                  <span>
                    <Icon
                      icon="mdi:youtube"
                      width={38}
                      className="text-white hover:p-[2px] duration-300"
                    />
                  </span>
                </li>
              </ul>
            </div>
          </div>

          <div className="text-white flex flex-col items-center ">
            <h1 className="text-2xl font-bold uppercase pb-8">Company</h1>
            <ul>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/about">About ATM's</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/team">ATM's Heros</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/blog">Blog</Link>
              </li>
            </ul>
          </div>
          <div className="text-white flex flex-col items-center">
            <h1 className="text-2xl font-bold uppercase pb-8">Categories</h1>
            <ul>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/courses">Courses</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/visa">Visa Processing</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/study">Study Abroad</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/blog">Blog</Link>
              </li>
              <li className="hover:scale-105 hover:translate-x-2 duration-300 my-2">
                <Link to="/contact">Contact Us</Link>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center gap-10 ">
            <h1 className="text-2xl text-white font-bold uppercase">
              Touch Your Career
            </h1>

            <button className=" custom-btn btn-5">
              <Link to="/courses">
                <button
                  className="before:ease relative h-9 w-32 overflow-hidden border border-yellow-600 bg-yellow-600 text-red-500 transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#890F0F] before:duration-300 hover:text-white hover:shadow-yellow-500 hover:before:h-64 hover:before:-translate-y-32 rounded-md font-semibold"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <span className="relative z-10">Admission</span>
                </button>
              </Link>
            </button>
            <button className="custom-btn6 btn-6 ">
              <Link to="/appointment">
                <button
                  className="before:ease relative h-9 w-32 overflow-hidden border border-[#F90101] bg-[#F90101] text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#890F0F] before:duration-300 hover:text-white hover:shadow-yellow-500 hover:before:h-64 hover:before:-translate-y-32 rounded-md font-semibold"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <span className="relative z-10">Appointment</span>
                </button>
              </Link>
            </button>
          </div>
        </div>
      </div>
      <div className="max-w-screen-2xl mx-auto text-center py-5 text-white">
        <small>
          © 2023 ATM’s Entrepreneurs Ltd. All Rights Reserved by{" "}
          <a href="https://weerodigital.com/" rel="noreferrer" target="_blank">
            Weero Digital
          </a>
        </small>
      </div>
    </div>
  );
};

export default Footer;
