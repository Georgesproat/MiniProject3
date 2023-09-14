const express = require("express");
const router = express.Router();
const directorController = require("../controllers/directorController");

// Create a new director
router.post("/", directorController.createDirector);

// Retrieve all directors
router.get("/", directorController.getAllDirectors);

// Retrieve a single director by ID
router.get("/:id", directorController.getDirectorById);

// Update a director by ID
router.put("/:id", directorController.updateDirector);

// Delete a director by ID
router.delete("/:id", directorController.deleteDirector);

module.exports = router;
