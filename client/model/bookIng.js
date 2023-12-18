const mongoose = require("mongoose");
const { Schema } = mongoose;

const newSchema = {
  stdId: {
    type: Schema.Types.ObjectId,
    ref: "Student",
  },
  reg: { type: String },
  amount: { type: String },
  name: {
    type: String,
  },
  mobile: {
    type: String,
  },
  email: {
    type: String,
  },
  course: {
    type: String,
  },
  desireDate: {
    type: String,
  },
  paymentDate: { type: Date, default: Date.now() },
  invoiceId: { type: Schema.Types.ObjectId, ref: "Invoice" },
};

module.exports = mongoose.model("Booked", newSchema);
