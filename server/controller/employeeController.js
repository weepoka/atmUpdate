const express = require("express");
const _ = express.Router();
const Employee = require("../model/employeeModel");
const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;
const path = require("path");
const fs = require("fs");
const lib = require("../utils/staticFile");
const Student = require("../model/studentModel");

const newEmployee = async (req, res) => {
  const {
    firstName,

    emailA,
    phoneA,
    phoneB,

    position,
  } = req.body;
  try {
    const url = req.file
      ? req.file.filename
      : "https://www.linkedin.com/in/atm-mahmud-95570333/overlay/photo/";

    const employee = new Employee({
      firstName,

      emailA,
      phoneA,
      phoneB,

      position,
      url: url,
    });
    const savedEmployee = await employee.save();
    if (savedEmployee) {
      res.status(200).json({ message: "Success" });
    } else {
      res.status(400).json({ error: "Fail" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getEmployee = async (req, res) => {
  try {
    const employee = await Employee.find().select("-pass");

    if (employee.length > 0) {
      res.status(200).send(employee);
    } else {
      res.status(400).json({ error: "No employee" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const updateEmp = async (req, res) => {
  try {
    const email = req.params.email;
    console.log(email);

    const user = await Employee.findOneAndUpdate(
      { emailA: email },
      { $set: { role: "Admin" } },
      { new: true }
    );
    console.log("user:", user);
    if (!user) {
      return res.status(400).json({ error: "No employee" });
    }

    const updateEm = await Student.findOneAndUpdate(
      { email: user.emailA },
      { $set: { role: "Admin" } },
      { new: true }
    );
    if (!updateEm) {
      return res.status(400).json({ error: "No Student" });
    }
    res.status(200).json({ message: "Updated", data: updateEm });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const hotLine = async (req, res) => {
  try {
    const cachedData = cache.get("employeeData");

    if (cachedData) {
      res.status(200).send(cachedData);
    } else {
      const employee = await Employee.find({ position: "Executive" }).select(
        "-pass"
      );

      if (employee.length > 0) {
        cache.put("employeeData", employee, cacheDuration);

        res.status(200).send(employee);
      } else {
        res.status(400).json({ error: "No employee" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const delEmployee = async (req, res) => {
  const emId = req.params.id;
  console.log(emId);

  try {
    const employee = await Employee.findByIdAndDelete({ _id: emId });
    lib.delete(employee?.url);
    if (!employee) {
      return res.status(404).json({ error: "No not found" });
    }

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const empManagement = async (req, res) => {
  try {
    const uid = req.params.id;
    const { regineDate, salary, active, info, absentDays } = req.body;
    const pdf = req.file && [{ pdf: req.file.filename }];

    const user = await Employee.findByIdAndUpdate(
      { _id: uid },
      {
        $set: {
          regineDate: regineDate,
          salary: salary,
          active: active,
        },
        $push: {
          info: [
            {
              title: info.title,
              details: info.details,
            },
          ],
          absentDays: [
            {
              time: absentDays.time,
              reason: absentDays.reason,
              type: absentDays.type,
            },
          ],
          pdf: pdf,
        },
      },
      { new: true }
    );

    res.status(200).send(user);
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const emLogin = async (req, res) => {
  try {
    const { emailA, password } = req.body;

    const empLog = await Employee.findOne({
      emailA: emailA,
      password: password,
    });

    if (empLog) {
      const { password, ...withOutpass } = empLog.toObject();
      res.status(200).json({ message: "Login Success", data: withOutpass });
    } else {
      res.status(404).json({ error: "Employee Not Found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server Error", reason: error.message });
  }
};

module.exports = {
  newEmployee,
  getEmployee,
  updateEmp,
  hotLine,
  delEmployee,
  empManagement,
  emLogin,
};
