const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const blogSchema = new Schema({
  url: { type: String },
  category: { type: String, required: true },
  title: { type: String },
  link: { type: String },
  description: { type: String },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Blog", blogSchema);
