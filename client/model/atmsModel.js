const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const atmSchema = new Schema({
  url: { type: String },
  title: { type: String },
  description: { type: String },
  mission: { type: String },
  vision: { type: String },
  detail: { type: String },
  specalities: { type: Array },
});

module.exports = mongoose.model("Atm", atmSchema);
