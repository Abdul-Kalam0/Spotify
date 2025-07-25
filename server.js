const express = require("express");
const app = require("./index");
const dbConnect = require("./config/db");
const dotenv = require("dotenv");
dotenv.config();

dbConnect();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server connected to Port ${PORT}`);
});
