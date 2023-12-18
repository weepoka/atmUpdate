const express = require("express");
const router = express.Router();
const multer = require("multer");
const Atm = require("../model/atmsModel");
const cache = require("memory-cache");
const libb = require("../utils/staticFile");
const cacheDuration = 5 * 60 * 1000;

const atmCreate = async (req, res) => {
  const { title, description, mission, vision, detail, specalities } = req.body;
  const id = "654b795e2db33e9bc8763512";

  try {
    const delUrl = await Atm.findById({ _id: id });
    const imgUrl = delUrl.url;
    console.log(imgUrl);
    const lib = {};

    title && (lib.title = title);
    description && (lib.description = description);
    mission && (lib.mission = mission);
    vision && (lib.vision = vision);
    detail && (lib.detail = detail);

    const updatedSpecalities = specalities.map((item) => item.skill);
    specalities && (lib.specalities = updatedSpecalities);

    const url = req.file && req.file.filename;
    url && (lib.url = url);

    const atmUpdate = await Atm.findByIdAndUpdate(
      { _id: id },
      { $set: lib },
      { new: true }
    );
    console.log(imgUrl);
    libb.delete(imgUrl);
    res.status(200).json({ message: "Updated successful", atm: atmUpdate });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getAtm = async (req, res) => {
  try {
    const cachedData = cache.get("getAtm");

    if (cachedData) {
      res.status(200).send(cachedData);
    } else {
      const atmSir = await Atm.find();

      if (atmSir.length > 0) {
        cache.put("getAtm", atmSir, cacheDuration);

        res.status(200).send(atmSir);
      } else {
        res.status(400).json({ error: "No Atm Sir" });
      }
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", message: error.message });
  }
};

const delAtm = async (req, res) => {
  const atmId = req.params.id;
  console.log(atmId);

  try {
    const banner = await Atm.findByIdAndDelete({ _id: atmId });

    if (!banner) {
      return res.status(404).json({ error: "No not found" });
    }

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
module.exports = { atmCreate, getAtm, delAtm };
