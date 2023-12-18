import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSpring, animated } from "react-spring";
import Api from "../Axios/Api";


function PaymentSuccess() {
  const fadeIn = useSpring({
    from: { opacity: 0 },
    to: { opacity: 1 },
    config: { duration: 1000 },
  });

  const slideIn = useSpring({
    from: { transform: "translateX(-100%)" },
    to: { transform: "translateX(0%)" },
    config: { duration: 800 },
  });
  //############### data fetch start//#################

  const { tran_id } = useParams();
  const navigate = useNavigate()

  const [inv, setInv] = useState("")
  const myVoice = async () => {
    try {
      const res = await Api.get(`/atms/api/v1/invoice/${tran_id}`);
      if (res.data) {
        setInv(res.data);
      }
    } catch (err) {
      console.error(err.code);
    }
  };



  //####################//######################

  useEffect(() => {
    myVoice()

  }, [tran_id])

  console.log("Invoice", inv)
  //############### data fetch end //#################
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <animated.div
        style={fadeIn}
        className="bg-white p-8 rounded-lg shadow-lg max-w-md"
      >
        <h1 className="text-3xl font-semibold text-green-600 mb-4">
          {/* Payment Successful! */} {inv?.message} Success
        </h1>

        <div className="bg-white border rounded-lg shadow-lg px-6 py-8 max-w-md mx-auto mt-8">
          <div className="flex justify-between mb-6">
            <h1 className="text-lg font-bold">Invoice</h1>
            <div className="text-gray-700">
              <div>Date:{inv?.code?.paymentDate.split("T")[0]}</div>
              <div>Invoice #: {inv?.code?._id}</div>
            </div>
          </div>
          <div className="mb-8">
            <h2 className="text-lg font-bold mb-4">Bill To:</h2>
            <div className="text-gray-700 mb-2">{inv?.code?.name}</div>
            <div className="text-gray-700 mb-2">{inv?.code?.email}</div>
            <div className="text-gray-700 mb-2">{inv?.code?.mobile}</div>
            <div className="text-gray-700 mb-2">{inv?.code?.regi}</div>

          </div>
          <animated.div style={slideIn} className="text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="h-16 w-16 text-green-600 mx-auto mb-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </animated.div>
          <table className="w-full mb-8">
            <thead>
              <tr>
                <th className="text-left font-bold text-gray-700">Description</th>
                <th className="text-right font-bold text-gray-700">Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className="text-left text-gray-700">{inv?.code?.course}</td>
                <td className="text-right text-gray-700">{inv?.code?.amount}</td>
              </tr>

            </tbody>
            <tfoot>
              <tr>
                <td className="text-left font-bold text-gray-700">Total</td>
                <td className="text-right font-bold text-gray-700">{inv?.code?.amount}</td>
              </tr>
            </tfoot>
          </table>

        </div>


        <div className="w-[100px] absolute right-[45%]">

          <div onClick={() => navigate("/")} className="text-sm md:text-2xl text-[#blue] cursor-pointer  mt-10 mb-10  font-semibold " >
            Back
          </div>
        </div>
        <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
          You will receive an email confirmation shortly.
        </animated.p>
        <animated.p style={slideIn} className="text-gray-500 text-sm mt-2">
          ATM's
        </animated.p>
      </animated.div>
    </div>
  );
}

export default PaymentSuccess;