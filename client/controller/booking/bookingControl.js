const express = require("express");
const _ = express.Router();
const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const SSLCommerzPayment = require("sslcommerz-lts");
const tran_id = new ObjectId().toString();
const back_url = process.env.SERVER_URL;
const front_url = process.env.CLIENT_URL;
const API = process.env.BASE_URL;
const emailV = require("../../utils/mailing");
const Invoice = require("../../model/paymentData");
const Booked = require("../../model/bookIng");
const Student = require("../../model/studentModel");
const { tryCatch } = require("../../utils/tryCatch");
const {
  NotFoundError,
  BadRequestError,
  InvalidEntry,
} = require("../../customError");

const myBooked = tryCatch(async (req, res, next) => {
  const { stdId, reg, amount, name, email, course, mobile } = req.body;
  console.log(stdId, reg, amount, name, email, course, mobile);

  const mx0 = await Student.findById({ _id: stdId });
  if (!mx0) {
    return next(new NotFoundError("User Not Found"));
  }

  if (!stdId || !reg || !amount || (!name && !email) || !course || !mobile) {
    return next(new InvalidEntry("Data Failed"));
  }
  const dataa = {
    total_amount: amount,
    currency: "BDT",
    tran_id: tran_id,
    success_url: `${back_url}${API}/booking/ssl-payment-success/${tran_id}?courseName=${course}&option=${""}&startDate=${""}&classTime=${""}&routine=${""}&amount=${amount}   `,
    fail_url: `${back_url}${API}/booking/ssl-payment-fail/${tran_id}`,
    cancel_url: `${back_url}${API}/booking/ssl-payment-cancel/${tran_id}`,
    shipping_method: "No",
    product_name: course,
    product_category: "MH",
    product_profile: "KM",
    cus_name: name,
    cus_email: email,
    cus_add1: stdId,
    cus_add2: "LO",
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
    ipn_url: `${back_url}${API}/booking/ssl-payment-notification/${tran_id}`,
  };

  const sslcommerz = new SSLCommerzPayment(
    process.env.STORE_ID,
    process.env.STORE_PASSWORD,
    false
  );

  await sslcommerz.init(dataa).then(async (data) => {
    console.log(dataa);
    if (data?.GatewayPageURL) {
      const mx = await Student.findOneAndUpdate(
        { _id: stdId },
        { $set: { orderPid: tran_id, orderCourse: course } },
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
});

const sslSucces = async (req, res) => {
  console.log("hello");
  const { tran_id } = req.params;
  const { option } = req.query;
  const { startDate } = req.query;
  const { routine } = req.query;
  const { classTime } = req.query;
  const { amount } = req.query;
  const { courseName } = req.query;

  try {
    ///########user Check start ######
    const mx = await Student.findOne({ orderPid: tran_id });

    if (!mx) {
      return res
        .status(400)
        .json({ error: "payment Failed", reason: "User not found" });
    }
    ///########user Check end ######

    ///########Book start ######

    const booked = new Booked({
      stdId: mx._id,
      reg: mx.regiNumber,
      amount,
      name: mx.name,
      email: mx.email,
      course: courseName,
      mobile: mx.mobile,
    });

    const saveBook = await booked.save();
    ///########Book end######

    //###### payment success start #########

    await Student.findByIdAndUpdate(
      { _id: mx._id },
      {
        $push: { myBooking: saveBook._id },
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
              <p style="color: #e53e3e; font-size: 24px; margin-top: 10px;">Booking Success</p>
              <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${courseName}</p>
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
    emailV(mx.email, htmlTemplate, "Booing Success", "Details");
    //create invoice
    const invoice = new Invoice({
      pid: tran_id,
      name: mx.name,
      course: courseName,
      regi: mx.regiNumber,
      email: mx.email,
      mobile: mx.mobile,
      reason: "Booking",
      amount: amount,
    });
    const saveInvoice = await invoice.save();
    await Booked.findByIdAndUpdate(
      { _id: saveBook._id },
      {
        $push: { invoiceId: saveInvoice._id },
      },
      { new: true }
    );
    return res.redirect(`${front_url}/payment-success/${tran_id}`);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "Server Error", reason: error.message });
  }
};
const sslfai = async (req, res) => {
  const tran_id = req.params.tran_id;

  await Student.findOneAndUpdate(
    { orderPid: tran_id },
    { $set: { orderPid: "", orderCourse: "" } },
    { new: true }
  );

  return res.redirect(`${front_url}/payment-fail/${tran_id}`);
};

const sslCance = async (req, res) => {
  const tran_id = req.params.tran_id;

  await Student.findOneAndUpdate(
    { orderPid: tran_id },
    { $set: { orderPid: "", orderCourse: "" } },
    { new: true }
  );

  return res.redirect(`${front_url}/payment-cancel/${tran_id}`);
};
const sslNotifiactio = async (req, res) => {
  return res.status(200).json({
    data: req.body,
    message: "Booking notification",
  });
};
module.exports = {
  myBooked,
  sslSucces,
  sslfai,
  sslCance,
  sslNotifiactio,
};
