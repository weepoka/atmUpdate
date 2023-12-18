const nodemailer = require("nodemailer");

async function emailV(email, htmlTemplate, sub,text) {
  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    auth: {
      user: process.env.EMAIL, // generated ethereal user
      pass: process.env.APP_PASSWORD, // generated ethereal password
    },
  });
  let info = await transporter.sendMail({
    from: "ATM's", // sender address
    to: email, // list of receivers
    subject: sub, // Subject line
    text: text, // plain text body
    html: htmlTemplate, // html body
  });
}

module.exports = emailV;