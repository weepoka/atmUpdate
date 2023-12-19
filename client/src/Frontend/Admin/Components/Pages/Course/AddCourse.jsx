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

import Api from "../../../../../Api";

const AddBannerAndMoments = () => {
  const [titleOptions] = useState([
    "LEVEL-1",
    "LEVEL-2",
    "LEVEL-3",
    "IELTS COURSE",
    "PHONETICS",
    "FREELANCING",
    "DIGITAL MARKETING",
  ]);
  const [versionOptions] = useState(["Online", "Offline", "Online & Offline"]);
  const [banData, setBan] = useState("");
  const {
    register,
    handleSubmit,

    control,
    formState: { errors },
  } = useForm();

  // data send to dataBase
  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("url", data.url[0]);

    // Append other form fields
    formData.append("title", data.title);
    formData.append("courseDuration", data.courseDuration);
    formData.append("classesNumber", data.classesNumber);
    formData.append("extarClass", data.extarClass);
    formData.append("mockTest", data.mockTest);
    formData.append("admissionLastDate", data.admissionLastDate);
    formData.append("startDate", data.startDate);

    formData.append("offlineFee", JSON.stringify(data.offlineFee));

    formData.append("onlineFee", JSON.stringify(data.onlineFee));
    //onlineFee.bookFee sub input field

    formData.append("version", data.version);
    console.log(formData);

    try {
      const res = await Api.post("/atms/api/v1/course", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      console.log("Kurs:", res.data.data);
    } catch (err) {
      console.error("Error submitting form:", err);
    }
  };
  return (
    <div>
      <div className="m-7 lg:w-full w-full text-white">
        <div className="py-5">
          <Typography
            variant="h3"
            className="text-center underline text-cyan-400"
          >
            Add Course
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Course Information
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className=" ">
                <div className="flex justify-between  flex-col lg:flex-row py-5">
                  <div>
                    <label className="mb-2 md:text-lg text-gray-400">
                      Course Title
                    </label>
                  </div>
                  <div className="lg:lg:w-[46%]">
                    {/* Dropdown for Course Title */}
                    <Controller
                      name="title"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field} color="blue" label="Select title">
                          {titleOptions.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.title && <p>Course title is required</p>}
                  </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row py-5">
                  <div>
                    <label className="mb-2 md:text-lg text-gray-400">
                      Version
                    </label>
                  </div>
                  <div className="lg:w-[46%]">
                    {/* Dropdown for Course Title      */}

                    <Controller
                      name="version"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field} color="blue" label="Select version">
                          {versionOptions.map((option) => (
                            <Option key={option} value={option}>
                              {option}
                            </Option>
                          ))}
                        </Select>
                      )}
                    />
                    {errors.version && <p>Version is required</p>}
                  </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row py-5 ">
                  <label className="mb-2 md:text-md  text-gray-400">
                    Duration
                  </label>
                  <div className="lg:w-[46%]">
                    {/* <Select
                      className="w-[100%]"
                      color="blue"
                      label="Class Duration"
                      name="courseDuration"
                    >
                      <Option value="2">2 Months</Option>
                      <Option value="2.5">2.5 Months</Option>
                      <Option value="3">3 Months</Option>
                    </Select> */}
                    <Controller
                      name="courseDuration"
                      control={control}
                      defaultValue=""
                      rules={{ required: true }}
                      render={({ field }) => (
                        <Select {...field} color="blue" label="Select version">
                          <Option value="2">2 Months</Option>
                          <Option value="2.5">2.5 Months</Option>
                          <Option value="3">3 Months</Option>
                        </Select>
                      )}
                    />
                  </div>

                  {errors.courseDuration && (
                    <p>Duration is required and must be valid</p>
                  )}
                </div>

                <div className="flex justify-between flex-col lg:flex-row py-5">
                  <label className=" md:text-md  text-gray-400">
                    Start Date
                  </label>
                  <div className="lg:w-[46%]">
                    <Input
                      type="date"
                      {...register("startDate", {
                        required: true,
                      })}
                      color="blue"
                      className="border  w-[46%] text-gray-400
                 rounded w-"
                      label=" Start Date"
                      placeholder="yyyy-mm-dd"
                    />

                    {errors.startDate && (
                      <p>Start Date is required and must be valid</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between flex-col lg:flex-row py-5">
                  <label className=" md:text-md  text-gray-400">
                    Last Date
                  </label>
                  <div className="lg:w-[46%]">
                    <Input
                      type="date"
                      {...register("admissionLastDate", {
                        required: true,
                      })}
                      color="blue"
                      className="border   text-gray-400
                 rounded w-"
                      label=" Last Date"
                      placeholder="yyyy-mm-dd"
                    />
                    {errors.admissionLastDate && (
                      <p>Last Date is required and must be valid</p>
                    )}{" "}
                  </div>
                </div>

                <div className="flex justify-between flex-col lg:flex-row py-3">
                  <label className=" md:text-md  text-gray-400">
                    Classes Number
                  </label>
                  <div className="lg:w-[46%]">
                    <Input
                      type="number"
                      {...register("classesNumber", {
                        required: true,
                      })}
                      label="Class"
                      color="blue"
                      className="border w-[46%] text-gray-400
                 rounded w-"
                    />
                    {errors.classesNumber && (
                      <p>Classes Number is required and must be valid</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between  flex-col lg:flex-row py-3 ">
                  <label className="mb-2 md:text-md  text-gray-400">
                    Extra Class
                  </label>
                  <div className="lg:w-[46%]">
                    <Input
                      type="number"
                      {...register("extarClass", {
                        required: true,
                      })}
                      label="Ex Class"
                      color="blue"
                      className="border w-[46%] text-gray-400
                 rounded w-"
                    />
                    {errors.extarClass && (
                      <p>Extar Class is required and must be valid</p>
                    )}
                  </div>
                </div>
                <div className="flex justify-between  flex-col lg:flex-row py-3">
                  <label className=" md:text-md  text-gray-400">
                    Mock Test Cost
                  </label>
                  <div className="lg:w-[46%]">
                    <Input
                      type="text"
                      {...register("mockTest", {
                        required: true,
                      })}
                      label="Mock Fee"
                      color="blue"
                      className="border w-[46%] text-gray-400
                 rounded "
                    />
                    {errors.mockTest && (
                      <p>Mock Test Fee is required and must be valid</p>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className=" flex justify-between  flex-col lg:flex-row px-4 ">
              <label className=" md:text-lg  text-gray-400">
                Image (size 2000px * 700px)
              </label>

              <div className="lg:w-[46%] pt-2">
                <Input
                  type="file"
                  {...register("url", {
                    required: "Image is required",
                  })}
                  color="blue"
                  name="url"
                  accept="image/*"
                  className="border py-1  w-full rounded "
                  label="Image"
                />
                {errors.url && <p>{errors.url.message}</p>}
              </div>
            </div>
          </div>

          <div className="border rounded-md mt-10">
            <div className="bg-[#607d8b] flex justify-center space-x-[50%] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide ">Online</h3>
              <h3 className="font-bold text-xl tracking-wide ">Offline Fee</h3>
            </div>
            <div className="flex">
              <div>
                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Course Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("onlineFee.courseFee", {
                          required: false,
                        })}
                        size="lg"
                        color="blue"
                        name="onlineFee.courseFee"
                        className="border py-2 px-5
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl text-gray-900 2xl:min-w-full"
                        label="Course Fee "
                      />
                      {errors.onlineFee?.courseFee && (
                        <p>Course Fee is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Book Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("onlineFee.bookFee", {
                          required: false,
                        })}
                        size="lg"
                        color="blue"
                        name="onlineFee.bookFee"
                        className="border py-2 px-5 text-gray-900
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                        label="More Info "
                      />
                      {errors.onlineFee?.bookFee && (
                        <p>More info is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Total Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("onlineFee.totalFee", {
                          required: false,
                        })}
                        size="lg"
                        name="onlineFee.totalFee"
                        color="blue"
                        className="border py-2 px-5 text-gray-900
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                        label="Total Fee"
                      />
                      {errors.onlineFee?.totalFee && (
                        <p>Total Fee is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Course Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("offlineFee.courseFee", {
                          required: false,
                        })}
                        size="lg"
                        color="blue"
                        name="offlineFee.courseFee"
                        className="border py-2 px-5 text-gray-900
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                        label="SubTitle "
                      />
                      {errors.offlineFee?.courseFee && (
                        <p>Course Fee is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>

                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Book Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("offlineFee.bookFee", {
                          required: false,
                        })}
                        size="lg"
                        name="offlineFee.bookFee"
                        color="blue"
                        className="border py-2 px-5 text-gray-900
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                        label="More Info "
                      />
                      {errors.offlineFee?.bookFee && (
                        <p>Book Fee info is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>
                <div className=" mb-7 px-5">
                  <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                    <div>
                      <label className="mb-2 md:text-lg  text-gray-400">
                        Total Fee
                      </label>
                    </div>
                    <div>
                      <Input
                        type="number"
                        {...register("offlineFee.totalFee", {
                          required: false,
                        })}
                        size="lg"
                        color="blue"
                        name="offlineFee.totalFee"
                        className="border py-2 px-5 text-gray-900
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                        label="More Info "
                      />
                      {errors.offlineFee?.totalFee && (
                        <p>Total Fee is required and must be valid</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-10">
            <Button type="submit" className="bg-blue-600 px-10">
              Create
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddBannerAndMoments;
