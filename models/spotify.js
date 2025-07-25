const mongoose = require("mongoose");

const SpotifySchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
});

module.exports = mongoose.model("Spotify", SpotifySchema);
