import React, { useEffect, useState } from "react";
import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";

import Api from "./Api";

const AddBannerAndMoments = () => {
  const [banData, setBan] = useState("");
  const [banDataa, setBana] = useState([""]);
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm();

  // data send to dataBase
  const onSubmit = async (data) => {
    try {
      const formData = new FormData();
      formData.append("url", data.url[0]); // assuming your file input name is "url"

      // Add other form data properties
      formData.append("position", data.position);
      formData.append("tile", data.tile);
      formData.append("offer", data.offer);
      formData.append("sub", data.sub);
      formData.append("detail", data.detail);
      console.log(data.url[0]);

      const res = await Api.post("/atms/api/v1/banner", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.message) {
        setBan(res.data.banner);
        console.log(res.data.banner);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  //###### get Banner start ##########

  const isBanner = async () => {
    try {
      const res = await Api.get("/atms/api/v1/banner");

      if (res.data.length > 0) {
        console.log(res.data);
        setBana(res.data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  console.log("getBann:", banDataa);
  //###### get Banner end ##########
  //###### banner delete star ##########

  //  course del #######
  const handelDel = async (id) => {
    try {
      const confrim = window.confirm("Are you sure?");
      if (!confrim) {
        return;
      }

      await Api.delete(`/atms/api/v1/banner/${id}`);
      alert("Banner Deleted");
      isBanner();
    } catch (err) {
      console.error("Error reason:", err);
    }
  };
  //###### banner delete end ##########
  //############### useEff######
  useEffect(() => {
    isBanner();
  }, []);
  //############### useEff######

  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div>
        <div className="py-5">
          <Typography
            variant="h3"
            className="text-center underline text-cyan-400"
          >
            Add Banner & Moments
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Banner and Moments Information
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Title
                  </label>
                </div>{" "}
                <div>
                  <Textarea
                    type="text"
                    {...register("tile", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Title"
                  />
                  {errors.tile && <p>title is required and must be valid</p>}
                </div>
                <div>
                  <label className="mb-2 md:text-md  text-gray-400">
                    Title2
                  </label>
                </div>{" "}
                <div>
                  <Textarea
                    type="text"
                    {...register("offer", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Title2"
                  />
                  {errors.offer && <p>Title2 is required and must be valid</p>}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Image (size 2000px * 700px)
                  </label>
                </div>{" "}
                <div>
                  <Input
                    type="file"
                    {...register("url", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    accept=".png,.jpg,.jpeg,.webp"
                    //   onChange={handleFileChange}
                    className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="Image "
                  />
                  {errors.url && <p>Image is required and must be valid</p>}
                </div>
              </div>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    SubTitle
                  </label>
                </div>
                <div>
                  <Textarea
                    type="text"
                    {...register("sub", {
                      required: false,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="SubTitle "
                  />
                  {errors.sub && <p>SubTitle is required and must be valid</p>}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    More Information
                  </label>
                </div>
                <div>
                  <Textarea
                    type="text"
                    {...register("detail", {
                      required: false,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="More Info "
                  />
                  {errors.detail && (
                    <p>More info is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="border rounded-md mt-10">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Blog Category
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    {" "}
                    Category
                  </label>
                </div>

                <div>
                  <Controller
                    name="position"
                    control={control}
                    defaultValue="" // Set the default value here if needed
                    rules={{ required: true }}
                    render={({ field }) => (
                      <Select
                        {...field}
                        //   variant="outlined"
                        color="blue"
                        label="Select category"
                      >
                        <Option value="Home">banner</Option>
                        <Option value="Moment">moments</Option>
                      </Select>
                    )}
                  />
                  {errors.position && (
                    <p>Category is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>
          </div>
          <div className="text-center pt-10">
            <Button type="submit" className="bg-blue-600 text-xl px-20">
              Add
            </Button>
          </div>
        </form>
      </div>

      <div className=" flex flex-wrap gap-10 px-6 py-5 ">
        {banDataa &&
          banDataa?.map((kur, i) => (
            <div
              key={i}
              className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <img
                loading="lazy"
                className="rounded-t-lg object-fill w-[400px] h-[200px]"
                src={`${Api.defaults.baseURL}/uploads/${kur?.url}`}
                alt="kurs"
              />

              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {kur?.position}
                  </h5>
                </a>

                <div className="flex justify-between">
                  <a
                    href={`/`}
                    className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Detail
                    <svg
                      className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 14 10"
                    >
                      <path
                        stroke="currentColor"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M1 5h12m0 0L9 1m4 4L9 9"
                      />
                    </svg>
                  </a>

                  <p
                    onClick={() => handelDel(kur._id)}
                    className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Delete
                  </p>
                </div>
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default AddBannerAndMoments;
