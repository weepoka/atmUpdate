import {
  Button,
  Input,
  Option,
  Select,
  Textarea,
  Typography,
} from "@material-tailwind/react";

import { Controller, useForm } from "react-hook-form";
import Api from "../HomePage/Api";
import { useState } from "react";

const AddHeros = () => {
  const [emp, setEmp] = useState([""])

  const {
    register,
    handleSubmit,
    setValue,
    control,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {

    try {
      const formData = new FormData();
      formData.append("url", data.url[0]);
      formData.append("firstName", data.name);
      formData.append("emailA", data.email);
      formData.append("position", data.designation);
      formData.append("phoneA", data.mobile1);
      formData.append("phoneB", data.mobile2);

      const res = await Api.post("/atms/api/v1/employee", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        }
      })
      getEmp()
      reset();
    } catch (error) {
      console.error("error:", error.status)
    }

  };
  ///###### get Employe start######
  const getEmp = async () => {
    try {
      const res = await Api.get("/atms/api/v1/employee")
      setEmp(res.data)
    } catch (error) {
      console.error("error:", error.status)
    }
  }
  const empCard = emp && emp?.map((university, i) => (
    <div key={i} className="max-w-sm relative bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
      <img loading="lazy" className="rounded-t-lg object-fill w-[400px] h-[200px]" src={`${Api.defaults.baseURL}/uploads/${university?.url}`} alt="university" />


      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{university?.firstName}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{university?.emailA}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white">{university?.phoneA}</h5>
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-red-600 dark:text-white">{university?.position}</h5>
        </a>
        <div className="flex justify-between">
          <a href={`/team`} className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Detail
            <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
              <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 5h12m0 0L9 1m4 4L9 9" />
            </svg>
          </a>

          <p onClick={() => handleDelete(university._id)} className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
            Delete
          </p>
          {university?.role !== "Admin" &&
            <p onClick={() => adminFn(university.emailA)} className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-green-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              Add Admin
            </p>}
        </div>
      </div>
    </div>
  ));
  ///###### get Employe end ######

  ///###### delete Employe start ################
  const handleDelete = async (id) => {
    try {
      const confirmed = window.confirm("Are you sure you want to delete this university?");

      if (!confirmed) {
        return;
      }

      const res = await Api.delete(`/atms/api/v1/employee/${id}`)
      if (res.status === 200) {
        getEmp()
        console.log("Emplyoee deleted successfully");


      } else {

        console.error("Failed to delete Emplyoee. Status:", res.status);
      }
    } catch (error) {
      console.error("Error:", error.status)
    }
  }

  //####### admin##############
  const adminFn = async (email) => {
    try {
      const res = await Api.post(`/atms/api/v1/employee/${email}`)
      if (res.data.message !== " ") {
        alert(" success")
      }

    } catch (error) {
      console.error("Error:", error)
    }
  }
  //####### admin##############

  ///###### delete Employe end ##################
  useState(() => {
    getEmp()
  }, [])
  //###### log ######
  console.log(emp)
  //###### log ######
  return (
    <>
      <div className="m-7 lg:w-full w-[60%] text-white">
        <div className="py-5">
          <Typography
            variant="h3"
            className="text-center underline text-cyan-400"
          >
            Add Team Member
          </Typography>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="pb-10">
          <div className="border rounded-md pb-5">
            <div className="bg-[#607d8b] text-white py-2 mb-10">
              <h3 className="font-bold text-xl tracking-wide pl-5">
                Team Member Basic Information
              </h3>
            </div>

            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">Name</label>
                </div>{" "}
                <div>
                  <Input
                    type="text"
                    {...register("name", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Name"
                  />
                  {errors.name && <p>Name is required and must be valid</p>}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Email
                  </label>
                </div>{" "}
                <div>
                  <Input
                    type="text"
                    {...register("email", {
                      required: true,
                      pattern:
                        /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Email"
                  />
                  {errors.email && <p>Email is required and must be valid</p>}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Designation
                  </label>
                </div>{" "}
                <div>
                  <Input
                    type="text"
                    {...register("designation", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    className="border py-2 px-5 text-white
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" Designation"
                  />
                  {errors.designation && (
                    <p>designation is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                {" "}
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Image
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
                    Mobile Number 1
                  </label>
                </div>
                <div>
                  <Input
                    type="tel"
                    {...register("mobile1", {
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
                  {errors.mobile1 && (
                    <p>mobile1 is required and must be valid</p>
                  )}
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
                    {...register("mobile2", {
                      required: true,
                    })}
                    size="lg"
                    color="blue"
                    pattern="[0-9]{3}[0-9]{3}[0-9]{5}"
                    className="border py-2 px-5 
             rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label="Mobile Number 2 "
                  />
                  {errors.mobile2 && (
                    <p>Mobile Number is required and must be valid</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className="text-center pt-10">
            <Button type="submit" className="bg-blue-600 px-10">
              Add Heros
            </Button>
          </div>
        </form>
        <div className=" flex flex-wrap gap-4">    {empCard}</div>


      </div>
    </>
  );
};

export default AddHeros;
