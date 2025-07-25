const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();

const dbConnect = async () => {
  mongoose
    .connect(process.env.MONGODB_URI)
    .then(() => {
      console.log("✅ Connected to DB");
    })
    .catch((error) => console.log("❌ Error in connecting DB", error));
};

module.exports = dbConnect;
