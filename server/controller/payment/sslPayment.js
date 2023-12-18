const express = require("express");
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const app = express();
const SSLCommerzPayment = require("sslcommerz-lts");
const Course = require("../../model/courseModel");
const Student = require("../../model/studentModel");
const emailV = require("../../utils/mailing");
const endDate = require("../../utils/endDate");
const Invoice = require("../../model/paymentData");
const tran_id = new ObjectId().toString();
const back_url = process.env.SERVER_URL;
const front_url = process.env.CLIENT_URL;
const API = process.env.BASE_URL;
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");

const coursePurchase = async (req, res) => {
  const {
    id,
    cid,
    name,
    email,
    courseName,
    option,
    startDate,
    routine,
    classTime,
    courseFee,
  } = req.body;
  if (
    !id ||
    !cid ||
    !name ||
    !email ||
    !courseName ||
    !option ||
    !startDate ||
    !routine ||
    !classTime ||
    !courseFee
  ) {
    return res.status(400).json({ error: "Data Not Found" });
  }
  const course = await Course.findById({ _id: cid });

  const dataa = {
    total_amount: courseFee,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${back_url}${API}/student/ssl-payment-success/${tran_id}?courseName=${courseName}&option=${option}&startDate=${startDate}&classTime=${classTime}&routine=${routine}&amount=${courseFee}   `,
    fail_url: `${back_url}${API}/student/ssl-payment-fail/${tran_id}`,
    cancel_url: `${back_url}${API}/student/ssl-payment-cancel/${tran_id}`,
    shipping_method: "No",
    product_name: courseName,
    product_category: course?.courseDuration,
    product_profile: option,
    cus_name: name,
    cus_email: email,
    cus_add1: id,
    cus_add2: startDate,
    cus_city: "Dhaka",
    cus_state: "Dhaka",
    cus_postcode: "1000",
    cus_country: "Bangladesh",
    cus_phone: "01711111111",
    cus_fax: "01711111111",
    multi_card_name: "mastercard",
    value_a: "ref001_A",
    value_b: "ref002_B",
    value_c: "ref003_C",
    value_d: "ref004_D",
    ipn_url: `${back_url}${API}/student/ssl-payment-notification/${tran_id}`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );

  await sslcommerz.init(dataa).then(async (data) => {
    console.log(dataa);
    if (data?.GatewayPageURL) {
      const mx = await Student.findByIdAndUpdate(
        { _id: id },
        { $set: { orderPid: tran_id, orderCourse: course._id } },
        { new: true }
      );
      console.log("mx", mx);

      res.status(200).json({ url: data?.GatewayPageURL });
    } else {
      res.status(400).json({
        message: "Session was not successful",
      });
    }
  });
};

const sslSuccess = async (req, res) => {
  console.log("hello");
  const { tran_id } = req.params;
  const { option } = req.query;
  const { startDate } = req.query;
  const { routine } = req.query;
  const { classTime } = req.query;
  const { amount } = req.query;

  try {
    ///########user Check start ######
    const mx = await Student.findOne({ orderPid: tran_id });

    if (!mx) {
      return res
        .status(400)
        .json({ error: "payment Failed", reason: "User not found" });
    }
    ///########user Check end ######
    ///########course Check start ######
    const kos = await Course.findById({ _id: mx.orderCourse });

    if (!kos) {
      return res.status(400).json({ error: "Course not found" });
    }
    ///########course Check end ######
    ///######## if Previously buy Check start ######
    const lo = mx.myCourse.includes(kos._id);
    if (lo) {
      await Student.findByIdAndUpdate(
        { _id: mx._id },
        { $set: { orderPid: "", orderCourse: "" } },
        { new: true }
      );
      return res.redirect(`${front_url}/payment-fail/${tran_id}`);
    }
    ///######## if Previously buy Check end ######

    //###### payment success start #########
    const shes = endDate(kos.startDate, kos.courseDuration);
    await Student.findByIdAndUpdate(
      { _id: mx._id },
      {
        $set: {
          orderPid: "",
          orderCourse: "",
          activeCourse: {
            courseId: mx.orderCourse,
            name: kos.title,
            schedule: routine,
            classTime: classTime,
            startDate: startDate,
            endDate: shes,
          },
          activeCourseEnd: shes,
        },
        $push: { myCourse: kos._id },
      },
      { new: true }
    );
    await Course.findByIdAndUpdate(
      { _id: kos._id },
      {
        $push: {
          [`option${option}.option${option}buyerList`]: mx._id,

          totalBuyerList: mx._id,
        },
        $inc: {
          [`option${option}.remainingSeat`]: -1,
        },
      },
      { new: true }
    );

    // ****************** sms ****
    let htmlTemplate = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>ATM Sir</title>
    </head>
    <body>
        <div style="width: 100%; max-width: 300px; margin: 0 auto; background-color: #3490dc; color: #fff; padding: 20px; text-align: center; border-radius: 4px;">
            <div style="text-align: center; ">
                <img style="height: 40px; width: 40px; border-radius: 50%;" src="https://media.licdn.com/dms/image/C5603AQFJnnaEj16ERw/profile-displayphoto-shrink_800_800/0/1610466408587?e=1701302400&v=beta&t=5ZMvh-CcYdRHRkwTjKjfjK92JdbchLEZqO-ONW7ISC8"/>
                <h4 style="font-size: 24px; font-weight: bold; display: inline-block; margin-top: 10px;">ATM's</h4>
            </div>
            <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">Payment Success</p>
            <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${
              kos.title
            }</p>
            <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${routine}</p>
            <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${classTime}</p>
            <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${
              startDate.split("T")[0]
            }</p>
            <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">PaymentId: ${tran_id}</p>
            <p style="color: #e53e3e; font-size: 18px; front-family:bold; margin-top: 10px;">Amount: ${amount}</p>
        </div>
    </body>
    </html>
    `;
    emailV(mx.email, htmlTemplate, "Payment Success", "Details");
    //create invoice
    const invoice = new Invoice({
      pid: tran_id,
      name: mx.name,
      course: kos.title,
      regi: mx.regiNumber,
      email: mx.email,
      mobile: mx.mobile,
      schedule: `${classTime}:${routine}`,
      amount: amount,
      reason: "Admission",
    });
    await invoice.save();

    return res.redirect(`${front_url}/payment-success/${tran_id}`);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server Error", reason: error.message });
  }
};
const sslNotifiaction = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: "Payment notification",
  });
};

const sslfail = async (req, res) => {
  const tran_id = req.params.tran_id;

  await Student.findOneAndUpdate(
    { orderPid: tran_id },
    { $set: { orderPid: "", orderCourse: "" } },
    { new: true }
  );

  return res.redirect(`${front_url}/payment-fail/${tran_id}`);
};

const sslCancel = async (req, res) => {
  const tran_id = req.params.tran_id;

  await Student.findOneAndUpdate(
    { orderPid: tran_id },
    { $set: { orderPid: "", orderCourse: "" } },
    { new: true }
  );

  return res.redirect(`${front_url}/payment-cancel/${tran_id}`);
};

const inVoice = tryCatch(async (req, res, next) => {
  const { tran_id } = req.params;
  if (!tran_id) {
    return next(new BadRequestError("No data Found"));
  }

  const inV = await Invoice.findOne({ pid: tran_id });

  if (!inV) {
    return next(new NotFoundError("No Payment Found"));
  }

  return res.status(200).json({ message: "Your Payment ", code: inV });
});

const getAllPayment = tryCatch(async (req, res, next) => {
  const { email } = req.params;
  const payment = await Invoice.find({ email: email });
  console.log(payment);
  if (payment.length < 1) {
    return next(new NotFoundError("No Payment"));
  }
  return res.status(200).json({ message: "Your Payment ", data: payment });
});
module.exports = {
  coursePurchase,
  sslSuccess,
  sslfail,
  sslNotifiaction,
  sslCancel,
  inVoice,
  getAllPayment,
};
