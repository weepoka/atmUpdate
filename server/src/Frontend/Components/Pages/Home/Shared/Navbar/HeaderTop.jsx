import { Icon } from "@iconify/react";
import { Link } from "react-router-dom";

const HeaderTop = () => {
  return (
    <div
      className="bg-gradient-to-r
    from-[#ff0000]  to-[#252628] w-full px-3 top-header"
    >
      <div className="max-w-screen-2xl mx-auto  lg:block hidden">
        <div className="flex justify-between items-center gap-2 ">
          <div className="flex items-center gap-2 py-4 text-white text-[14px]">
            <Icon icon="mdi:location" />
            <p>3rd Floor, House #91, Outer Circular Rd, Mouchak, Dhaka-1217</p>
          </div>

          <div className="flex items-center  gap-2">
            <Link>
              {" "}
              <Icon
                icon="ic:baseline-facebook"
                width={30}
                className="hover:bg-[#1877F2] text-white rounded-full hover:scale-110 duration-300 hover:p-1"
              />
            </Link>
            <Link>
              <Icon
                icon="ri:youtube-fill"
                width={33}
                className="text-white hover:bg-red-600 rounded-full hover:p-1 hover:scale-110 duration-300"
              />
            </Link>
            <div className="flex gap-5 justify-between ml-10 items-center">
              <Link to="/appointment">
                <button
                  className="before:ease relative h-9 w-32 overflow-hidden border border-yellow-600 text-yellow-600 before:absolute before:left-0 before:-ml-2 before:h-48 before:w-48 before:origin-top-right before:-translate-x-full before:translate-y-12 before:-rotate-90 before:bg-yellow-600 before:transition-all before:duration-300 hover:text-[#F90101] hover:shadow-yellow-600 hover:before:-rotate-180 rounded-md font-semibold"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <span className="relative z-10 text-base">Appointment</span>
                </button>
              </Link>
              <Link to="/courses">
                <button
                  className="before:ease relative h-9 w-32 overflow-hidden border border-[#F90101] bg-[#F90101] text-white transition-all before:absolute before:top-1/2 before:h-0 before:w-64 before:origin-center before:-translate-x-20 before:rotate-45 before:bg-[#890F0F] before:duration-300 hover:text-white hover:shadow-yellow-500 hover:before:h-64 hover:before:-translate-y-32 rounded-md font-semibold"
                  style={{
                    boxShadow:
                      "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
                  }}
                >
                  <span className="relative z-10">Admission</span>
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderTop;
