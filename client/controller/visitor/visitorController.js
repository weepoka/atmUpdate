const express = require("express");
const Visitor = require("../../model/vistorModel");
const file = require("fs");
const emailV = require("../../utils/mailing");
const appStatus = require("../../middle/successHandle");
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");

const sumVisitor = tryCatch(async (req, res, next) => {
 
  
    const how = await Visitor.findByIdAndUpdate(
      { _id: "65253633e7ae3016c86a1991" },
      { $inc: { total: 1 } },
      { new: true }
    );
  
    if (how===null) {
      return next(new BadRequestError("Visitor not found"));
    }
  
    appStatus(201, "Visitor", how.total, res);
  });
  

const getVsitor = tryCatch(async (req, res, next) => {
  const how = await Visitor.find();
  if (!how.length > 0) {
    return next(new NotFoundError("Visitor not found"));
  }

  appStatus(200, "Total Visitor", how[0].total, res);
});
module.exports = { sumVisitor, getVsitor };
