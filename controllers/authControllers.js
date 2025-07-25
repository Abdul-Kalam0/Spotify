const UserModel = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
dotenv.config();

const registration = async (req, res) => {
  const { email, password, name } = req.body;
  try {
    const userExist = await UserModel.findOne({ email: email });
    if (userExist) {
      return res
        .status(409)
        .json({ message: "User already exist. Please login!" });
    }

    const passHash = await bcrypt.hash(password, 10);
    const newUser = await UserModel.create({
      name: name,
      email: email,
      password: passHash,
    });

    res
      .status(201)
      .json({ message: "User Created Successfully!", user: newUser.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.findOne({ email: email });
    if (!user) return res.status(404).json({ message: "Invalid Credentials" });

    const passwordMatch = await bcrypt.compare(password, user.passHash);
    if (!passwordMatch)
      return res.status(400).json({ message: "Invalid Credentials" });

    const token = await jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "id" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000,
    });

    res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

const logout = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      expires: new Date(0),
    });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ messgae: "Internal server error", error: error.message });
  }
};

module.exports = { registration, login, logout };
