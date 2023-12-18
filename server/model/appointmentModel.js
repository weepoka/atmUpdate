const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const appointmentSchema = new Schema({
  uid: { type: Schema.Types.ObjectId, ref: "Student" },
  firstName: { type: String },
  lastName: { type: String },
  address: { type: String },
  email: { type: String, requried: true },
  mobile: { type: String },
  reasonForVisit: { type: String },
  isFirstVisit: { type: String, default: "NO" },
  approve: { type: Boolean, default: false },
  visited: { type: String, default: "No" },
  visitingDate: { type: Date },
  confirmDate: { type: Date },
  confirmTime: { type: String },
  visitingTime: { type: String },
  time: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Appointment", appointmentSchema);
