const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const visaSchema = new Schema({
  userName: { type: String },
  mobile: { type: String },
  email: { type: String },
  age: { type: String },
  location: { type: String },
  ssc: { type: String },
  hsc: { type: String },
  bsc: { type: String },
  master: { type: String },
  ieltRead: { type: String },
  ieltWrite: { type: String },
  ieltSpeak: { type: String },
  ieltListen: { type: String },
  ieltOver: { type: String },
  contact: { type: String,default:"NO",enum:["NO","YES"] },
  agreeWithUs: { type: String,default:"",enum:["NO","YES",""] },
  whoServiceHim: { type: String },
  time: { type: String, default: new Date().toISOString().split("T")[0] },
});

module.exports = mongoose.model("Visa", visaSchema);
// userName
// email
// mobile
// age
// location

// ssc
// hsc
// bsc
// master
// ieltRead
// ieltWrite
// ieltSpeak
// ieltListen
// ieltOver

