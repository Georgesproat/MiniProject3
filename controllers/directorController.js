const Director = require("../models/director");

// Create a new director
const createDirector = async (req, res) => {
  try {
    const director = new Director(req.body);
    await director.save();
    res.status(201).json(director);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all directors
const getAllDirectors = async (req, res) => {
  try {
    const directors = await Director.find();
    res.json(directors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single director by ID
const getDirectorById = async (req, res) => {
  try {
    const director = await Director.findById(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    res.json(director);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a director by ID
const updateDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    res.json(director);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a director by ID
const deleteDirector = async (req, res) => {
  try {
    const director = await Director.findByIdAndDelete(req.params.id);
    if (!director) {
      return res.status(404).json({ error: "Director not found" });
    }
    res.json({ message: "Director deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createDirector,
  getAllDirectors,
  getDirectorById,
  updateDirector,
  deleteDirector
};
