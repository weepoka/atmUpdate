import { Outlet } from "react-router-dom";
import Navbar from "./../Components/Pages/Home/Shared/Navbar/Navbar";
import Footer from "../Components/Pages/Home/Shared/Footer/Footer";
import HeaderTop from "../Components/Pages/Home/Shared/Navbar/HeaderTop";

const MainLayout = () => {
  return (
    <div className="">
      <HeaderTop />
      <Navbar />
      <Outlet></Outlet>
      <Footer />
    </div>
  );
};

export default MainLayout;
