const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const contactSchema = new Schema({
  location: { type: String },
  address: { type: String },
  mobileOne: { type: String },
  mobileTwo: { type: String },
  phoneOne: { type: String },
  phoneTwo: { type: String },
  emailOne: { type: String },
  emailTwo: { type: String },
});

module.exports = mongoose.model("Contact", contactSchema);
