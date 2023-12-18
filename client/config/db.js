const mongoose = require("mongoose");

function dbConnect() {
  const mongooseOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    writeConcern: {
      w: "majority",
      j: true,
    },
  };
  mongoose
    .connect(process.env.DB_URL, mongooseOptions)
    .then(() => console.log("Mongo Connected!"))
    .catch((err) => {
      console.log("MongoErro:", err.code);
    });
}

module.exports = dbConnect;
