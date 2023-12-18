const express = require("express");
const router = express.Router();
const Employee = require("../model/employeeModel");
const Student = require("../model/studentModel");

const adminA = async (req, res, next) => {
  const { email } = req.body;

  if (email === "mmhasan045@gmail.com") {
    next();
  } else {
    res.status(404).json({ error: "Admin not found" });
  }
};

module.exports = adminA;
