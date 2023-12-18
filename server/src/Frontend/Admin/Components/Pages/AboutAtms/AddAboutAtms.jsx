import { Button, Input, Textarea, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import Api from "../../../../../Api"

const AddAboutAtms = () => {
  const {
    register,
    handleSubmit,
    setValue,

    formState: { errors },
  } = useForm();
  const [specalities, setSpecalities] = React.useState([]);

  const [newSpecalities, setNewSpecalities] = React.useState({
    skill: "",
  });
  const [atmm, setAtmm] = useState([""])
  const handleInputChange1 = (event) => {
    const { name, value } = event.target;

    setNewSpecalities({
      ...newSpecalities,
      [name]: value,
    });
  };

  const addSpecalities = () => {
    const updatedSpecalities = [...specalities, newSpecalities];

    setSpecalities(updatedSpecalities);

    // Update the form values without the university being added
    setValue("specalities", updatedSpecalities);

    setNewSpecalities({
      skill: "",
    });
  };
  const removeSpecalities = (index) => {
    const updatedSpecalities = [...specalities];

    updatedSpecalities.splice(index, 1);

    // Update the form values without the removed university
    setValue("specalities", updatedSpecalities);

    setSpecalities(updatedSpecalities);
  };
  const [atm, setAtm] = useState("")
  const onSubmit = async (data) => {
    console.log(data);

    try {
      const formData = new FormData();
      formData.append("url", data.url[0]); // assuming your file input name is "url"

      // Add other form data properties
      formData.append("title", data.title);
      formData.append("description", data.description);

      formData.append("mission", data.mission);
      formData.append("vision", data.vision);
      formData.append("detail", data.detail);
      data.specalities.forEach((speciality, index) => {
        formData.append(`specalities[${index}][skill]`, speciality.skill);
      });


      console.log(data.url[0])

      const res = await Api.post("/atms/api/v1/atmsir", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.data.message) {
        setAtm(res.data.atm);
        console.log(res.data.atm);
      }
    } catch (error) {
      console.log(error.message);
    }

  };
  ///  ###################### get atm's start #####
  const getAtm = async () => {
    try {
      const res = await Api.get("/atms/api/v1/atmsir")

      if (res.data.length > 0) {
        console.log(res.data)
        setAtmm(res.data[res.data.length - 1])
      }

    } catch (error) {
      console.log(error.message)
    }
  }
  ///  ###################### get atm's end #####
  useState(() => {
    getAtm()
  }, [])
  ///  ###################### log here start #####
  console.log("atmm:", atmm)
  ///  ###################### log here end #####
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
              Atm's Information
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
                  label="Title"
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
                  label="Description"
                />
                {errors.description && (
                  <p>description is required and must be valid</p>
                )}
              </div>
            </div>
          </div>

          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Mission
                </label>
              </div>
              <div>
                <Textarea
                  type="text"
                  {...register("mission", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 
                     rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label=" Mission "
                />
                {errors.mission && <p>mission is required and must be valid</p>}
              </div>
            </div>
          </div>
          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Vission
                </label>
              </div>
              <div>
                <Textarea
                  type="text"
                  {...register("vision", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 
                     rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label=" Vision "
                />
                {errors.vision && <p>mission is required and must be valid</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="border rounded-md mt-10">
          <div className="bg-[#607d8b] text-white py-2 mb-10">
            <h3 className="font-bold text-xl tracking-wide pl-5">
              Atm's personal Details
            </h3>
          </div>
          <div className=" mb-7 px-5">
            <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
              {" "}
              <div>
                <label className="mb-2 md:text-lg  text-gray-400">
                  Atm's Image
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
                  Atm's Details
                </label>
              </div>
              <div>
                <Textarea
                  type="text"
                  {...register("detail", {
                    required: true,
                  })}
                  size="lg"
                  color="blue"
                  className="border py-2 px-5 
                     rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                  label="Description "
                />
                {errors.details && (
                  <p>Atm's details is required and must be valid</p>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="border rounded-md mt-10">
          <div className="bg-[#607d8b] text-white py-2 mb-10">
            <h3 className="font-bold text-xl tracking-wide pl-5">
              Atm's Specalities
            </h3>
          </div>

          <div className=" mb-7 px-5">
            <div className=" mb-7 px-5">
              <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-20">
                <div>
                  <label className="mb-2 md:text-lg  text-gray-400">
                    Skill
                  </label>
                </div>
                <div>
                  <Input
                    type="text"
                    name="skill"
                    value={newSpecalities.skill}
                    onChange={handleInputChange1}
                    size="lg"
                    color="blue"
                    className="border text-white py-2 px-5 
                 rounded w-full max-w-xs lg:max-w-lg xl:max-w-xl 2xl:min-w-full"
                    label=" skill "
                  />
                  {errors.skill && <p>skill is required and must be valid</p>}
                </div>
              </div>
            </div>
          </div>
          <div className="text-end mr-5 my-5">
            <Button
              type="button"
              className="bg-blue-500"
              onClick={addSpecalities}
            >
              Add more skill
            </Button>
          </div>
          {specalities.length > 0 && (
            <div className="m-5 h-[400px] overflow-scroll">
              <h2 className="text-center py-10">Added skills</h2>
              <ul className="grid xl:grid-cols-4 md:grid-cols-2  gap-10 py-5">
                {specalities.map((offline, index) => (
                  <li key={index}>
                    <p className="flex justify-between">
                      <h1 className="text-center font-bold text-blue-700 py-3">
                        {" "}
                        skill {index + 1}:{" "}
                      </h1>
                      <Button
                        className="bg-red-500 "
                        onClick={() => removeSpecalities(index)}
                      >
                        Remove
                      </Button>
                    </p>
                    <ul>
                      {Object.entries(offline).map(([key, value]) => (
                        <li key={key} className="capitalize">
                          <span>{key}</span> : <span>{value}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <div className="text-center pt-10">
          <Button type="submit" className="bg-blue-600 px-10">
            Add About
          </Button>
        </div>
      </form>



      {atmm && Object.entries(atmm).map((item, i) => (
        <>
          <p key={i}>{item[0]} : {item[0] === "url" ? <img className="w-[300px] h-[280px] rounded-md shadow-lg bg-orange-600" src={`${Api.defaults.baseURL}/uploads/${item[1]}`} /> : item[1]}</p>


        </>
      ))}
    </div>
  );
};

export default AddAboutAtms;
