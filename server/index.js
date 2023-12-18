const express = require("express");
const dotenv = require("dotenv");
const dbConnect = require("./config/db.js");
const path = require("path");
const nodemon = require("nodemon");
dotenv.config();
const route = require("./routes/index.js");
const errorHandler = require("./middle/errorHandler.js");
const cors = require("cors");
const app = express();
app.engine("ejs", require("ejs").__express); //for static file
app.set("view engine", "ejs"); // for static file
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use("/uploads", express.static("uploads"));
app.use(express.json());
const port = process.env.PORT || process.env.PORTB || 6000;

app.listen(port, (err) => {
  if (err) {
    console.log("Problem:", err);
    return;
  }
  console.log(`Port runnung ${port}`);
});
dbConnect();

app.use(route);
app.use(errorHandler);
