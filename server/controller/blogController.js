const express = require("express");
const router = express.Router();

const cache = require("memory-cache");
const cacheDuration = 5 * 60 * 1000;
const path = require("path");
const Blog = require("../model/blogModel");
const lib = require("../utils/staticFile");

const blogPost = async (req, res) => {
  const { category, title, description, link } = req.body;
  console.log(category, title, description, link);
  const url = req.file
    ? req.file.filename
    : "https://www.linkedin.com/in/atm-mahmud-95570333/overlay/photo/";
  console.log(url);
  try {
    const regex =
      /(?:\?v=|\/embed\/|\/watch\?v=|\/v\/|\/e\/|youtu.be\/)([a-zA-Z0-9_-]+)/;
    const match = link && link.match(regex)[1];
    const matchx = link && link.split("=")[1];
    if (url) {
      const blog = new Blog({
        url: url,
        category,
        title,
        description,
        link: match ? match : matchx ? matchx : "",
      });

      const savedBlog = await blog.save();

      res.status(200).json({ message: "Post successful", blog: savedBlog });
    } else {
      res.status(400).json({ error: "File upload failed" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const getBlog = async (req, res) => {
  try {
    const blog = await Blog.find();

    if (blog.length > 0) {
      cache.put("blogData", blog, cacheDuration);

      res.status(200).send(blog);
    } else {
      res.status(400).json({ error: "No blog" });
    }
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

const delBlog = async (req, res) => {
  const balId = req.params.id;
  console.log(balId);

  try {
    const del = await Blog.findById({ _id: balId });
    const blogUrl = del.url;
    const blog = await Blog.findByIdAndDelete({ _id: balId });

    if (!blog) {
      return res.status(404).json({ error: "No Blog found" });
    }
    lib.delete(blogUrl);
    return res.status(200).json({ message: " deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: "Server error", reason: error.message });
  }
};

module.exports = { blogPost, getBlog, delBlog };
