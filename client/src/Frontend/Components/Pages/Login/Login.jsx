import React, { useEffect, useState } from "react";

import loginImage from "../../../../assets/logo/Mobile login-bro.png";
import { Link } from "react-router-dom";
import APi from "../../Axios/Api"
import Alert from "../Alert"
import { useSelector, useDispatch } from "react-redux";
import { activeUser } from "../../../../Slice/userSlice";
import { useNavigate } from "react-router-dom";

const Login = () => {
  let navigate = useNavigate();

  let dispatch = useDispatch();
  let userInfo = useSelector((state) => state);
  let [formData, setData] = useState({
    email: "",

    pass: "",
    phone: ""
  });
  let [errorData, setError] = useState({
    email: "",
    pass: "",
    phone: "",
  })
  const [show, setShow] = useState(false)

  const handelChange = (e) => {
    let { name, value } = e.target;
    setData({ ...formData, [name]: value });
    setError({ ...errorData, [name]: "" });

  }
  const handleSend = async () => {
    if (formData.pass === "") {
      setError({ ...errorData, pass: "Password is required" });
      return
    } else if (formData.phone === "" && formData.email === "") {
      setError({
        ...errorData,
        [formData.phone === "" ? "email" : "phone"]: "Phone or Email is required",
      });
      return
    }
    try {
      const res = await APi.post("/atms/api/v1/student/login", formData)
      if (res.data.data) {
        setShow(true)
        dispatch(activeUser(res.data.data));

        localStorage.setItem("userInfo", JSON.stringify(res.data.data));

        setTimeout(() => {
          navigate("/")

        }, 1500)

      }
    } catch (err) {
      setShow(false)
      console.log(err.message)
    }

  };

  useEffect(() => {
    if (userInfo.userInfo?.userInfo?.isEmailVerify )
      navigate("/")

  }, [])
  return (
    <div className="signin">
      <div className="max-screen-2xl mx-auto py-10">
        <div className="flex justify-center">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 ">
            <div className="hidden lg:block ">
              <img
                src={loginImage}
                alt="Placeholder Image"
                className="max-w-lg mx-auto py-10"
              />
            </div>
            <div className="flex flex-col items-center w-full pt-5 pr-10 pb-20 pl-10 lg:pt-20 lg:flex-row">
              {/* <div className="w-full bg-cover relative max-w-md lg:max-w-2xl lg:w-7/12"></div> */}
              <div className="w-full mt-20 mr-0 mb-0 ml-0 relative z-10 lg:mt-0">
                <div
                  className="flex flex-col items-start justify-start
                   pt-10 px-10 pb-10  bg-white shadow-2xl rounded-xl
            relative z-10"
                >
                  <div className="z-20 relative w-10/12">
                    <h1 className="text-2xl font-semibold mb-4">Login</h1>

                    {/* <!-- Email Input --> */}
                    <div className="mb-4">
                      <label className="block text-gray-600">
                        Email
                      </label>
                      <input
                        type="text"
                        onChange={handelChange}
                        name="email"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none
       focus:border-blue-500"

                      />
                    </div>
                    <p>Or</p>
                    {errorData.email && <Alert> {errorData.email}</Alert>}
                    {/* <!-- Phone Input --> */}
                    <div className="mb-4">
                      <label className="block text-gray-600">
                        Phone
                      </label>
                      <input
                        type="text"
                        onChange={handelChange}
                        name="phone"
                        className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none
       focus:border-blue-500"

                      />
                    </div>

                    {errorData.phone && <Alert> {errorData.phone}</Alert>}
                    {/* <!-- Password Input --> */}
                    <div className="mb-4">
                      <label className="block text-gray-600">
                        Password
                      </label>
                      <input
                        onChange={handelChange}
                        type="password"
                        name="pass"
                        className="w-full border
       border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500"

                      />
                    </div>
                    {errorData.pass && <Alert> {errorData.pass}</Alert>}

                    {/* <!-- Remember Me Checkbox --> */}
                    <div className="mb-4 flex items-center">
                      <input
                        type="checkbox"
                        id="remember"
                        name="remember"
                        className="text-blue-500"
                      />
                      <label for="remember" className="text-gray-600 ml-2">
                        Remember Me
                      </label>
                    </div>
                    {/* <!-- Forgot Password Link --> */}
                    <div className="mb-6 text-blue-500">
                      <Link to="/reset" className="hover:underline">
                        Forgot Password?
                      </Link>
                    </div>
                    {/* <!-- Login Button --> */}
                    {!show ? <button
                      onClick={handleSend}
                      className="bg-gradient-to-r
                from-[#0c6f78]  to-[#00f6ff] hover:text-[#000] duration-300  hover:scale-105 text-[14px] md:text-[18px] py-2 text-white w-full"
                    >
                      Login
                    </button> : " Login Success"}
                  </div>
                  {/* <!-- Sign up  Link --> */}
                  <div className="mt-6 text-blue-500 text-center">
                    <Link to="/signUp" className="hover:underline">
                      Sign up Here
                    </Link>
                  </div>
                </div>
              </div>
              <svg
                viewbox="0 0 91 91"
                className="absolute top-0 left-0 z-0 w-32 h-32 -mt-12 -ml-12 text-yellow-300
            fill-current"
              >
                <g stroke="none" strokewidth="1" fillrule="evenodd">
                  <g fillrule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
              <svg
                viewbox="0 0 91 91"
                className="absolute bottom-0 right-0 z-0 w-32 h-32 -mb-12 -mr-12 text-indigo-500
            fill-current"
              >
                <g stroke="none" strokewidth="1" fillrule="evenodd">
                  <g fillrule="nonzero">
                    <g>
                      <g>
                        <circle cx="3.261" cy="3.445" r="2.72" />
                        <circle cx="15.296" cy="3.445" r="2.719" />
                        <circle cx="27.333" cy="3.445" r="2.72" />
                        <circle cx="39.369" cy="3.445" r="2.72" />
                        <circle cx="51.405" cy="3.445" r="2.72" />
                        <circle cx="63.441" cy="3.445" r="2.72" />
                        <circle cx="75.479" cy="3.445" r="2.72" />
                        <circle cx="87.514" cy="3.445" r="2.719" />
                      </g>
                      <g transform="translate(0 12)">
                        <circle cx="3.261" cy="3.525" r="2.72" />
                        <circle cx="15.296" cy="3.525" r="2.719" />
                        <circle cx="27.333" cy="3.525" r="2.72" />
                        <circle cx="39.369" cy="3.525" r="2.72" />
                        <circle cx="51.405" cy="3.525" r="2.72" />
                        <circle cx="63.441" cy="3.525" r="2.72" />
                        <circle cx="75.479" cy="3.525" r="2.72" />
                        <circle cx="87.514" cy="3.525" r="2.719" />
                      </g>
                      <g transform="translate(0 24)">
                        <circle cx="3.261" cy="3.605" r="2.72" />
                        <circle cx="15.296" cy="3.605" r="2.719" />
                        <circle cx="27.333" cy="3.605" r="2.72" />
                        <circle cx="39.369" cy="3.605" r="2.72" />
                        <circle cx="51.405" cy="3.605" r="2.72" />
                        <circle cx="63.441" cy="3.605" r="2.72" />
                        <circle cx="75.479" cy="3.605" r="2.72" />
                        <circle cx="87.514" cy="3.605" r="2.719" />
                      </g>
                      <g transform="translate(0 36)">
                        <circle cx="3.261" cy="3.686" r="2.72" />
                        <circle cx="15.296" cy="3.686" r="2.719" />
                        <circle cx="27.333" cy="3.686" r="2.72" />
                        <circle cx="39.369" cy="3.686" r="2.72" />
                        <circle cx="51.405" cy="3.686" r="2.72" />
                        <circle cx="63.441" cy="3.686" r="2.72" />
                        <circle cx="75.479" cy="3.686" r="2.72" />
                        <circle cx="87.514" cy="3.686" r="2.719" />
                      </g>
                      <g transform="translate(0 49)">
                        <circle cx="3.261" cy="2.767" r="2.72" />
                        <circle cx="15.296" cy="2.767" r="2.719" />
                        <circle cx="27.333" cy="2.767" r="2.72" />
                        <circle cx="39.369" cy="2.767" r="2.72" />
                        <circle cx="51.405" cy="2.767" r="2.72" />
                        <circle cx="63.441" cy="2.767" r="2.72" />
                        <circle cx="75.479" cy="2.767" r="2.72" />
                        <circle cx="87.514" cy="2.767" r="2.719" />
                      </g>
                      <g transform="translate(0 61)">
                        <circle cx="3.261" cy="2.846" r="2.72" />
                        <circle cx="15.296" cy="2.846" r="2.719" />
                        <circle cx="27.333" cy="2.846" r="2.72" />
                        <circle cx="39.369" cy="2.846" r="2.72" />
                        <circle cx="51.405" cy="2.846" r="2.72" />
                        <circle cx="63.441" cy="2.846" r="2.72" />
                        <circle cx="75.479" cy="2.846" r="2.72" />
                        <circle cx="87.514" cy="2.846" r="2.719" />
                      </g>
                      <g transform="translate(0 73)">
                        <circle cx="3.261" cy="2.926" r="2.72" />
                        <circle cx="15.296" cy="2.926" r="2.719" />
                        <circle cx="27.333" cy="2.926" r="2.72" />
                        <circle cx="39.369" cy="2.926" r="2.72" />
                        <circle cx="51.405" cy="2.926" r="2.72" />
                        <circle cx="63.441" cy="2.926" r="2.72" />
                        <circle cx="75.479" cy="2.926" r="2.72" />
                        <circle cx="87.514" cy="2.926" r="2.719" />
                      </g>
                      <g transform="translate(0 85)">
                        <circle cx="3.261" cy="3.006" r="2.72" />
                        <circle cx="15.296" cy="3.006" r="2.719" />
                        <circle cx="27.333" cy="3.006" r="2.72" />
                        <circle cx="39.369" cy="3.006" r="2.72" />
                        <circle cx="51.405" cy="3.006" r="2.72" />
                        <circle cx="63.441" cy="3.006" r="2.72" />
                        <circle cx="75.479" cy="3.006" r="2.72" />
                        <circle cx="87.514" cy="3.006" r="2.719" />
                      </g>
                    </g>
                  </g>
                </g>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>

  );
};

export default Login;
