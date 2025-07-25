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

    const token = await jwt.sign(
      { id: newUser.email },
      process.env.JWT_SECRET,
      { expiresIn: "4h" }
    );
    res.cookie("token", token);

    res
      .status(201)
      .json({ message: "User Created Successfully!", user: newUser.name });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error ", error: error.message });
  }
};

module.exports = { registration };
