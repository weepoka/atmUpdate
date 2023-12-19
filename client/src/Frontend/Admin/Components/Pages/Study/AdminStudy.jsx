import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Api from "../HomePage/Api";
import { Input } from "@material-tailwind/react";

const AdminStudy = () => {
  const [newUniversity, setNewUniversity] = useState({
    url: "",
    country: "",
    countryDetail: "",
  });
  const [cont, setCont] = useState([""]);
  const [err, setErr] = useState("");

  const handleInputChange = (event) => {
    event.preventDefault();
    const { name, value } = event.target;

    if (name === "url") {
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
    console.log(newUniversity);
    try {
      const formData = new FormData();
      formData.append("url", newUniversity.url);
      formData.append("country", newUniversity.country);
      formData.append("countryDetail", newUniversity.countryDetail);
      const res = await Api.post(
        "/atms/api/v1/admin/study-abroad/create",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      setErr(res.data.message);
      setTimeout(() => {
        setErr("");
      }, 2000);
      setNewUniversity("");
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
        "/atms/api/v1//admin/study-abroad/all-university"
      );
      setCont(res.data.data);
    } catch (err) {
      console.error("error:", err);
    }
  };
  useEffect(() => {
    country();
  }, []);
  /// get country end /////
  return (
    <div className="m-7 lg:w-full w-[60%] text-white">
      <h1 className="text-center font-semibold text-2xl pb-10">Add Country</h1>

      <div>
        <div className="mb-7 px-5 flex flex-col ">
          <label className="mb-2 md:text-lg text-white">Image</label>
          <div>
            <Input
              type="file"
              name="url"
              accept="image/*"
              className="resize-none w-full rounded-md bg-[#21262E] border 
            border-white]"
              onChange={(event) => handleInputChange(event)}
            />
          </div>
        </div>

        <div className="mb-7 px-5">
          <label className="mb-2 md:text-lg text-white">Country Name</label>
          <select
            color="blue"
            name="country"
            className="resize-none w-full py-2 rounded-md bg-[#21262E] border border-white]"
            onChange={handleInputChange}
          >
            <option value="">Select Category</option>
            <option value="UNITED STATES">United States</option>
            <option value="CANADA">Canada</option>
            <option value="UK">UK</option>
            <option value="DENMARK">DenMark</option>
            <option value="AUSTRALIA">Australia</option>
            <option value="CHAINA">China</option>
            <option value="SOUTH KOREA">South Korea</option>
          </select>
        </div>

        <div className="mb-7 px-5">
          <label className="mb-2 md:text-lg text-white">About </label>
          <textarea
            type="text"
            name="countryDetail"
            value={newUniversity.countryDetail || ""}
            onChange={handleInputChange}
            rows={5}
            className="resize-none w-full rounded-md bg-[#21262E] border border-white]"
            cols={20}
          />
        </div>
      </div>
      <div className="text-end font-semibold flex justify-center mr-5 my-5">
        <button
          type="button"
          className="bg-red-500 p-4 rounded-md hover:bg-red-700 duration-300 ease-in "
          onClick={onSubmit}
        >
          {err ? err : "Add"}
        </button>
      </div>

      <div className="flex gap-4 flex-wrap items-center">
        {cont &&
          cont?.map((info, i) => (
            <Link key={i} to={`/admin/addStudy/${info?.country}`}>
              <p className="font-semibold p-2 border rounded-md shadow-lg cursor-pointer text-lg">
                {info?.country}
              </p>
            </Link>
          ))}
      </div>
    </div>
  );
};

export default AdminStudy;
