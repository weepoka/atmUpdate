const express = require("express");
const router = express.Router();

const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;
const path = require("path");
const Banner = require("../model/atmBanner");
const lib = require("../utils/staticFile");

const bannerUpload = async (req, res) => {
  const { position, tile, sub, detail, offer, url } = req.body;
  console.log(req.file);
  try {
    if (req.file) {
      const banner = new Banner({
        url: req.file.filename,
        position,
        tile,
        sub,
        detail,
        offer,
      });

      const savedBanner = await banner.save();

      res
        .status(200)
        .json({ message: "Upload successful", banner: savedBanner });
    } else {
      res.status(400).json({ error: "File upload failed" });
    }
    return;
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getBanner = async (req, res) => {
  try {
    const cachedData = cache.get("bannerData");

    if (cachedData) {
      res.status(200).send(cachedData);
    } else {
    }
    const banner = await Banner.find();

    if (banner.length > 0) {
      // cache.put("bannerData", banner, cacheDuration);

      res.status(200).send(banner);
    } else {
      res.status(400).json({ error: "No banner" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const delBanner = async (req, res) => {
  const banId = req.params.id;
  console.log(banId);

  try {
    const banner = await Banner.findByIdAndDelete({ _id: banId });
    console.log(banner);

    if (!banner) {
      return res.status(404).json({ error: "No not found" });
    }
    lib.delete(banner.url);
    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};
module.exports = { bannerUpload, getBanner, delBanner };
