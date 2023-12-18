import {
  Button,
  Input,
  Option,
  Select,
  Typography,
} from "@material-tailwind/react";
import React, { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { course } from "../../FakeApi/Course";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { appointments } from "../../FakeApi/Appointment";
import Api from "../../Axios/Api";


const Admission = () => {
  
  // const [startDate, setStartDate] = useState(new Date());
  // const [time, setTime] = useState("");
  // console.log(startDate);
  // console.log(time);
  const sliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  var settings = {
    dots: false,
    infinite: true,
    fade: true,
    speed: 500,
    autoPlay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    cssEase: "linear",
    beforeChange: (current, next) => {
      setCurrentSlide(next);
    },
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  const handleDotClick = (index) => {
    sliderRef.current.slickGoTo(index);
  };

  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setError,
    clearErrors,
    watch,
    setValue,
  } = useForm({
    mode: "onTouch",
    defaultValues: {
      fullName: "",
      email: "",
      ScheduleType: "",
      phone: "",
      course: "",
      OnlineScheduleRoutine: "",
      OfflineScheduleRoutine: "",
      CourseFee: "",
      BooksFee: "",
      TotalFee: "",
    },
  });

  const [selectedCourse, setSelectedCourse] = useState(null);

  const [selectedScheduleType, setSelectedScheduleType] = useState("");
  const courseNames = course.map((c) => c.name);

  const handleCourseChange = (courseName) => {
    const selected = course.find((c) => c.name === courseName);
    setSelectedCourse(selected);
    setValue("course", courseName);

    setSelectedScheduleType("");
  };

  const handleScheduleTypeChange = (scheduleType) => {
    setSelectedScheduleType(scheduleType);
    setValue("ScheduleType", scheduleType);
    if (scheduleType === "Online") {
      setValue(
        "OnlineScheduleRoutine",
        selectedCourse?.onlineSchedule.map(
          (schedule) => `${schedule.routine} - ${schedule.classTime}`
        ) || ""
      );
      setValue("OfflineScheduleRoutine", "");
    } else if (scheduleType === "Offline") {
      setValue(
        "OnlineScheduleRoutine",
        selectedCourse?.offlineSchedule.map(
          (schedule) => `${schedule.routine} - ${schedule.classTime}`
        ) || ""
      );
      setValue("OnlineScheduleRoutine", "");
    } else {
      setValue("OnlineScheduleRoutine", "");
      setValue("OfflineScheduleRoutine", "");
    }
    if (selectedCourse) {
      if (scheduleType === "Online") {
        setValue("CourseFee", selectedCourse.CourseFeeOnline.CourseFee);
        setValue("BooksFee", selectedCourse.CourseFeeOnline.BooksFee);
        setValue("TotalFee", selectedCourse.CourseFeeOnline.TotalFee);
      } else if (scheduleType === "Offline") {
        setValue("CourseFee", selectedCourse.CourseFeeOffline.CourseFee);
        setValue("BooksFee", selectedCourse.CourseFeeOffline.BooksFee);
        setValue("TotalFee", selectedCourse.CourseFeeOffline.TotalFee);
      }
    }
    clearErrors("scheduleType");
  };

  const onSubmit = (data) => {
    if (!selectedScheduleType) {
      setError("scheduleType", {
        type: "manual",
        message: "Schedule Type is required",
      });
      return;
    }

    // Check if the respective schedule routine is selected based on the schedule type
    const scheduleRoutineField =
      selectedScheduleType === "Online"
        ? "OnlineScheduleRoutine"
        : "OfflineScheduleRoutine";

    if (!data[scheduleRoutineField]) {
      setError(scheduleRoutineField, {
        type: "manual",
        message: "Schedule Routine is required",
      });
      return;
    }
    console.log(data);
  };

  return (
    <>
      <div>
        <div className="bg-gray-100 appointment">
          <div className="max-w-screen-2xl mx-auto ">
            <div>
              <div className="min-w-screen min-h-screen  flex items-center justify-center px-5 py-5">
                <div className="bg-white text-gray-500 rounded-3xl shadow-xl w-full  overflow-hidden">
                  <div className="md:flex w-full grid grid-cols-2 gap-5">
                    <div className="hidden md:block md:w-[50%] bg-white py-10 px-10 relative ">
                      <Slider ref={sliderRef} {...settings}>
                        {appointments.map((item) => (
                          <div key={item?.id} className=" relative">
                            <img src={item.url} alt="" className=" " />
                            <div className="absolute inset-0 bg-black opacity-50"></div>
                            <div className="absolute top-1/2 flex flex-col justify-center items-center ">
                              <h1 className="text-xl text-white">
                                ATM Mahmud(ATM Sir){" "}
                              </h1>
                              <h2 className="text-gray-300">
                                Career Specialist
                              </h2>
                              <p className="text-center px-20 py-5 text-gray-300">
                                Lorem ipsum dolor sit amet consectetur
                                adipisicing elit. Ullam similique dolores
                                ratione explicabo aliquam dicta delectus!
                                Blanditiis est incidunt soluta!
                              </p>
                            </div>
                          </div>
                        ))}
                      </Slider>
                      <div className="flex justify-center  mt-2 cursor-pointer  absolute bottom-20 left-0 right-0 ">
                        {appointments.map((_, index) => (
                          <div
                            key={index}
                            className={`w-4 h-4 mx-2 rounded-full ${currentSlide === index
                                ? "bg-red-600"
                                : "bg-gray-300"
                              }`}
                            onClick={() => handleDotClick(index)}
                          />
                        ))}
                      </div>
                    </div>
                    {/** code Start from here##################################################################################################################  */}
                    <div className="w-full col-span-2 md:col-span-1 md:w-1/2 py-10 px-5 md:px-10">
                      <div className="text-center mb-10">
                        <h1 className="font-bold text-xl xl:text-3xl text-red-600 uppercase">
                          Let's Admit for your Good Career!
                        </h1>
                      </div>
                      <div className="max-w-screen-sm mx-auto ">
                        <div className="py-5 px-10 ">
                          <form
                            onSubmit={handleSubmit(onSubmit)}
                            className="my-5 space-y-6"
                          >
                            <div>
                              <Controller
                                name="fullName"
                                control={control}
                                rules={{
                                  required: "First name is required",
                                  minLength: {
                                    value: 5,
                                    message: "write your fullname is required",
                                  },
                                }}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    error={Boolean(errors?.fullName?.message)}
                                    label="Full Name"
                                    value={field.value}
                                  />
                                )}
                              />
                              {errors?.fullName?.message && (
                                <span className="text-red-400 text-xs">
                                  {errors?.fullName?.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <Controller
                                name="email"
                                control={control}
                                rules={{
                                  required: "email is required",
                                  pattern: {
                                    value:
                                      /^([a-zA-Z0-9._%-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/,
                                    message: "EMail Id is invalid",
                                  },
                                }}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    error={Boolean(errors?.email?.message)}
                                    label="email"
                                  />
                                )}
                              />
                              {errors?.email?.message && (
                                <span className="text-red-400 text-xs">
                                  {errors?.email?.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <Controller
                                name="phone"
                                control={control}
                                rules={{ required: "Phone is required" }}
                                render={({ field }) => (
                                  <Input
                                    {...field}
                                    error={Boolean(errors?.phone?.message)}
                                    label="Phone number"
                                    pattern="[0-9]{3}[0-9]{3}[0-9]{5}"
                                  />
                                )}
                              />
                              {errors?.phone?.message && (
                                <span className="text-red-400 text-xs">
                                  {errors?.phone?.message}
                                </span>
                              )}
                            </div>
                            <div>
                              <Controller
                                name="course"
                                control={control}
                                rules={{ required: "Course is required" }}
                                render={({ field }) => (
                                  <Select
                                    {...field}
                                    error={Boolean(errors?.course?.message)}
                                    onChange={(value) =>
                                      handleCourseChange(value)
                                    }
                                    label="Select Course"
                                  >
                                    {courseNames.map((name) => (
                                      <Option key={name} value={name}>
                                        {name}
                                      </Option>
                                    ))}
                                  </Select>
                                )}
                              />
                              {errors?.course?.message && (
                                <span className="text-red-400 text-xs">
                                  {errors?.course?.message}
                                </span>
                              )}
                            </div>
                            {selectedCourse && (
                              <div className="">
                                <div>
                                  <Select
                                    value={selectedScheduleType}
                                    onChange={(value) =>
                                      handleScheduleTypeChange(value)
                                    }
                                    label="Select Schedule Type"
                                  >
                                    <Option value="Online">Online</Option>
                                    <Option value="Offline">Offline</Option>
                                  </Select>
                                  {errors?.scheduleType?.message && (
                                    <span className="text-red-400 text-xs">
                                      {errors?.scheduleType?.message}
                                    </span>
                                  )}
                                </div>

                                {selectedScheduleType === "Online" && (
                                  <div className="py-5">
                                    <Controller
                                      name="OnlineScheduleRoutine"
                                      control={control}
                                      rules={{
                                        required: true,
                                      }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          required
                                          label="Online Schedule Routine"
                                        >
                                          {selectedCourse.onlineSchedule.map(
                                            (schedule, index) => (
                                              <Option
                                                key={index}
                                                value={`${schedule.routine} - ${schedule.classTime}`}
                                              >
                                                {`${schedule.routine} - ${schedule.classTime}`}
                                              </Option>
                                            )
                                          )}
                                        </Select>
                                      )}
                                    />
                                    {errors?.OnlineScheduleRoutine && (
                                      <span className="text-red-400 text-xs">
                                        Online Schedule Routine required
                                      </span>
                                    )}
                                  </div>
                                )}
                                {selectedScheduleType === "Offline" && (
                                  <div className="py-5">
                                    <Controller
                                      name="OfflineScheduleRoutine"
                                      control={control}
                                      rules={{
                                        required: true,
                                      }}
                                      render={({ field }) => (
                                        <Select
                                          {...field}
                                          required
                                          label="Offline Schedule Routine"
                                        >
                                          {selectedCourse.offlineSchedule.map(
                                            (schedule, index) => (
                                              <Option
                                                key={index}
                                                value={`${schedule.routine} - ${schedule.classTime}`}
                                              >
                                                {`${schedule.routine} - ${schedule.classTime}`}
                                              </Option>
                                            )
                                          )}
                                        </Select>
                                      )}
                                    />
                                    {errors?.OfflineScheduleRoutine && (
                                      <span className="text-red-400 text-xs">
                                        Offline Schedule Routine required
                                      </span>
                                    )}
                                  </div>
                                )}

                                <div>
                                  <Typography
                                    color="gray"
                                    className="mt-2 font-normal"
                                  >
                                    Course Fee
                                  </Typography>
                                  <Controller
                                    name="CourseFee"
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} disabled />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Typography
                                    color="gray"
                                    className="mt-2   font-normal"
                                  >
                                    Books Fee
                                  </Typography>
                                  <Controller
                                    name="BooksFee"
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} disabled />
                                    )}
                                  />
                                </div>
                                <div>
                                  <Typography
                                    color="gray"
                                    className="mt-2   font-normal"
                                  >
                                    Total Fee
                                  </Typography>
                                  <Controller
                                    name="TotalFee"
                                    control={control}
                                    render={({ field }) => (
                                      <Input {...field} disabled />
                                    )}
                                  />
                                </div>
                              </div>
                            )}{" "}
                            <div className="grid grid-cols-2 gap-3">
                              <Button
                                type="reset"
                                variant="outlined"
                                onClick={() => reset()}
                              >
                                Reset
                              </Button>
                              <button
                                type="submit"
                                className="before:ease relative  overflow-hidden border bg-gradient-to-r from-[#F50202] text-black to-[#000] border-none   before:absolute before:left-0 before:-ml-2 before:h-48 before:w-80 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-gradient-to-r from-[#FDD835]  to-[#F50202] before:transition-all before:duration-300 hover:text-white hover:shadow-black hover:before:-rotate-180 rounded-lg hover:scale-110 duration-500"
                              >
                                <span className="relative z-10 font-bold">
                                  {" "}
                                  SUBMIT
                                </span>
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>


                    {/** code Start from end##################################################################################################################  */}

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>


    </>
  );
};

export default Admission;
