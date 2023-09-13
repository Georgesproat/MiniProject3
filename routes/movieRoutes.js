const express = require("express");
const router = express.Router();
const movieController = require("../controllers/movieController"); 
// Create a new movie
router.post("/movies", movieController.createMovie);

// Retrieve all movies
router.get("/movies", movieController.getAllMovies);

// Retrieve a single movie by ID
router.get("/movies/:id", movieController.getMovieById);

// Update a movie by ID
router.put("/movies/:id", movieController.updateMovie);

// Delete a movie by ID
router.delete("/movies/:id", movieController.deleteMovie);

module.exports = router;
