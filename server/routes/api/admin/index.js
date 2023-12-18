const express = require("express");
const _ = express.Router();
const app = express();
const path = require("path");
const Banner = require("../../../model/atmBanner");
const upload = require("../../../utils/multa");
const adminA = require("../../../middle/adminCk");

const {
    studyAb,
    getAbroad,
    editAb,
    delAb,
  } = require("../../../controller/Study Abroad/abroadController");
  _.post(
    "/study-abroad",
    upload.single("urlOne"),
    upload.single("urlTwo"),
    studyAb
  );
  _.get("/study-abroad", getAbroad);
  _.patch("/study-abroad/:id", editAb);
  _.delete("/study-abroad/:id", delAb);

module.exports = _;
