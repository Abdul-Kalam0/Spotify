const express = require("express");
const SongModel = require("../models/Song");

const createSong = async (req, res) => {
  const { id, title, artist } = req.body;

  try {
    if (!id || !title || !artist)
      return res.status(404).json({ message: "Please input data" });
    const song = await SongModel.findOne({ title: title });
    if (title)
      return res.status(409).json({ message: "Titled song already exist." });

    const newSong = new SongModel({ id, title, artist });
    await newSong.save();
    res.status(201).json({ message: "Song created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
};

module.exports = { createSong };
