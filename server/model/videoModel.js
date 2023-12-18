const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const videoSchema = new Schema({
  link: { type: String },
  catagory: { type: String },
  title: { type: String },
  sub: { type: String },
  description: { type: String },
});

module.exports = mongoose.model("Video", videoSchema);
