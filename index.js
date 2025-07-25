const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");

app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/auth/user", authRoutes);

module.exports = app;
