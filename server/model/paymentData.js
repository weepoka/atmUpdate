const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const storeSchema = new Schema({
  pid: { type: String },
  name: { type: String },
  course: { type: String },
  regi: { type: String },
  email: { type: String },
  reason: { type: String },
  mobile: { type: String },
  schedule: { type: String },
  amount: { type: String },
  paymentDate: { type: Date, default: Date.now() },
});

module.exports = mongoose.model("Invoice", storeSchema);

// completed
