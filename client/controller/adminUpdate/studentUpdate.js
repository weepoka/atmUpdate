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

const updatedStudentt = tryCatch(async (req, res, next) => {
  const uid = req.params.id;
  const updateFields = req.body;
  console.log(updateFields);

  const updatedStudent = await Student.findByIdAndUpdate(
    uid,
    {
      $set: updateFields,
    },
    { new: true }
  );

  if (!updatedStudent) {
    return next(new NotFoundError("Update fail"));
  }

  appStatus(200, "Student information updated", updatedStudent, res);
});

// const templatEng = tryCatch(async (req, res, next) => {
//   res.render("index");
// });

// const tempResult = tryCatch(async (req, res, next) => {
//   const { username, email } = req.body;
//   console.log(username,email)
//   res.render("result", { username, email });
// });
module.exports = { updatedStudentt };
