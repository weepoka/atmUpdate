import React, { useEffect, useState } from "react"
import {
  Button,
  Checkbox,
  Input,
  MenuItem,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
import Api from "./Api"

const AddSpeech = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const [speech, setSpeech] = useState("")
  const [speechh, setSpeechh] = useState([""])
  const onSubmit = async (data) => {
    console.log(data);
    try {



      // Add other form data properties




      const res = await Api.post("/atms/api/v1/video", data);

      if (res.data.message) {
        setSpeech(res.data.video);
        console.log(res.data.video);
      }
    } catch (error) {
      console.log(error.message);
    }
  };


  // get video start##############


  const isBanner = async () => {
    try {
      const res = await Api.get("/atms/api/v1/video")
      console.log("hello", res)
      if (res.data.length > 0) {
        console.log(res.data)
        setSpeechh(res.data)
      }

    } catch (error) {
      console.log(error.message)
    }
  }

  // get video end ##############
  // del video start ##############

  const videoDel = async (id) => {
    try {

      const confirm = window.confirm("Are you sure?")
      if (!confirm) {
        return
      }

      await Api.delete(`/atms/api/v1/video/${id}`)
      isBanner()
      alert("success")
    } catch (error) {
      console.log("Error:", error.status)
    }
  }
  // del video end ##############
  // ############## log start  ##############
  useEffect(() => {
    isBanner()
  }, [])
  console.log("sp:", speechh)
  //############### log end ##############
  return (
    <div>
      <div className="m-7 lg:w-full w-[60%] text-white">
        <div className="py-5">
          <Typography
            variant="h3"
            className="text-center underline text-cyan-400"
          >
            Add Speech Details
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Speech Information
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Speech Title
                  </label>
                </div>{" "}
                <div>
                  <Input
                    type="text"
                    {...register("title", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Title"
                  />
                  {errors.title && <p>title is required and must be valid</p>}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Speech Details
                  </label>
                </div>{" "}
                <div>
                  <Textarea
                    type="text"
                    {...register("description", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Speech Details"
                  />
                  {errors.description && (
                    <p>Speech Details is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>


            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Youtube Url
                  </label>
                </div>
                <div>
                  <Input
                    type="text"
                    {...register("link", {
                      required: false,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="YoutubeUrl "
                  />
                  {errors.link && (
                    <p>YoutubeUrl is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>


          </div>


          <div className="text-center pt-10">
            <Button type="submit" className="bg-blue-600 px-10">
              Add Blog
            </Button>
          </div>
        </form>
        <div className=" flex flex-wrap gap-4 text-white">
          {speechh && speechh?.map((item, i) => (
            <div key={i} className=" shadow-lg border-gray-200">
              <iframe
                width="230"
                height="270"
                src={`https://www.youtube.com/embed/${item.link}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowfullscreen
                className="md:w-full w-full rounded-md aspect-video"
              ></iframe>

              <div className="text-white">
                <h1 className=" text-base text-justify py-3 font-semibold">
                  {item.title}
                </h1>
                <p className="text-justify leading-relaxed text-sm">
                  {item.description}
                </p>
              </div>
              <button onClick={() => videoDel(item._id)} className="text-center w-full text-cyan-800 px-4 py-2 rounded-md shadow-lg bg-orange-700">Delete</button>
            </div>
          ))
          }
        </div>
      </div>


    </div >
  );
};

export default AddSpeech;
