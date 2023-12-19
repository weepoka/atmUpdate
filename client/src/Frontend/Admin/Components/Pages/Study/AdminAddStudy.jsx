import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Api from "../HomePage/Api";

const AdminAddStudy = () => {
  const { id } = useParams();
  console.log(id);
  const [err, setErr] = useState("");
  const [newUniversity, setNewUniversity] = useState({
    logo: "",
    uniName: "",
    ielts: "",
    programTitle: "",
    degree: "",
    applyStart: "",
    duration: "",
    session: "",
    tution: "",
    isPartTime: "",
    rank: "",
    workPermit: "",
    creditOne: "",
    map: "",
    deadLine: "",
    moreInfo: "",
  });
  const [cont, setCont] = useState([""]);

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "logo") {
      const file = event.target.files[0];
      setNewUniversity({
        ...newUniversity,
        [name]: file,
      });
    } else {
      setNewUniversity({
        ...newUniversity,
        [name]: value,
      });
    }
  };

  const onSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("logo", newUniversity.logo);

      formData.append("uniName", newUniversity.uniName);
      formData.append("ielts", newUniversity.ielts);
      formData.append("programTitle", newUniversity.programTitle);
      formData.append("degree", newUniversity.degree);
      formData.append("applyStart", newUniversity.applyStart);
      formData.append("duration", newUniversity.duration);
      formData.append("session", newUniversity.session);
      formData.append("tution", newUniversity.tution);
      formData.append("isPartTime", newUniversity.isPartTime);
      formData.append("rank", newUniversity.rank);
      formData.append("workPermit", newUniversity.workPermit);
      formData.append("creditOne", newUniversity.creditOne);
      formData.append("map", newUniversity.map);
      formData.append("deadLine", newUniversity.deadLine);
      formData.append("moreInfo", newUniversity.moreInfo);
      const res = await Api.post(
        `/atms/api/v1/admin/study-abroad/${id}/add-universities`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(res);
      setNewUniversity("");
      setErr(res.data.message);
      setTimeout(() => {
        setErr("");
      }, 2000);
      country();
    } catch (error) {
      console.log(error.code);
      setErr(error.code);
      setTimeout(() => {
        setErr("");
      }, 2000);
    }
  };
  /// get country start  /////
  const country = async () => {
    try {
      const res = await Api.get(
        "/atms/api/v1/admin/study-abroad/all-university"
      );
      setCont(res.data.data);
    } catch (err) {
      console.error("error:", err);
    }
  };

  /// get country end /////

  /// del uni start/////
  const handleDelete = async (uni, count) => {
    try {
      const confirmed = window.confirm(
        "Are you sure you want to delete this university?"
      );

      if (!confirmed) {
        return;
      }

      const res = await Api.delete(
        `/atms/api/v1/admin/study-abroad/${uni}/delete-university/${count}`
      );

      if (res.status === 200) {
        console.log("University deleted successfully");

        country();
      } else {
        console.error("Failed to delete university. Status:", res.status);
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  /// del uni end /////
  useEffect(() => {
    country();
  }, []);
  //###############uni card start###########
  const allUni = cont && Object.values(cont).map((iem) => iem?.university);
  const universityCards =
    allUni &&
    allUni.flat().map((university, i) => (
      <div
        key={i}
        className="max-w-sm relative bg-white border
         border-gray-200 rounded-lg shadow
          dark:bg-gray-800 dark:border-gray-700"
      >
        <img
          loading="lazy"
          className="rounded-t-lg object-fill w-[400px] h-[200px]"
          src={`${Api.defaults.baseURL}/uploads/${university?.url}`}
          alt="university"
        />
        <img
          loading="lazy"
          className="rounded-full absolute top-0 right-0 object-fill w-[80px] h-[80px]"
          src={`${Api.defaults.baseURL}/uploads/${university?.logo}`}
          alt="university"
        />

        <div className="p-5">
          <h5
            className="mb-2 text-xl text-center  font-bold
           tracking-tight text-blue-800 dark:text-white"
          >
            {university?.country}
          </h5>
          <a href="#">
            <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              {university?.uniName}
            </h5>
            <h5 className="mb-2 text-xl font-bold tracking-tight text-red-600 dark:text-white">
              {university?.deadLine}
            </h5>
          </a>
          <div className="flex justify-between">
            <a
              href={`/course/countryDetails/${university?.country}`}
              className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Details
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
              onClick={() => handleDelete(university._id, university.country)}
              className="inline-flex cursor-pointer items-center px-3 py-2 text-sm font-medium text-center text-white bg-red-700 rounded-lg hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Delete
            </p>
          </div>
        </div>
      </div>
    ));

  //###############uni card end ###########
  //####### log #####

  console.log(allUni);

  //####### log #####

  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <div>
        <h1 className="text-center text-2xl underline">
          Add study Information
        </h1>
      </div>
      <div className="m-7  text-white">
        <div className="grid grid-cols-1 xl:grid-cols-2  gap-10 ">
          <div className=" border rounded-md p-4">
            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">Logo</label>
              <input
                type="file"
                name="logo"
                accept="image/*"
                className="resize-none w-full  rounded-md bg-[#21262E] border
                
                border-white]"
                onChange={(event) => handleInputChange(event)}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                University Name{" "}
              </label>
              <input
                type="text"
                name="uniName"
                value={newUniversity.uniName || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2  rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">IELTS </label>
              <input
                type="text"
                name="ielts"
                value={newUniversity.ielts || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2  rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Program{" "}
              </label>
              <input
                type="text"
                name="programTitle"
                value={newUniversity.programTitle || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Degree{" "}
              </label>
              <input
                type="text"
                name="degree"
                value={newUniversity.degree || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Apply Date{" "}
              </label>
              <input
                type="date"
                name="applyStart"
                value={newUniversity.applyStart || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>
            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Duration{" "}
              </label>
              <input
                type="text"
                name="duration"
                value={newUniversity.duration || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Session{" "}
              </label>
              <input
                type="text"
                name="session"
                value={newUniversity.session || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>
          </div>

          <div className=" border rounded-md p-4">
            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Tution{" "}
              </label>
              <input
                type="text"
                name="tution"
                value={newUniversity.tution || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2  rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>
            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                isPartTime
              </label>
              <select
                color="blue"
                name="isPartTime"
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                onChange={handleInputChange}
              >
                <option value="">Select</option>
                <option value="Part-time">Part-time</option>
                <option value="Full-time">Full-time</option>
              </select>
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">Rank </label>
              <input
                type="text"
                name="rank"
                value={newUniversity.rank || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2  rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Work Permit{" "}
              </label>
              <input
                type="text"
                name="workPermit"
                value={newUniversity.workPermit || ""}
                onChange={handleInputChange}
                rows={5}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
                cols={20}
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Credit{" "}
              </label>
              <input
                type="text"
                name="creditOne"
                value={newUniversity.creditOne || ""}
                onChange={handleInputChange}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
              />
            </div>
            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">Map </label>
              <input
                type="text"
                name="map"
                value={newUniversity.map || ""}
                onChange={handleInputChange}
                className="resize-none w-full py-2  rounded-md bg-[#21262E] border border-white]"
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                DeadLine{" "}
              </label>
              <input
                type="date"
                name="deadLine"
                value={newUniversity.deadLine || ""}
                onChange={handleInputChange}
                className=" w-full py-2 rounded-md bg-[#21262E] border border-white"
              />
            </div>

            <div className="mb-7 px-5">
              <label className="mb-2 md:text-lg text-white block">
                Web Link University{" "}
              </label>
              <input
                type="text"
                name="moreInfo"
                value={newUniversity.moreInfo || ""}
                onChange={handleInputChange}
                className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
              />
            </div>
          </div>
        </div>
        <div className=" font-semibold flex justify-center   my-10">
          <button
            type="button"
            className="bg-red-500 p-2 w-full lg:w-52 rounded-md hover:bg-red-700 duration-300 ease-in "
            onClick={onSubmit}
          >
            {err ? err : "Add"}
          </button>
        </div>
        <div>
          <h1 className="text-2xl underline">Country Information</h1>
        </div>
        <div className="flex gap-10 flex-wrap items-center pt-10">
          {universityCards}
        </div>
      </div>
    </div>
  );
};

export default AdminAddStudy;
