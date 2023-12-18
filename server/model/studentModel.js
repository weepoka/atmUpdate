const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const studentSchema = {
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  addrerss: { type: String },
  mobile: { type: String, unique: true },
  myBooking: [{ type: Schema.Types.ObjectId, ref: "Booked" }],
  regiNumber: {
    type: String,
    default: function () {
      const min = 100000;
      const max = 999999;
      return `Reg-` + `${Math.floor(Math.random() * (max - min + 1)) + min}`;
    },
    unique: true,
  },
  isEmailVerify: { type: Boolean, default: false },
  otp: { type: String },
  myCourse: [{ type: Schema.Types.ObjectId, ref: "Course" }],
  activeCourse: {
    // complete
    courseId: { type: Schema.Types.ObjectId, ref: "Course" },
    name: { type: String },
    schedule: { type: String },
    startDate: { type: Date },
    endDate: { type: Date }, 
    classTime: { type: String },
  },

  activeCourseEnd: { type: Date }, // completed

  nextCourse: {
    // manualy set by admin,  completed
    name: { type: String },
    schedule: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    classTime: { type: String },
  },
  changePermission: { type: Number, default: 1, enum: [1, 2, 3] }, // admin can access
  stopCourse: [
    {
      id: { type: String },
      courseName: { type: String },
      Schedule: { type: String },
      changeInfo: { type: String },
      approve: { type: Boolean, default: false },
    },
  ], // only admin access,  completed
  changeTo: [
    {
      // only admin access, completed
      courseName: { type: String },
      Schedule: { type: String },
      startDate: { type: Date },
      classTime: { type: String },
    },
  ],

  orderPid: { type: String },
  orderCourse: { type: String },
  timestamps: {
    type: Date,
    default: Date.now(),
  },
  result: [
    {
      type: Schema.Types.ObjectId,
      ref: "Result", // result model from admin panel completed
    },
  ],
  url: {
    type: String,
    default:
      "https://wop-files.s3.us-west-2.amazonaws.com/no-user-image-icon-0-1685274609551.jpg",
  },
  role: {
    type: String,
    default: "Student",
  },
  info: [
    // update info store by admin
    {
      type: String,
    },
  ],
  myComplain: [
    //  by student as chatting
    {
      type: String,
    },
  ],
  xStudent: { type: Boolean, default: false },
  dropStudent: { type: Boolean, default: false },
};

module.exports = mongoose.model("Student", studentSchema);
