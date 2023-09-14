const Actor = require("../models/actor");

// Create a new movie
const createActor = async (req, res) => {
  try {
    const actor = new Actor(req.body);
    await actor.save();
    res.status(201).json(actor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Retrieve all movies
const getAllActors = async (req, res) => {
  try {
    const actor = await Actor.find();
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Retrieve a single movie by ID
const getActorById = async (req, res) => {
  try {
    const actor = await Actor.findById(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update a movie by ID
const updateActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json(actor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Delete a movie by ID
const deleteActor = async (req, res) => {
  try {
    const actor = await Actor.findByIdAndDelete(req.params.id);
    if (!actor) {
      return res.status(404).json({ error: "Actor not found" });
    }
    res.json({ message: "Actor deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  createActor,
  getAllActors,
  getActorById,
  updateActor,
  deleteActor
};
