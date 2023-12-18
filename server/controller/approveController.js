const express = require("express");
const router = express.Router();
const Visa = require("../model/visaModel");
const emailV = require("../utils/mailing");
const { tryCatch } = require("../utils/tryCatch");
const Approve = require("../model/approveVisa");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../customError");
const appStatus = require("../utils/appStatus");

const appVisa = tryCatch(async (req, res, next) => {
  const { country } = req.body;
  const uid = req.params.id;
  console.log(country, uid);
  const isVisa = await Visa.findOne({ _id: uid });

  if (!isVisa) {
    return next(new BadRequestError("No visa Query "));
  }

  const newApprove = new Approve({
    userName: isVisa.userName,
    mobile: isVisa.mobile,
    email: isVisa.email,
    age: isVisa.age,
    location: isVisa.location,
    ssc: isVisa.ssc,
    hsc: isVisa.hsc,
    bsc: isVisa.bsc,
    master: isVisa.master,
    ieltRead: isVisa.ieltRead,
    ieltWrite: isVisa.ieltWrite,
    ieltSpeak: isVisa.ieltSpeak,
    ieltListen: isVisa.ieltListen,
    ieltOver: isVisa.ieltOver,
    country,
  });
  const saveApp = await newApprove.save();

  if (!saveApp) {
    return next(new InvalidEntry("Input not valid"));
  }
    const visa = await Visa.findOneAndDelete({ _id: uid });

    if (!visa) {
      return next(new NotFoundError("No Visa Delete"));
    }
  appStatus(200, "Created", saveApp, res);
});

const getApp = tryCatch(async (req, res, next) => {
  const ifApp = await Approve.find();
  if (!ifApp.length > 0) {
    return next(new NotFoundError("No visa Query "));
  }
  appStatus(200, "", ifApp, res);
});

const dellApp = tryCatch(async (req, res, next) => {
  const uid = req.params.id;

  const visa = await Approve.findOneAndDelete({ _id: uid });

  if (!visa) {
    return next(new NotFoundError("No Visa Delete"));
  }

  return res.status(200).json({ message: "Visa Delete Success" });
});

module.exports = { appVisa, getApp, dellApp };
