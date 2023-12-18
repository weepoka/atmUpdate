const mongoose = require("mongoose");
const { Schema } = mongoose;

const broadSchema = new Schema({
  url: { type: String },
  country: { type: String, required: true },
  countryDetail: { type: String, required: true },
  university: [{ type: Schema.Types.ObjectId, ref: "University" }],
});

module.exports = mongoose.model("Forigen", broadSchema);

// {
//   logo: { type: String }, // big
//   uniName: { type: String },
//   ielts: { type: String },

//   programTitle: { type: String },
//   degree: { type: String },
//   applyStart: { type: String },
//   duration: { type: String },
//   session: { type: String },
//   tution: { type: String },
//   isPartTime: {
//     type: String,
//     default: "Part-time",
//     enum: ["Part-time", "Full-time"],
//   },
//   rank: { type: String },
//   workPermit: { type: String },
//   creditOne: { type: String },
//   map: { type: String }, // google map link
//   deadLine: { type: String },
//   moreInfo: { type: String }, // uni link
// },
