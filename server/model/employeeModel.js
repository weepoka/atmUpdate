const mongoose = require("mongoose");
const { Schema } = mongoose;

const employeeSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
  },
  role: {
    type: String,
  },
  emailA: {
    type: String,
    required: true,
    unique: true,

    lowercase: true,
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  emailP: {
    type: String,

    lowercase: true,
    match: /^\S+@\S+\.\S+$/, // Basic email format validation
  },
  phoneA: {
    type: String,
  },
  phoneB: {
    type: String,
  },
  address: {
    street: String,
    city: String,
    state: String,
    zipCode: String,
  },
  position: {
    type: String,
    required: true,
  },
  hireDate: {
    type: Date,
    default: Date.now,
  },
  regineDate: {
    type: Date,
  },
  salary: {
    type: Number,
    default: 0,
  },
  url: {
    type: String,
  },
  pdf: [
    {
      pdf: String,
    },
  ],
  absentDays: [
    {
      time: {
        type: Date,
      },
      reason: { type: String },
      type: {
        type: String,
        enum: ["Sick Leave", "Vacation", "Personal Leave", "Other"],
        default: "Other",
      },
    },
  ],
  active: {
    type: Boolean,
    default: true,
  },
  info: [
    {
      title: { type: String },
      details: { type: String },
    },
  ],
  password: {
    type: String,
  },
});

const Employee = mongoose.model("Employee", employeeSchema);

module.exports = Employee;
