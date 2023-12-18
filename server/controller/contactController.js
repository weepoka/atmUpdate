const express = require("express");
const router = express.Router();
const Contact = require("../model/contactModel");

const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;

const contactUpload = async (req, res) => {
  const {
    address,
    mobileOne,
    mobileTwo,

    emailOne,
  } = req.body;
  console.log(
    address,
    mobileOne,
    mobileTwo,

    emailOne
  );
  try {
    const contact = new Contact({
      address,
      mobileOne,
      mobileTwo,

      emailOne,
    });

    const newContact = await contact.save();

    res.status(200).json({ message: "Upload successful", data: newContact });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getContact = async (req, res) => {
  try {
    const video = await Contact.find();

    res.status(200).send(video);
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const delContat = async (req, res) => {
  const conId = req.params.id;
  console.log(conId);

  try {
    const contact = await Contact.findByIdAndDelete({ _id: conId });

    if (!contact) {
      return res.status(404).json({ error: "No contact found" });
    }

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
module.exports = { contactUpload, getContact, delContat };
