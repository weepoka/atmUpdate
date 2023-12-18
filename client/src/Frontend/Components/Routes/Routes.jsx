import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../../Layout/MainLayout";
import Home from "../Pages/Home/Home/Home";
import ContactUs from "../Pages/ContactUs/ContactUs";
import Blog from "../Pages/Blogs/Blog";
import BlogDetails from "../Pages/Blogs/BlogDetails";
import Team from "../Pages/Team/Team";
import Courses from "../Pages/Courses/Courses";
import Login from "../Pages/Login/Login";
import Appointment from "../Pages/Appoinment/Appointment";
import SignUp from "../Pages/Login/SignUp";
import CountryDetails from "../Pages/Courses/CountryDetails";
import CourseDetails from "../Pages/Courses/CourseDetails";
import NotFound from "../Pages/NotFound/NotFound";
import AboutAtm from "../Pages/AboutAtm's/AboutAtm";
import Country from "../Pages/Country/Country";
import Visa from "../Pages/Visa/Visa";
import Admission from "./../Pages/Admission/Admission";
import Profile from "../Pages/Profile/Profile";
import AdminLayout from "../../Admin/Components/AdminLayout/AdminLayout";
import Dashboard from "../../Admin/Components/Pages/Dashboard/Dashboard";
import Course from "../../Admin/Components/Pages/Course/AdminCourse";
import AddCourse from "../../Admin/Components/Pages/Course/AddCourse";
import AdminBlog from "../../Admin/Components/Pages/Blog/AdminBlog";
import AdminCourse from "../../Admin/Components/Pages/Course/AdminCourse";
import AddBlog from "../../Admin/Components/Pages/Blog/AddBlog";
import AdminStudy from "../../Admin/Components/Pages/Study/AdminStudy";
import AdminAddStudy from "../../Admin/Components/Pages/Study/AdminAddStudy";
import AddBannerAndMoments from "../../Admin/Components/Pages/HomePage/AddBannerAndMoments";
import AddSpeech from "../../Admin/Components/Pages/HomePage/AddSpeech";
import AdminSpeech from "../../Admin/Components/Pages/HomePage/AdminSpeech";
import AddHeros from "./../../Admin/Components/Pages/Heros/AddHeros";
import AddContact from "../../Admin/Components/Pages/Contact/AddContact";
import AboutAtms from "../../Admin/Components/Pages/AboutAtms/AboutAtms";
import AddAboutAtms from "../../Admin/Components/Pages/AboutAtms/AddAboutAtms";
import EmailVerificationSuccess from "../EmailVerifySucc";
import EmailVerificationFail from "../EamilVerificationFail";
import PaymentSuccess from "./PaymentSucc";
import PaymentCancel from "./PaymentCan";
import PaymentFail from "./PaymentFail";
import Appointmentt from "../../Admin/Components/Pages/Infotrmation/Appointment";
import Visaquery from "../../Admin/Components/Pages/Infotrmation/Visaquery";
import Query from "../../Admin/Components/Pages/Infotrmation/Query";
import AdminStudent from "../../Admin/Components/Pages/HomePage/AdminStudent";
import Reset from "../Pages/Login/Reset";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/contact",
        element: <ContactUs />,
      },
      {
        path: "/blog",
        element: <Blog />,
      },
      {
        path: "/payment-success/:tran_id",
        element: <PaymentSuccess />
      }, {
        path: "/payment-fail/:tran_id",
        element: <PaymentFail />
      },
      {
        path: "/Payment-cancel/:tran_id",
        element: <PaymentCancel />
      },

      {
        path: "/study",
        element: <Country />,
      },
      {
        path: "/visa",
        element: <Visa />,
      },
      {
        path: "/blog/blogDetails/:id",
        element: <BlogDetails />,
      },
      {
        path: "/team",
        element: <Team />,
      },
      {
        path: "/courses",
        element: <Courses />,
      },
      {
        path: "/courseDetails/:id",
        element: <CourseDetails />,
      },
      {
        path: "/course/countryDetails/:id",
        element: <CountryDetails />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/reset",
        element: <Reset />,
      },
      {
        path: "/signUp",
        element: <SignUp />,
      },
      {
        path: "/about",
        element: <AboutAtm />,
      },
      {
        path: "/appointment",
        element: <Appointment />,
      },
      {
        path: "/admission",
        element: <Admission />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },

      {
        path: "/email-success/:id",
        element: <EmailVerificationSuccess />,
      },
      {
        path: "/email-fail/:id",
        element: <EmailVerificationFail />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFound />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      {
        path: "/admin",
        element: <Dashboard />,
      },
      {
        path: "course",
        element: <AdminCourse />,
      },
      {
        path: "AddCourse",
        element: <AddCourse />,
      },
      {
        path: "UpdateCourse",
        element: <AddCourse />,
      },
      {
        path: "blog",
        element: <AdminBlog />,
      },
      {
        path: "AddBlog",
        element: <AddBlog />,
      },

      {
        path: "study",
        element: <AdminStudy />,
      },
      {
        path: "addStudy/:id",
        element: <AdminAddStudy />,
      },
      {
        path: "AddBanner&Moments",
        element: <AddBannerAndMoments />,
      },
      {
        path: "AdminSpeech",
        element: <AdminSpeech />,
      },
      {
        path: "AddSpeech",
        element: <AddSpeech />,
      },
      {
        path: "addTeam",
        element: <AddHeros />,
      },
      {
        path: "addContact",
        element: <AddContact />,
      },
      {
        path: "addAbout",
        element: <AddAboutAtms />,
      },
      {
        path: "appointmentt",
        element: <Appointmentt />,
      },
      {
        path: "query",
        element: <Query />,
      },
      {
        path: "student",
        element: <AdminStudent />,
      },
      {
        path: "visa-query",
        element: <Visaquery />,
      },
    ],
  },
]);
