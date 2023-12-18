const express = require("express");
const _ = express.Router();
const bcrypt = require("bcrypt");
const Student = require("../../model/studentModel");
const Course = require("../../model/courseModel");
const validateEmail = require("../../utils/validEmail");
const emailV = require("../../utils/mailing");
const validateMob = require("../../utils/mobile");
const { otpG } = require("../../utils/optGen");
const { NotFoundError, BadRequestError } = require("../../customError");
const { tryCatch } = require("../../utils/tryCatch");

const regiStudent = async (req, res) => {
  try {
    const { fullName, email, phone, password } = req.body;

    console.log(fullName, email, phone, password);
    let newOtp = otpG();

    const emailMatch = await Student.findOne({ email: email });
    // if (!validateMob(phone)) {
    //   return res.status(400).json({ errro: "Enter Valid Mobile" });
    // }
    if (emailMatch) {
      return res.status(400).json({ error: "Email is already registered" });
      //   if (!validateEmail(email)) {
      //   return res.status(400).json({ errro: "Enter Valid Email" });
      // }
    }
    let text = " Verify your email";
    let sub = "Email Verification";
    let link = `${
      process.env.SERVER_URL
    }/atms/api/v1/student/email/${123}?email=${email}`;
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
      <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">${sub}</p>
      <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${text}</p>
      <a href="${link}" style="color: #fff; text-decoration: underline;">Verify Email</a>
    </div>
  </body>
  </html>
`;

    emailV(email, htmlTemplate, sub, text);

    bcrypt.hash(password, 5, async (err, hash) => {
      const student = await new Student({
        name: fullName,
        email,
        mobile: phone,
        password: hash,
        otp: newOtp,
      });

      const info = await student.save();

      res.status(200).json({
        message: " User info saved , Kindly verify your Email",
        data: info,
      });
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", reason: error.message });
  }
};

const emailVerify = async (req, res) => {
  try {
    const { email } = req.query;
    const { id } = req.params;

    const updatedStudent = await Student.findOne({
      email: email,
      isEmailVerify: false,
    });
    console.log(updatedStudent);
    if (updatedStudent) {
      const mew = await Student.findByIdAndUpdate(
        { _id: updatedStudent._id },
        { $set: { isEmailVerify: true, otp: "" } },
        { new: true }
      );
      return res.redirect(`${process.env.CLIENT_URL}/email-success/${mew._id}`);
    }
    const updatedStuden = await Student.findOneAndUpdate({
      email: email,
      isEmailVerify: true,
    });
    if (!updatedStudent && updatedStuden) {
      const idx = updatedStuden._id;
      return res.redirect(`${process.env.CLIENT_URL}/email-fail/${idx}`);
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", reason: error.message });
  }
};
const resetRequest = async (req, res) => {
  try {
    const { email } = req.body;
    console.log(email);
    const match = await Student.findOne({
      email: email,
      isEmailVerify: true,
    });

    if (match) {
      let newOtp = otpG();
      let sub = " Reset Password Request";
      let text = "Set New Password";
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
                <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">${sub}</p>
                <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${text}</p>
                <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">Code: ${newOtp}</p>
            </div>
        </body>
        </html>
        `;
      emailV(email, htmlTemplate, sub, text);
      await Student.findByIdAndUpdate(
        { _id: match._id },
        { $set: { otp: newOtp } },
        { new: true }
      );
      res.status(200).json({ message: "OTP Sent" });
    } else {
      res.status(400).json({ error: "User not matched" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error", reason: error.message });
  }
};
const resetPassword = async (req, res) => {
  try {
    const { email, password, otp } = req.body;
    console.log(email, otp, password);
    const match = await Student.findOneAndUpdate(
      { email: email, isEmailVerify: true, otp: otp },
      { $set: { otp: "" } },
      { new: true }
    );

    if (match) {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          return res.status(500).json({
            error: "Error hashing the password",
            reason: err.message,
          });
        }
        await Student.findOneAndUpdate(
          { _id: match._id },
          { $set: { password: hash } },
          { new: true }
        );

        res.status(200).json({ message: "Save new password" });
      });
    } else {
      res.status(400).json({ error: "Student not found" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", reason: error.message });
  }
};
const updatedStudent = async (req, res) => {
  try {
    const uid = req.params.id;
    const { addrerss, myComplain } = req.body;
    const url = req.file ? req.file.filename : null; // Extract filename

    const add = addrerss;
    const com = myComplain;
    const updateFields = {};

    // Conditionally include the url field only if a new file is uploaded
    if (url) {
      updateFields.url = url;
    }

    if (add) {
      updateFields.addrerss = add;
    }

    const update = await Student.findByIdAndUpdate(
      { _id: uid },
      { $set: updateFields, $push: { myComplain: com } },
      { new: true, select: "-password" }
    );

    if (update) {
      res.status(200).json({ message: "Updated", user: update });
    } else {
      res.status(404).json({ error: "Update Failed" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", reason: error.message });
  }
};

const logiStudent = tryCatch(async (req, res, next) => {
  const { email, phone, pass } = req.body;
  const password = pass;
  const loginEmail = await Student.findOne({
    email: email,
    isEmailVerify: true,
  });
  const loginMob = await Student.findOne({
    mobile: phone,
    isEmailVerify: true,
  });

  const user = loginEmail || loginMob;

  if (user && password) {
    bcrypt.compare(password, user.password, async (error, result) => {
      if (error) {
        return next(error);
      }

      if (result) {
        const { password, ...userWithoutPassword } = user.toObject();
        return res.status(200).json({
          message: "Login Success",
          data: userWithoutPassword,
        });
      } else {
        return next(new BadRequestError("Authentication Failed"));
      }
    });
  } else {
    return next(new NotFoundError("User not found"));
  }
});
const getStudent = tryCatch(async (req, res, next) => {
  const { uid } = req.params;
  const resp = await Student.findById({ _id: uid });
  if (!resp) {
    return next(new NotFoundError("NO"));
  }
  return res.status(200).json({ message: "done", data: resp });
});

const viewStudent = tryCatch(async (req, res, next) => {
  const sub = req.params.sub;
  console.log(typeof sub);

  const std = await Course.findOne({ title: sub }).populate("totalBuyerList");

  if (std.totalBuyerList.length < 1) {
    return next(new NotFoundError("No  Buyer "));
  }
  return res.status(200).json({
    message: `Total buyer :${std.totalBuyerList.length}`,
    data: std.totalBuyerList,
  });
});

const allStudent = tryCatch(async (req, res, next) => {
  const all = await Student.find({ role: "Student" });

  if (all.length < 1) {
    return next(new NotFoundError("NO Student "));
  }
  return res.status(200).json({
    message: `Total  students: ${all.length ? all.length : 0}`,
    data: all,
  });
});

const searchStd = tryCatch(async (req, res, next) => {
  const { regi } = req.params;

  const resp = await Student.find({ regiNumber: `Reg-${regi}` });

  if (!resp) {
    return next(new NotFoundError("NO"));
  }
  return res.status(200).json({ message: "done", data: resp });
});
module.exports = {
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
};
