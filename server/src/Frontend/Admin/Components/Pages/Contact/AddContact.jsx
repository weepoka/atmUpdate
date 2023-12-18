import React, { useState, useEffect } from "react";
import Api from "../HomePage/Api";
import { Link } from "react-router-dom";

import {
  Button,
  Input,

} from "@material-tailwind/react";
import { useForm } from "react-hook-form";
const addContact = () => {
  const [cont, setCont] = useState([""])
  const {
    register,
    handleSubmit,
    setValue,

    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      // formData.append("location", data.location);
      formData.append("address", data.address);//
      formData.append("mobileOne", data.mobileOne);//
      formData.append("mobileTwo", data.mobileTwo);//
      // formData.append("phoneOne", data.phoneOne);
      // formData.append("phoneTwo", data.phoneTwo);
      formData.append("emailOne", data.emailOne);//
      // formData.append("emailTwo", data.emailTwo);
      const res = await Api.post(`/atms/api/v1/contact`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      alert(res.data.message)

      reset();
      contactList()
    } catch (error) {
      console.error("Error:", error.status)
    }
  };
  ////###### get Conact ########

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
  ////###### get Conact ########
  useEffect(() => {
    contactList()
  }, [])

  const ContCard = cont && cont?.map((info, i) => (
    <div key={i} className="p-4 w-[300px] shadow-xl rounded-md border  ">
      <Link to={"/contact"}>
        <p>{info.address}</p>
        <p>{info.location}</p>
        <p>{info.emailOne}</p>
        <p>{info.mobileOne}</p>
        <p>{info.mobileTwo}</p>
        <p>{info.phoneOne}</p>
        <p>{info.phoneTwo}</p>
      </Link>
      <p onClick={() => handle(info._id)} className=" text-end text-red-500 font-semibold text-base cursor-pointer">Delete</p>
    </div>

  ))

  //######### del contact####

  const handle = async (id) => {
    try {
      const confirm = window.confirm("Are you sure? ")
      if (!confirm) {
        return
      }

      const res = await Api.delete(`/atms/api/v1/contact/${id}`)
      alert(res.data.message)
      contactList()
    } catch (error) {
      console.log(error.status)
    }
  }
  //######### del contact####
  //############ log start ################
  console.log(cont)
  //############ log end ################
  return (
    <div className="m-7 lg:w-full w-[60%] text-white">

      <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
        <div className="border rounded-md pb-5">
          <div className="bg-[#607d8b] text-white py-2 mb-10">
            <h3 className="font-bold text-xl tracking-wide pl-5">
              Location
            </h3>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              {" "}
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Address
                </label>
              </div>{" "}
              <div>
                <Input
                  type="text"
                  {...register("address", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 text-white
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Address"
                />
                {errors.address && <p>Address is required and must be valid</p>}
              </div>
            </div>
          </div>
          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              {" "}
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">Email</label>
              </div>{" "}
              <div>
                <Input
                  type="text"
                  {...register("emailOne", {
                    required: true,
                    pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 text-white
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label=" Email"
                />
                {errors.emailOne && <p>Email is required and must be valid</p>}
              </div>
            </div>
          </div>


          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Mobile Number 1
                </label>
              </div>
              <div>
                <Input
                  type="tel"
                  {...register("mobileOne", {
                    required: true,
                    message: "",
                  })}
                  size="lg"
                  color="blue"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{5}"
                  className="border py-2 px-5 
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Mobile Number 1 "
                />
                {errors.mobileOne && <p>mobile1 is required and must be valid</p>}
              </div>
            </div>
          </div>
          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Mobile Number 2
                </label>
              </div>
              <div>
                <Input
                  type="tel"
                  {...register("mobileTwo", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  pattern="[0-9]{3}[0-9]{3}[0-9]{5}"
                  className="border py-2 px-5 
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Mobile Number 2 "
                />
                {errors.mobileTwo && (
                  <p>Mobile Number is required and must be valid</p>
                )}
              </div>
            </div>
          </div>
        </div>

        <div className="text-center pt-10">
          <Button type="submit" className="bg-blue-600 px-10">
            Add Contact
          </Button>
        </div>
      </form>

      <div className="flex gap-2">
        {ContCard}
      </div>
    </div>
  );
};

export default addContact;
