const express = require("express");
const router = express.Router();
const ContactForm = require("../model/contactFormModel");
const validateEmail = require("../utils/validEmail");
const emailV = require("../utils/mailing");
const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;
const path = require("path");
const fs = require("fs");

const querySend = async (req, res) => {
  const { senderName, senderEmail, message, reason, phone } = req.body;

  try {
    if (message === "") {
      return res.status(400).json({ error: "Empty Query" });
    }

    if (validateEmail(senderEmail)) {
      const query = new ContactForm({
        senderName,
        senderEmail,
        message,
        reason: "Query",
        phone,
      });

      const savedQuery = await query.save();

      return res.status(200).json({ message: "Query Sent", query: savedQuery });
    } else {
      return res.status(400).json({ error: "Invalid Email" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

// filter for reply true or false
const getQuery = async (req, res) => {
  try {
    const query = await ContactForm.find({ reason: "Query" });

    if (query.length > 0) {
      res.status(200).send(query);
    } else {
      res.status(400).json({ error: "No query" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
const delQuery = async (req, res) => {
  const qId = req.params.id;
  console.log(qId);

  try {
    const query = await ContactForm.findByIdAndDelete({ _id: qId });

    if (!query) {
      return res.status(404).json({ error: "Query found" });
    }

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const reply = async (req, res) => {
  const { id, replyMessage } = req.body;
  console.log(id, replyMessage);
  try {
    const answer = await ContactForm.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          replyMessage: replyMessage,
          reply: true,
          replayDate: Date.now(),
        },
      },
      { new: true }
    );
    if (answer) {
      let email = answer.senderEmail;
      let text = answer.replyMessage;
      let sub = "ATM's";
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
              <p style="color: #e53e3e; font-size: 18px; margin-top: 10px;">${text}</p>
          </div>
      </body>
      </html>
      
      
      `;
      emailV(email, htmlTemplate, sub, text);

      return res.status(200).send(answer);
    } else {
      return res.status(404).json({ error: "Error " });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

module.exports = { querySend, getQuery, delQuery, reply };
