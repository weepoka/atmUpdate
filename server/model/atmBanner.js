const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const bannerSchema = new Schema({
  position: { type: String, require: true },
  url: { type: String, require: true },
  tile: { type: String },
  sub: { type: String },
  detail: { type: String },
  offer: { type: String },
  time: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Banner", bannerSchema);
