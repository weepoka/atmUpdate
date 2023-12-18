const express = require("express");
const router = express.Router();
const Course = require("../model/courseModel");
const lib = require("../utils/staticFile");
const Student = require("../model/studentModel");
const emailV = require("../utils/mailing");

const newCourse = async (req, res) => {
  const {
    title,
    courseDuration,
    classesNumber,
    extarClass,
    mockTest,
    admissionLastDate,
    startDate,
    offlineFee,
    onlineFee,
    version,
  } = req.body;
  const url = req.file;
  const offlineFe = JSON.parse(offlineFee);
  const onlineFe = JSON.parse(onlineFee);
  try {
    if (
      !title ||
      !courseDuration ||
      !classesNumber ||
      !startDate ||
      !version ||
      url === ""
    ) {
      return res
        .status(400)
        .json({ error: "Bad Request", reason: "Incomplete data" });
    }

    let m = false;
    let n = false;
    console.log("version:", version);
    if (version === "Online") {
      m = true;
    }
    if (version === "Offline") {
      n = true;
    }
    if (version === "Online & Offline") {
      m = true;
      n = true;
    }

    const course = new Course({
      title,
      courseDuration,
      classesNumber,
      extarClass,
      mockTest,
      admissionLastDate,
      startDate,
      offlineFee: offlineFe,
      onlineFee: onlineFe,
      online: m,
      offline: n,
      url: url.filename,
    });

    const saveCourse = await course.save();

    return res
      .status(200)
      .json({ message: "Create successful", data: saveCourse });
  } catch (error) {
    return res
      .status(500)
      .json({ error: "Server error", reason: error.message });
  }
};

const getCourse = async (req, res) => {
  try {
    const course = await Course.find();
    if (course.length > 0) {
      res.status(200).json({ message: "Successful", data: course });
    } else {
      res.status(400).json({ error: "No Course Found " });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id.length);

    if (id.length > 20) {
      const course = await Course.findById({ _id: id });

      if (course) {
        res.status(200).json({ success: true, data: course });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    } else {
      const course = await Course.findOne({ title: id });

      if (course) {
        res.status(200).json({ success: true, data: course });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    }
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", reason: error.message });
  }
};

const delCourse = async (req, res) => {
  try {
    const uid = req.params.id;
    const static = await Course.findById({ _id: uid });
    const delCours = await Course.findByIdAndDelete({ _id: uid });

    if (delCours) {
      lib.delete(static.url);
      return res.status(200).json({ message: "Delete successful" });
    } else {
      return res.status(400).json({ error: "No Course Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const onLine = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length > 20) {
      const online = await Course.findById({ _id: id });

      if (online.online) {
        const onlineSchedule = [];
        for (let i = 1; i <= 4; i++) {
          const optionInfo = {
            routine: online[`option${i}`].routine,
            classTime: online[`option${i}`].classTime,
            remainingSeat: online[`option${i}`].remainingSeat,
            seat: online[`option${i}`].seat,
          };
          onlineSchedule.push(optionInfo);
        }

        res.status(200).json({ message: "Ami Online", data: onlineSchedule });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    } else {
      const online = await Course.findOne({ title: id });

      if (online.online) {
        const onlineSchedule = [];
        for (let i = 1; i <= 4; i++) {
          const optionInfo = {
            routine: online[`option${i}`].routine,
            classTime: online[`option${i}`].classTime,
            remainingSeat: online[`option${i}`].remainingSeat,
            seat: online[`option${i}`].seat,
          };
          onlineSchedule.push(optionInfo);
        }

        res.status(200).json({ message: "Ami Online", data: onlineSchedule });
      } else {
        res.status(404).json({ success: false, error: "No Course Found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const offLine = async (req, res) => {
  try {
    const { id } = req.params;
    if (id.length > 20) {
      const offline = await Course.findById({ _id: id });

      if (offline.offline) {
        const offlineSchedule = [];
        for (let i = 5; i <= 14; i++) {
          const optionInfo = {
            routine: offline[`option${i}`].routine,
            classTime: offline[`option${i}`].classTime,
            remainingSeat: offline[`option${i}`].remainingSeat,
            seat: offline[`option${i}`].seat,
          };
          offlineSchedule.push(optionInfo);
        }

        res
          .status(200)
          .json({ message: "Ami id Offline", data: offlineSchedule });
      } else {
        res
          .status(404)
          .json({ success: false, error: "No Mongo Course Found" });
      }
    } else {
      const offline = await Course.findOne({ title: id });

      if (offline.offline) {
        const offlineSchedule = [];
        for (let i = 5; i <= 14; i++) {
          const optionInfo = {
            routine: offline[`option${i}`].routine,
            classTime: offline[`option${i}`].classTime,
            remainingSeat: offline[`option${i}`].remainingSeat,
            seat: offline[`option${i}`].seat,
          };
          offlineSchedule.push(optionInfo);
        }

        res
          .status(200)
          .json({ message: "Ami bar Offline", data: offlineSchedule });
      } else {
        res
          .status(404)
          .json({ success: false, error: "No Navbar Course Found" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const dropDown = async (req, res) => {
  try {
    const twoMonthsAgo = new Date();
    twoMonthsAgo.setMonth(twoMonthsAgo.getMonth() - 2);

    const dropStudentList = await Student.find({
      $or: [
        { activeCourseEnd: { $lt: twoMonthsAgo } },
        { $expr: { $lt: [{ $size: "$myCourse" }, 1] } },
      ],
    });

    res.status(200).json({
      message: `Drop Student${dropStudentList.length > 1 ? "s" : ""}: ${
        dropStudentList.length
      } `,
      data: dropStudentList,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const mesDrop = async (req, res) => {
  try {
    const { id } = req.params;
    const { mess } = req.body;
    console.log(id, mess);
    const matchUser = await Student.findById(id, "-password");

    if (!matchUser) {
      return next(new NotFoundError("No result found"));
    }
    emailV(matchUser.email, ``, `Hello ${matchUser.name}`, `${mess} `);
    res.status(200).json({ message: "Message sent" });
  } catch (error) {
    res
      .status(500)
      .json({ success: false, error: "Server error", reason: error.message });
  }
};
module.exports = {
  newCourse,
  getCourse,
  delCourse,
  onLine,
  offLine,
  getCourseById,
  dropDown,
  mesDrop,
};
