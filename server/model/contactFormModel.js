const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const formSchema = new Schema({
  senderName: { type: String },
  senderEmail: { type: String },
  message: { type: String },
  reply: { type: Boolean, default: false },
  replyMessage: { type: String },
  url: { type: String },
  pdf: { type: String },
  reason: { type: String },
  phone: { type: String },
  sendDate: { type: Date, default: Date.now() },
  replayDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("ContactForm", formSchema);
