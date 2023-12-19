import React, { useEffect, useState } from "react";
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

import Api from "../../../../../Api";
// const allowedExtensions = ["jpg", "jpeg", "png", "webp"];

// const isFileAllowed = (fileName) => {
//   const extension = fileName.split(".").pop().toLowerCase();
//   return allowedExtensions.includes(extension);
// };
const AddBlog = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();
  const [blog, setBlog] = useState("");
  const onSubmit = async (data) => {
    console.log("adh:", data);

    try {
      const formData = new FormData();
      formData.append("url", data.url[0]); // assuming your file input name is "url"

      // Add other form data properties
      formData.append("title", data.title);
      formData.append("link", data.link);
      formData.append("category", data.category);

      formData.append("description", data.description);

      const res = await Api.post("/atms/api/v1/blog", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.message) {
        setBlog(res.data.blog);
        console.log(res.data.blog);
      }
    } catch (error) {
      console.log(error.message);
    }
  };
  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div className="py-5">
        <Typography
          variant="h3"
          className="text-center underline text-cyan-400"
        >
          Add Blog
        </Typography>
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
        <div className="border rounded-md pb-5">
          <div className="bg-[#607d8b] text-white py-2 mb-10">
            <h3 className="font-bold text-xl tracking-wide pl-5">
              Blog Information
            </h3>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              {" "}
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Blog Title
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
                  label="Blog Title"
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
                  Blog Image
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
              {" "}
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Video Link
                </label>
              </div>{" "}
              <div>
                <Input
                  type="text"
                  {...register("link", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  //   onChange={handleFileChange}
                  className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Video Link "
                />
                {errors.link && <p>Video is required and must be valid</p>}
              </div>
            </div>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Description
                </label>
              </div>
              <div>
                <Textarea
                  type="text"
                  {...register("description", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Blog Description "
                />
                {errors.description && (
                  <p>Course Fee is required and must be valid</p>
                )}
              </div>
            </div>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Blog Date
                </label>
              </div>
              <div>
                <Input
                  type="date"
                  {...register("blogDate", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label=" Blog Date "
                />
                {errors.blogDate && (
                  <p>Blog Date Fee is required and must be valid</p>
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
                  name="category"
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
                      <Option value="Motivational Stories">
                        Motivational Stories
                      </Option>
                      <Option value="IELTS Success Stories">
                        IELTS Success Stories
                      </Option>
                      <Option value="Visa Successfull Story">
                        Visa Successfull Story
                      </Option>
                      <Option value="Life Style Stories">
                        Life Style Stories
                      </Option>
                    </Select>
                  )}
                />
                {errors.category && (
                  <p>Category is required and must be valid</p>
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
    </div>
  );
};

export default AddBlog;
