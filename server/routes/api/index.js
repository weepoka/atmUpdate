const express = require("express");
const _ = express.Router();
const app = express();
const path = require("path");
const Banner = require("../../model/atmBanner");
const upload = require("../../utils/multa");
const adminA = require("../../middle/adminCk");

//banner part start ### completebanner
const {
  bannerUpload,
  getBanner,
  delBanner,
} = require("../../controller/bannerController");
_.post("/banner", upload.single("url"), bannerUpload); // completed//8//11
_.get("/banner", getBanner); // completed /8//11
_.delete("/banner/:id", delBanner); // 29//11
//banner part end  ##
//###########################################################################################################
//##########################################################################################################

// atm sir start ## completed
const { atmCreate, getAtm, delAtm } = require("../../controller/atmSir");
_.post("/atmsir", upload.single("url"), atmCreate); // completed//9//11
_.get("/atmsir", getAtm); // completed//9//11
_.delete("/atmsir/:id", delAtm); // completed//9//11
// atm sir end ***
//###########################################################################################################
//##########################################################################################################

//###video start #####// completed
const {
  videoUpload,
  delVideo,
  getVideo,
} = require("../../controller/videoController");
_.post("/video", videoUpload); // completed//8//11
_.get("/video", getVideo); // completed//8//11
_.delete("/video/:id", delVideo);
//###video end #####//
//###########################################################################################################
//##########################################################################################################

//#### Blog Post start ### completed

const {
  blogPost,
  getBlog,
  delBlog,
} = require("../../controller/blogController");
_.post("/blog", upload.single("url"), blogPost); // completed//9//11
_.get("/blog", getBlog); // completed//9//11
_.delete("/blog/:id", delBlog); //26//11
//#### Blog Post end ###
//###########################################################################################################
//##########################################################################################################

// #### Contact start #####// completed
const {
  contactUpload,
  getContact,
  delContat,
} = require("../../controller/contactController"); //28//11
_.post("/contact", upload.single("file"), contactUpload);
_.get("/contact", getContact); // completed // 12/11
_.delete("/contact/:id", delContat); //28//11
// #### Contact end #####//
//###########################################################################################################
//##########################################################################################################

// #### contact form start ###// completed
const {
  querySend,
  getQuery,
  delQuery,
  reply,
} = require("../../controller/contactFormController");
_.post("/query", querySend); //
_.post("/query-reply", reply); // reply by admin
_.get("/query", getQuery); //28//11
_.delete("/query/:id", delQuery); //28//11
// #### contact form end ###//
//###########################################################################################################
//##########################################################################################################

//##### Employee Start###### completed

const {
  newEmployee,
  getEmployee,
  updateEmp,
  hotLine,
  delEmployee,
  empManagement,
  emLogin,
} = require("../../controller/employeeController");
_.post("/employee", upload.single("url"), newEmployee); // create by admin 27//11
_.post("/employee/login", emLogin); // login with must  emailA, password
_.get("/employee", getEmployee); // comlteted in teampage/12/11
_.get("/hotline", hotLine); // executive for hotline completed //12/11
_.post("/employee/:email", updateEmp); // img and emailP update by employee
_.delete("/employee/:id", delEmployee); //admin 27//11
_.patch("/employee-management/:id", adminA, empManagement); //  admin handle employee management

//##### Employee End######
//###########################################################################################################
//##########################################################################################################

// ###### Course start ####### completed
const {
  newCourse,
  getCourse,
  delCourse,
  onLine,
  offLine,
  getCourseById,
  dropDown,
  mesDrop,
} = require("../../controller/courseController");
_.post("/course", upload.single("url"), newCourse); //completed//23//11
_.get("/course", getCourse); //completed//23//11
_.get("/course-id/:id", getCourseById); //26/11
_.delete("/course/:id", delCourse); //26/11
_.get("/course/online/:id", onLine); // show onlie schedule//26/11
_.get("/course/offline/:id", offLine); // show offline schedule//26/11
_.get("/drop", dropDown); // show offline schedule//02/12
_.post("/admin/mess-drop/:id", mesDrop); // show offline schedule//02/12
// ###### Course end #######
//###########################################################################################################
//##########################################################################################################

// ########## Student Registration start######## completed

const {
  regiStudent,
  emailVerify,
  resetPassword,
  resetRequest,
  updatedStudent,
  logiStudent,
  getStudent,
  viewStudent,
  allStudent,
  searchStd,
} = require("../../controller/student/regiController");
_.post("/student/regi", regiStudent); // completed /11/11
_.post("/student/login", logiStudent); // email or mobile or email and mobile with password // 11/11
_.get("/student/email/:email", emailVerify); //completed // 11//11
_.post("/student/reset", resetPassword);
_.post("/student/req-reset", resetRequest);
_.patch("/student/update/:id", upload.single("url"), updatedStudent);
_.get("/student/:uid", getStudent); // get info about student
_.get("/view-student/:sub", viewStudent);
_.get("/all-student", allStudent); // 29//11
_.get("/regi-view/:regi", searchStd); // 29//11
// course purchase ###// may completed//completed//16/11/
const {
  coursePurchase,
  sslSuccess,
  sslfail,
  sslNotifiaction,
  sslCancel,
  inVoice,
  getAllPayment,
} = require("../../controller/payment/sslPayment"); //completed//16/11/
_.post("/student/purchase", coursePurchase); //completed//16/11/
_.post("/student/ssl-payment-success/:tran_id", sslSuccess); //completed//16/11/
_.post("/student/ssl-payment-fail/:tran_id", sslfail); //completed//16/11/
_.post("/student/ssl-payment-cancel/:tran_id", sslCancel); //completed//16/11/
_.get("/student/student/ssl-payment-notification/:tran_id", sslNotifiaction); //completed//16/11/
// ########## Student Registration end ########

//###########################################################################################################
//###########################################################################################################
/// ####### Booking success complete ######
const {
  myBooked,
  sslSucces,
  sslfai,
  sslCance,
  sslNotifiactio,
} = require("../../controller/booking/bookingControl");

_.post("/booking", myBooked);
_.post("/booking/ssl-payment-success/:tran_id", sslSucces); //completed//16/11statc
_.post("/booking/ssl-payment-fail/:tran_id", sslfai); //completed//16/11/
_.post("/booking/ssl-payment-cancel/:tran_id", sslCance); //completed//16/11/
_.get("/booking/student/ssl-payment-notification/:tran_id", sslNotifiactio); //completed//16/11/
//##########################################################################################################

// appointment start###### completed
const {
  newApp,
  delApp,
  expireApp,
  isApprove,
  todayApp,
  nextApp,
  visitedApp,
  visitedController,
  allApp,
} = require("../../controller/appointment/visitingController");
_.post("/appointment", newApp); // create by client completed //12/11
_.delete("/appointment/:id", delApp); // delete by admin
_.get("/appointment-ex", expireApp); //28//11
_.get("/appointment-today", todayApp); //28//11
_.get("/appointment-next", nextApp); //28//11
_.get("/appointment-del", visitedApp); //28//11
_.get("/appointment-all", allApp); //28//11
_.post("/visited", visitedController); // client // competed //12/11
_.post("/appointment-update", isApprove); // by admin // 28//11
// appointment end ######
//###########################################################################################################
//##########################################################################################################

//result satrt#####  // completed
const {
  resultSearch,
  resultPublish,
  myResult,
  delResult,
  delAdminResult,
} = require("../../controller/result/resultController");
_.post("/admin/result-create", resultSearch); // admin
_.delete("/admin/result/:id", delAdminResult); // admin result delete  route
_.post(
  "/admin/result-publish/:id",
  upload.fields([{ name: "resultPdf" }, { name: "resultImg" }]),
  resultPublish
); // by admin //30//11
_.get("/student/result/:uid", myResult); // student route
_.delete("/student/result/:id.:rid", delResult); // student delete route

//result end#####

//###########################################################################################################
//##########################################################################################################
//Student Update from admin start *****
const {
  updatedStudentt,
} = require("../../controller/adminUpdate/studentUpdate");
_.patch("/admin/student-update/:id", updatedStudentt); // all update for studen

//Student Update from admin end *****

//###########################################################################################################
//##########################################################################################################
// Study abroad start // completed  form admin panel

const {
  showUni,
  createCountry,
  addUniversities,
  getUniversity,
  deleteUniversity,
} = require("../../controller/Study Abroad/abroadController");

_.get("/admin/study-uni/:id", showUni); // completed//13//11
//version2 start
_.post(
  "/admin/study-abroad/create",

  upload.single("url"),
  createCountry
); //complete//27/11
_.post(
  "/admin/study-abroad/:id/add-universities",
  upload.single("logo"),
  addUniversities
); //complete//27/11
_.delete("/admin/study-abroad/:uni/delete-university/:count", deleteUniversity); //complete//27/11
_.get("/admin/study-abroad/all-university", getUniversity); //completed//13//11
//version2 end
// Study abroad end
//###########################################################################################################
//visitor calculate / / completed

const {
  sumVisitor,
  getVsitor,
} = require("../../controller/visitor/visitorController");
_.post("/visitor", sumVisitor);
_.get("/visitor", getVsitor);
//##########################################################################################################
//####################################### Invoice #########################################################
_.get("/invoice/:tran_id", inVoice); //completed//16/11/
_.get("/my-invoice/:email", getAllPayment); //completed//16/11/
//##########################################################################################################
//##################################### visa  completed###############################################################
const {
  visaCreate,
  getVisaList,
  delVisa,
  updateVisa,
} = require("../../controller/visaController");
_.post("/visa", visaCreate); //completed//22/11/
_.get("/visa", getVisaList);
_.delete("/visa/:id", delVisa); //
_.patch("/visa", updateVisa);
//######################################### approve completedt ############################################

const {
  appVisa,
  getApp,
  dellApp,
} = require("../../controller/approveController");

_.post("/approve/:id", appVisa); //29//11
_.get("/approve", getApp); //29//11
_.delete("/approve/:id", dellApp); //29//11
//##########################################################################################################
//##########################################################################################################

module.exports = _;
