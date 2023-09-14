const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController"); 
// Create a new movie
router.post("/", movieController.createMovie);

// Retrieve all movies
router.get("/", movieController.getAllMovies);

// Retrieve a single movie by ID
router.get("/;id", movieController.getMovieById);

// Update a movie by ID
router.put("/:id", movieController.updateMovie);

// Delete a movie by ID
router.delete("/:id", movieController.deleteMovie);

module.exports = router;
