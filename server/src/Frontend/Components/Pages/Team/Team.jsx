import React, { useState, useEffect } from "react";
import team from "../../../../assets/Team/wepik-export-20230920084742Sv0v.png";
import team1 from "../../../../assets/Team/wepik-export-20230920084307ZGLQ.png";
import team2 from "../../../../assets/Team/wepik-export-20230920084602zEC3.png";
const teams = [
  {
    id: 1,
    name: "Hanna Lubin ",
    designation: "Deputy General Manager",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
  {
    id: 2,
    name: "Erin Calzoni",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    designation: "Deputy General Manager",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
  {
    id: 3,
    name: "Rokunuzzaman ",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    designation: "Deputy General Manager",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
  {
    id: 4,
    name: "Rokunuzzaman ",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    designation: "Deputy General Manager",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
  {
    id: 5,
    name: "Rokunuzzaman ",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    designation: "Deputy General Manager",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
  {
    id: 6,
    name: "Rokunuzzaman ",
    url: "https://i.ibb.co/vVptdX8/wepik-export-20231029070408x2g4.png",
    designation: "Deputy General Manager",
    Mobile: "+8801318-222630",
    Mobile1: "+8801318-222635",
    email: "sagar.atmsbd89@gmail.com",
  },
];
import Api from "../../Axios/Api";
const Team = () => {
  const [emp, setEmp] = useState([""])
  const ourTeam = async () => {
    const res = await Api.get("/atms/api/v1/employee")
    if (res.data) {
      setEmp(res.data)
    }
  }

  useEffect(() => {
    ourTeam()
  }, [])
  console.log(emp)
  return (
    <div className="team">
      <div className="">
        <h1 className="uppercase text-center bg-gray-300 py-10 font-bold text-[24px] md:text-[34px] courses">
          Our Team
        </h1>
      </div>
      <div
        className="max-w-screen-2xl mx-auto grid grid-cols-1 
      md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 px-5 py-10"
      >
        {/* {teams.map((item) => (
          <div key={item.id} className="relative ">
            <img
              src={item.url}
              alt=""
              className="w-52  drop-shadow-[0_35px_35px_rgba(0,0,0,0.25)]"
            />
            <div
              className="bg-gray-100  border md:w-[240px] p-3 absolute bottom-10
             md:left-8"
            >
              <h6 className="text-yellow-600">{item.designation}</h6>
              <h1 className="font-bold py-2">Rokunuzzaman khan</h1>
              <ul>
                <li>{item.Mobile}</li>
                <li>{item.Mobile1}</li>
                <li>{item.email}</li>
              </ul>
            </div>
          </div>
        ))} */}
        {emp?.map((item, i) => (
          <div
            key={i}
            className="flex items-center justify-center flex-col
             gap-2 p-5"
          >
            <div className="team-card bg-gray-200">
              <div className="team-wrapper">
                <img src={`${Api.defaults.baseURL}/uploads/${item?.url}`} className="cover-image" />
              </div>
              <div className="title text-center text-white">
                <div className="text-[12px]">{item.position}</div>
                <div className="text-xl font-bold">{item.firstName} {item.lastName}</div>

                <div className="flex items-center justify-center gap-3 mt-2 w-auto text-gray-200 text-sm pb-2">
                  <ul>
                    <li>{item.phoneA}</li>
                    <li>{item.phoneB}</li>
                    <li>{item.emailA}</li>
                  </ul>
                </div>
              </div>

              <img src={`${Api.defaults.baseURL}/uploads/${item?.url}`} className="character" />
            </div>
            {/* <img src={item.url} className="w-52 h-52 rounded-xl" /> */}

            {/* <div className="text-purple-600">{item.designation}</div>
            <div className="text-gray-900 text-lg font-bold">Olivia Rhye</div>

            <div className="flex items-center justify-center gap-3 mt-2 w-auto  text-gray-600">
              <ul>
                <li>{item.Mobile}</li>
                <li>{item.Mobile1}</li>
                <li>{item.email}</li>
              </ul>
            </div> */}
          </div>
        ))}
      </div>

      {/* <section className="max-w-screen-xl mx-auto py-20 px-8 lg:px-10">
        <h2 className="text-4xl xl:text-5xl capitalize text-center text-indigo-900 font-bold">
          our team
        </h2>
        <hr className="mx-auto w-12 h-1 outline-0 border-0 bg-green-300 block mt-4 mb-6" />
        <p className="text-center text-xl text-gray-800">
          Our team consists only of the best talents
        </p>
        <div className="flex flex-col gap-6 mt-16">
          {teams.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col  gap-6 ${
                item.id % 2 === 0 ? "md:flex-row-reverse" : "md:flex-row"
              }`}
            >
              <div className="w-full lg:w-1/4 rounded-3xl overflow-hidden">
                <img
                  src={item.url}
                  alt="Hanna Lubin"
                  className="w-full h-full object-cover aspect-video lg:aspect-square"
                />
              </div>
              <div
                className={`w-full lg:w-9/12  ${
                  item.id % 2 === 0 ? "bg-red-100" : ` bg-blue-100`
                }
              rounded-3xl flex flex-col justify-center p-8 lg:p-14`}
              >
                <h3 className="text-2xl capitalize text-indigo-900 font-semibold">
                  {item.name}
                </h3>
                <span className="inline-block capitalize text-xl text-indigo-900 font-light mt-1.5 mb-5">
                  {item.designation}
                </span>
                <p className="text-indigo-900 opacity-75 leading-normal">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quam
                  saepe sint expedita suscipit nemo nihil cupiditate culpa
                  temporibus, facere nisi.
                </p>
              </div>
            </div>
          ))}
        </div>
      </section> */}
    </div>
  );
};

export default Team;
