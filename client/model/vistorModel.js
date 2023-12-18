const express = require("express");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const visitorSchema = {
  total: { type: Number, default: 0 },
};

module.exports = mongoose.model("Visitor", visitorSchema);
