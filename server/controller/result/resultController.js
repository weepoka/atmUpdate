const express = require("express");
const Result = require("../../model/resultModel");
const Student = require("../../model/studentModel");
const Course = require("../../model/courseModel");
const file = require("fs");
const emailV = require("../../utils/mailing");
const appStatus = require("../../middle/successHandle");
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");

const resultSearch = tryCatch(async (req, res, next) => {
  const { title, startDate, regiNumber } = req.body;
  console.log(title, startDate);
  const matchStd = await Student.findOne({ regiNumber: regiNumber });
  const matchCourse = await Course.findOne({
    startDate: startDate,
    title: title,
  });
  if (!matchStd) {
    return next(new NotFoundError("Student ID didn't mactch"));
  }
  if (!matchCourse) {
    return next(new NotFoundError("Course not found"));
  }

  const ভয়ও = matchStd.myCourse
    .map((courseId) => courseId.toString())
    .includes(matchCourse._id.toString());

  if (!ভয়ও) {
    return next(new NotFoundError("এই ছাত্র কোর্স টি কিনে নাই"));
  }

  const তথ্য = {
    coureName: matchCourse.title,
    startDate: startDate.split("T")[0],
    coureId: matchCourse._id,
    studentId: matchStd._id,
    studentName: matchStd.name,
    studentReg: matchStd.studentReg,
    studentEmail: matchStd.email,
    studentMobile: matchStd.mobile,
    regiNumber: matchStd.regiNumber,
  };
  res.status(200).json({ message: "You can Publish", data: তথ্য });
});

const resultPublish = tryCatch(async (req, res, next) => {
  const {
    point,
    grade,
    mark,
    score,
    totalMark,
    negativeMark,
    rightAnswer,
    wrongAnswer,
    percentage,
    comment,
  } = req.body;
  const { id } = req.params;
  console.log("result:", wrongAnswer, percentage, comment);
  const isStudent = await Student.findOne({ _id: id });
  if (!isStudent) {
    return next(new NotFoundError("Student Not Found"));
  }

  const data = {
    schedule: isStudent.activeCourse.schedule,
    startDate: isStudent.activeCourse.startDate,
    courseId: isStudent.activeCourse.coureId,
    coureName: isStudent.activeCourse.name,

    studentId: isStudent._id,
    studentName: isStudent.name,
    studentReg: isStudent.regiNumber,
    studentEmail: isStudent.email,
    studentMobile: isStudent.mobile,
  };

  const { resultImg, resultPdf } = req.files || {};

  const url = resultImg ? resultImg[0].filename : null;
  const pdf = resultPdf ? resultPdf[0].filename : null;
  const join = new Result({
    data,
    result: {
      point: point,
      grade: grade,
      mark: mark,
      score: score,
      totalMark: totalMark,
      negativeMark: negativeMark,
      rightAnswer: rightAnswer,
      wrongAnswer: wrongAnswer,
      percentage: percentage,
      comment: comment,
      resultPdf: pdf,
      resultImg: url,
    },
  });

  const meow = await join.save();
  if (!meow) {
    throw new Error("Failed to save result");
  }

  const yoy = await Student.findByIdAndUpdate(
    { _id: join.data.studentId },
    { $push: { result: meow._id } },
    { new: true }
  );
  if (!yoy) {
    return next(new NotFoundError("User Id Not found")); 
  }
  console.log("meow:", meow);
  emailV(
    yoy.email,
    ``,
    "Your Result Published",
    `${join.data.coureName} kindly check your profile`
  );
  res.status(200).json({ message: "Result Send and Created", data: meow });
});

const myResult = tryCatch(async (req, res, next) => {
  const { uid } = req.params;
  console.log("hello");
  const matchUser = await Student.findById(uid, "-password").populate("result");
  console.log(matchUser);
  if (!matchUser) {
    return next(new NotFoundError("No result found"));
  }

  appStatus(200, "Your result", matchUser, res);
});

const delResult = tryCatch(async (req, res, next) => {
  const uid = req.params.id;
  const rid = req.params.rid;

  const updatedStudent = await Student.findByIdAndUpdate(
    { _id: uid },
    { $pull: { result: rid } },
    { new: true }
  );

  if (!updatedStudent) {
    return next(new NotFoundError("Student not found"));
  }

  appStatus(200, "delete", updatedStudent, res);
});
const delAdminResult = tryCatch(async (req, res, next) => {
  const uid = req.params.id;
  const delet = await Result.findByIdAndDelete({ _id: uid });
  if (!delet) {
    return next(new NotFoundError("Result not found"));
  }

  appStatus(200, "Result", "", res);
});

module.exports = {
  resultSearch,
  resultPublish,
  myResult,
  delResult,
  delAdminResult,
};
