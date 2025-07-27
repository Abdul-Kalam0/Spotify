const mongoose = require("mongoose");

const SongSchema = new mongoose.Schema({
  id: { type: Number, required: true, unique: true },
  title: { type: String, required: true },
  artist: { type: String, required: true },
});

module.exports = mongoose.model("Song", SongSchema);
