const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const { Schema } = mongoose;

const resultSchema = new Schema({
 
  data: {
    coureName: { type: String, required: true },
    schedule: { type: String },
    startDate: { type: Date, required: true },

    coureId: { type: Schema.Types.ObjectId, ref: "Course" },
    studentId: { type: Schema.Types.ObjectId, ref: "Student" },
    studentName: { type: String },
    studentReg: { type: String },
    studentEmail: { type: String },
    studentMobile: { type: String },
  },

  result: {
    point: { type: String },
    grade: { type: String }, 
    mark: { type: String },
    score: { type: String },
    totalMark: { type: String },
    negativeMark: { type: String },
    rightAnswer: { type: String },
    wrongAnswer: { type: String },
    percentage: { type: String },
    comment: { type: String },
    resultPdf: { type: String },
    resultImg: { type: String },
  },
});

module.exports = mongoose.model("Result", resultSchema);
 //  completed 09-10--23