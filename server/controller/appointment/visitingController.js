const express = require("express");
const Appointment = require("../../model/appointmentModel");
const emailV = require("../../utils/mailing");
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");
const validateEmail = require("../../utils/validEmail");

const newApp = tryCatch(async (req, res, next) => {
  const {
    firstName,
    lastName,
    email,
    mobile,
    reasonForVisit,
    isFirstVisit,
    visitingDate,
    visitingTime,
    uid,
  } = req.body;

  // if (!validateEmail(email)) {
  //   return next(new InvalidEntry("Invalid Email"));
  // }

  const appointment = new Appointment({
    firstName,
    lastName,
    email,
    mobile,
    reasonForVisit,
    isFirstVisit,
    visitingDate,
    visitingTime,
    uid,
  });
  await appointment.save();
  res.status(200).json({ message: "Appointment Sent", data: appointment });
});

const delApp = tryCatch(async (req, res, next) => {
  const uid = req.params.id;
  console.log(typeof uid);
  const matchUid = await Appointment.findByIdAndDelete({ _id: uid });
  if (!matchUid) {
    return next(new NotFoundError("Given Id not found"));
  }

  res.status(200).json({ message: "Delete success" });
});

const isApprove = tryCatch(async (req, res, next) => {
  const { confirmDate, id, visited } = req.body;

  let approve = true;

  const matchUid = await Appointment.findOneAndUpdate(
    { _id: id },
    {
      $set: {
        confirmDate,
        visited,
        approve,
      },
    },
    { new: true }
  );

  console.log("data:", matchUid);
  if (confirmDate) {
    let text = "Appointment Confirmed";
    let sub = "Appointment Confirmation";
    let htmlTemplate = `
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
              <p style="color: #e53e3e; font-size: 18px; margin-top: 4px;">${sub}</p>
              <p style="color: #e53e3e; font-size: 14px; margin-top: 4px;">${text}</p>
              <p style="color: #e53e3e; font-size: 14px; margin-top: 4px;">Your Query:${matchUid.reasonForVisit}</p>
              <p style="color: #e53e3e; background-color: #fff; font-size:  12px; front-family:bold; margin-top: 10px;">Appointment Date:${matchUid.confirmDate}  Time:${matchUid.confirmTime} </p>
          </div>
      </body>
      </html>
      `;
    await emailV(matchUid.email, htmlTemplate, sub, text);
    return res.status(200).json({
      message: `Appointment Date:${matchUid.confirmDate}  Time:${matchUid.confirmTime} `,
    });
  }

  return res.status(200).json({
    message: `Updated `,
    data: matchUid,
  });
});

const todayApp = tryCatch(async (req, res, next) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const hasApp = await Appointment.find({
    confirmDate: {
      $gte: todayStart,
      $lte: todayEnd,
    },
    approve: true,
    visited: "No",
  });

  if (!hasApp.length > 0) {
    return next(new NotFoundError("No Appointment"));
  }

  console.log("me", hasApp);

  res.status(200).json({
    message: `You have today ${hasApp.length} Appointment`,
    data: hasApp,
  });
});

const expireApp = tryCatch(async (req, res, next) => {
  const hasApp = await Appointment.find({
    approve: false,
    visited: "No",
  });
  if (!hasApp.length > 0) {
    return next(new NotFoundError("No Appointment"));
  }

  console.log("me", hasApp);
  res.status(200).json({
    message: `You have ${hasApp.length} expire appointment${
      hasApp.length > 1 ? "s" : ""
    }`,
    data: hasApp.reverse(),
  });
});

const nextApp = tryCatch(async (req, res, next) => {
  const todayStart = new Date();

  const todayEnd = new Date();
  todayEnd.setHours(23, 59, 59, 999);

  const hasApp = await Appointment.find({
    confirmDate: {
      $gt: todayEnd,
    },
    approve: true,
    visited: "No",
  });

  if (!hasApp.length > 0) {
    return next(new NotFoundError("No Appointment"));
  }

  console.log("me", hasApp);

  res.status(200).json({
    message: `You have Next ${hasApp.length} Appointment`,
    data: hasApp,
  });
});
const visitedApp = tryCatch(async (req, res, next) => {
  const todayStart = new Date();
  todayStart.setHours(0, 0, 0, 0);

  const hasApp = await Appointment.find({
    confirmDate: {
      $lt: todayStart,
    },
    approve: true,
  });

  if (!hasApp.length > 0) {
    return next(new NotFoundError("No Appointment"));
  }

  console.log("me", hasApp);

  res.status(200).json({
    message: `You have Next ${hasApp.length} Appointment`,
    data: hasApp,
  });
});

const visitedController = tryCatch(async (req, res, next) => {
  const { uid } = req.body;
  const hasVisited = await Appointment.find({ uid: uid, visited: "No" });
  console.log(hasVisited.length);
  if (hasVisited.length > 0) {
    return res.status(200).json({
      data: "Yes",
    });
  }
  return res.status(200).json({
    data: "No",
  });
});
const allApp = tryCatch(async (req, res, next) => {
  const hasApp = await Appointment.find({
   
  });
  if (!hasApp.length > 0) {
    return next(new NotFoundError("No Appointment"));
  }


  res.status(200).json({
    message: `You have ${hasApp.length} expire appointment${
      hasApp.length > 1 ? "s" : ""
    }`,
    data: hasApp,
  });
});
module.exports = {
  newApp,
  delApp,
  expireApp,
  isApprove,
  todayApp,
  nextApp,
  visitedController,
  visitedApp,
  allApp
};
