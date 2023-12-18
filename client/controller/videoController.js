const express = require("express");
const router = express.Router();
const Video = require("../model/videoModel");

const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;

const videoUpload = async (req, res) => {
  const { link, catagory, title, sub, description } = req.body;

  try {
    const regex =
      /(?:\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([a-zA-Z0-9_-]+)/;
    const match = link.match(regex)[1];
    const matchx = link.split("=")[1];
    if (link) {
      const video = new Video({
        link: match ? match : matchx,
        catagory,
        title,
        sub,
        description,
      });

      const newVideo = await video.save();

      res.status(200).json({ message: "Upload successful", video: newVideo });
    } else {
      res.status(400).json({ error: "File upload failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getVideo = async (req, res) => {
  try {
    const video = await Video.find();

    if (video.length > 0) {
      res.status(200).send(video);
    } else {
      res.status(400).json({ error: "No video" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const delVideo = async (req, res) => {
  const vId = req.params.id;
  console.log(vId);

  try {
    const video = await Video.findByIdAndDelete({ _id: vId });

    if (!video) {
      return res.status(404).json({ error: "No Video found" });
    }

    res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

module.exports = { videoUpload, getVideo, delVideo };
