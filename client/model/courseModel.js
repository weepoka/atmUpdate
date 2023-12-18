const mongoose = require("mongoose");
const { Schema } = mongoose;

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  bookingAmount: { type: Number },
  courseDuration: {
    // 3 months
    type: String,
    required: true,
  },
  classesNumber: {
    type: Number,
    default: 30,
  },
  startDate: {
    type: Date,
    required: true,
  },
  runningClass: {
    // not complete
    a: {
      type: Date,
      default: function () {
        return new Date(this.startDate).setDate(
          new Date(this.startDate).getDate() + 2
        );
      },
    },
    b: {
      type: Date,
      default: function () {
        return new Date(this.startDate).setDate(
          new Date(this.startDate).getDate() + 4
        );
      },
    },
    c: {
      type: Date,
      default: function () {
        return new Date(this.startDate).setDate(
          new Date(this.startDate).getDate() + 6
        );
      },
    },
    d: {
      type: Date,
      default: function () {
        return new Date(this.startDate).setDate(
          new Date(this.startDate).getDate() + 8
        );
      },
    },
    e: {
      type: Date,
      default: function () {
        return new Date(this.startDate).setDate(
          new Date(this.startDate).getDate() + 10
        );
      },
    },
  },

  extarClass: {
    type: Number,
  },
  mockTest: {
    type: String,
  },
  admissionLastDate: {
    type: Date,
    required: true,
  },

  option1: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "7:00 PM " },

    option1buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option2: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "9:00 PM " },
    option2buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option3: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "7:00 PM " },
    option3buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option4: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "9:00 PM " },
    option4buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },

  option5: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "10:00 AM " },
    option5buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option6: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "11:30 AM " },
    option6buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option7: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "3:00 PM " },
    option7buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option8: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "5:00 PM " },
    option8buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option9: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sat - Mon -Wed" },
    classTime: { type: String, default: "7:00 PM " },
    option9buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },

  option10: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "10:00 AM " },
    option10buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option11: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "11:30 AM " },
    option11buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option12: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "5:00 PM " },
    option12buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option13: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "5:00 PM " },
    option13buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },
  option14: {
    seat: { type: Number, default: 30 },
    remainingSeat: {
      type: Number,
      default: 30,
    },
    routine: { type: String, default: " Sun - Tue -Thu" },
    classTime: { type: String, default: "7:00 PM " },
    option14buyerList: [
      {
        type: Schema.Types.ObjectId,
        ref: "Student",
      },
    ],
  },

  offlineFee: {
    courseFee: { type: Number },
    bookFee: { type: Number },
    totalFee: { type: Number },
  },

  onlineFee: {
    courseFee: { type: Number },
    bookFee: { type: Number },
    totalFee: { type: Number },
  },

  totalBuyerList: [
    {
      type: Schema.Types.ObjectId,
      ref: "Student",
    },
  ],
  online: {
    // option1 - option4
    type: Boolean,
    default: false,
  },
  offline: {
    // option5 - option14
    type: Boolean,
    default: false,
  },
  url: { type: String },
});

module.exports = mongoose.model("Course", courseSchema);
