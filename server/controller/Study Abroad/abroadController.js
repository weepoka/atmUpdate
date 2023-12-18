const express = require("express");

const University = require("../../model/universityModel");
const Forigen = require("../../model/forigenUni");
const file = require("fs");
const emailV = require("../../utils/mailing");
const appStatus = require("../../middle/successHandle");
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");
const lib = require("../../utils/staticFile");



const showUni = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  console.log(id);
  const matchUni = await Forigen.findOne({ country: id }).populate(
    "university"
  );
  if (!matchUni) {
    return next(new InvalidEntry("Not Match"));
  }

  appStatus(200, "Univerty view", matchUni, res);
});


const createCountry = tryCatch(async (req, res, next) => {
  const { country, countryDetail } = req.body;

  const isAlready = await Forigen.findOne({ country: country });

  if (isAlready) {
    return next(new BadRequestError("Already Have"));
  }
  const url = req.file ? req.file.filename : "";
  if (url === "") {
    return next(new BadRequestError("No Image"));
  }

  const forigen = new Forigen({
    country,
    countryDetail,
    url: url,
  });

  const savedForigen = await forigen.save();

  if (!savedForigen) {
    return next(new BadRequestError("Not Saved"));
  }

  appStatus(200, "Save", savedForigen, res);
});

//**Add more universities
const addUniversities = tryCatch(async (req, res, next) => {
  const {
    uniName,
    ielts,
    programTitle,
    degree,
    applyStart,
    duration,
    session,
    tution,
    isPartTime,
    rank,
    workPermit,
    creditOne,
    map,
    deadLine,
    moreInfo,
  } = req.body;
  const { id } = req.params;

  const isThere = await Forigen.findOne({ country: id });
  if (!isThere) {
    return next(new NotFoundError("NO Country Found"));
  }

  const newUni = new University({
    logo: req.file ? req.file.filename : "",
    uniName,
    ielts,
    programTitle,
    degree,
    applyStart,
    duration,
    session,
    tution,
    isPartTime,
    rank,
    workPermit,
    creditOne,
    map,
    deadLine,
    moreInfo,
    forigen: isThere._id,
    url: isThere.url,
    country: isThere.country,
  });
  const savedUni = await newUni.save();
  if (!savedUni) {
    return next(new BadRequestError("Failed"));
  }
  await Forigen.findByIdAndUpdate(
    { _id: isThere._id },
    { $push: { university: savedUni._id } }
  );
  appStatus(200, "Added", savedUni, res);
});
//### Get University

const getUniversity = tryCatch(async (req, res, next) => {
  const ifExist = await Forigen.find().populate("university");
  if (!ifExist) {
    return next(new NotFoundError("NO University"));
  }

  appStatus(200, "Uiversity", ifExist, res);
});
//## Delete an individual university
const deleteUniversity = tryCatch(async (req, res, next) => {
  const { uni, count } = req.params;
  console.log(typeof uni, count);

  const x = await Forigen.findOne({ country: count });
  if (!x) {
    return next(new NotFoundError("Country not found"));
  }

  const forigen = await Forigen.findByIdAndUpdate(
    { _id: x._id },
    {
      $pull: { university: { _id: uni } },
    },
    { new: true }
  );

  if (!forigen) {
    return next(new NotFoundError("Foreign entry not found"));
  }

  const isUni = await University.findOne({ _id: uni });
  if (!isUni) {
    return next(new NotFoundError("University not found"));
  }

  lib.delete(isUni.logo);
  const delUni = await University.findByIdAndDelete({ _id: uni });

  if (!delUni) {
    return next(new NotFoundError("Failed to delete university"));
  }

  appStatus(200, "University deleted", forigen, res);
});

/// forigen ############## End ##
module.exports = {
  // studyAb,
  // getAbroad,
  // addUniversity,
  // delAb,
  showUni,

  createCountry,
  addUniversities,
  getUniversity,
  deleteUniversity,
};
