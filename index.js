const express = require("express");
const cors = require("cors");
const app = express();
const authRoutes = require("./routes/authRoutes");
const songRoutes = require("./routes/songRoutes");
const cookieParser = require("cookie-parser");

app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());

app.use("/auth/user", authRoutes);
app.use("/song", songRoutes);

module.exports = app;
