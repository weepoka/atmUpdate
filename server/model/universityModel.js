const mongoose = require("mongoose");
const { Schema } = mongoose;

const uniSchema = {
  logo: { type: String },

  uniName: { type: String },
  ielts: { type: String },

  programTitle: { type: String },
  degree: { type: String },
  applyStart: { type: String },
  duration: { type: String },
  session: { type: String },
  tution: { type: String },
  isPartTime: {
    type: String,
    default: "Part-time",
    enum: ["Part-time", "Full-time"],
  },
  rank: { type: String },
  url: { type: String },
  country: { type: String },
  workPermit: { type: String },
  creditOne: { type: String },
  map: { type: String }, // google map link
  deadLine: { type: String },
  moreInfo: { type: String }, // uni link
  forigen: { type: Schema.Types.ObjectId, ref: "Forigen" },
};

module.exports = mongoose.model("University", uniSchema);
