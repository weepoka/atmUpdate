const express = require("express");
const router = express.Router();
const Visa = require("../model/visaModel");
const emailV = require("../utils/mailing");
const { tryCatch } = require("../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../customError");

const visaCreate = tryCatch(async (req, res, next) => {
  const {
    userName,
    mobile,
    email,
    age,
    location,
    ssc,
    hsc,
    bsc,
    master,
    ieltRead,
    ieltWrite,
    ieltSpeak,
    ieltListen,
    ieltOver,
  } = req.body;
  if (!userName || !mobile || !email) {
    return next(new BadRequestError("No Data"));
  }

  const newVisa = new Visa({
    userName,
    mobile,
    email,
    age,
    location,
    ssc,
    hsc,
    bsc,
    master,
    ieltRead,
    ieltWrite,
    ieltSpeak,
    ieltListen,
    ieltOver,
  });

  const saveVisa = await newVisa.save();

  if (!saveVisa) {
    return next(new InvalidEntry("No Data"));
  }
  let tem = `
  <!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>ATM Sir</title>
  </head>
  <body>
      <div style="width: 100%; max-width: 300px; margin: 0 auto; background-color: #3490dc; color: #fff; padding: 20px; text-align: center; border-radius: 4px;">
          <div style="text-align: center; ">
              <img style="height: 40px; width: 40px; border-radius: 50%;" src="https://media.licdn.com/dms/image/C5603AQFJnnaEj16ERw/profile-displayphoto-shrink_800_800/0/1610466408587?e=1701302400&v=beta&t=5ZMvh-CcYdRHRkwTjKjfjK92JdbchLEZqO-ONW7ISC8"/>
              <h4 style="font-size: 24px; font-weight: bold; display: inline-block; margin-top: 10px;">ATM's</h4>
          </div>
          <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">Visa Query</p>
         
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">Your inquiry  has been reached.</p>
          <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">Our expert team contact you soon</p>
         
        
         
      
      </div>
  </body>
  </html>
  `;
  emailV(email, tem, "Visa Query", "Send Success");
  res.status(200).json({ message: "Visa Query Send", data: saveVisa });
});

const getVisaList = tryCatch(async (req, res, next) => {
  const visa = await Visa.find({ contact: "NO" });

  if (visa.length < 1) {
    return next(new NotFoundError("No Visa Inquriy"));
  }

  return res
    .status(200)
    .json({ message: `Total Visa:${visa.length}`, data: visa });
});
const delVisa = tryCatch(async (req, res, next) => {
  const uid = req.params.id;

  const visa = await Visa.findOneAndDelete({ _id: uid });

  if (!visa) {
    return next(new NotFoundError("No Visa Delete"));
  }

  return res.status(200).json({ message: "Visa Delete Success" });
});

const updateVisa = tryCatch(async (req, res, next) => {
  const { contact, agreeWithUs, whoServiceHim } = req.body;
  const uid = req.params;
  const lib = {};

  if (!contact && !agreeWithUs && !whoServiceHim) {
    return res.status(400).json({ error: "No data provided for update." });
  }

  lib.contact = contact;
  lib.agreeWithUs = agreeWithUs;
  lib.whoServiceHim = whoServiceHim;

  const updatevisa = await Visa.findByIdAndUpdate(
    { _id: uid },
    { $set: lib },
    { new: true }
  );

  if (!updatevisa) {
    return next(new InvalidEntry("No visa found"));
  }
  return res.status(201).json({ message: "Update Success", data: updatevisa });
});

module.exports = {
  visaCreate,
  getVisaList,
  delVisa,
  updateVisa,
};
