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

const AboutAtms = () => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // reset();
  };
  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div className="py-5">
        <Typography
          variant="h3"
          className="text-center underline text-cyan-400"
        >
          Add About Details
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
                <label className="mb-2 md:text-lg  text-gray-400">Title</label>
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
                  description
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
                  label="Blog Title"
                />
                {errors.description && (
                  <p>description is required and must be valid</p>
                )}
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

export default AboutAtms;
