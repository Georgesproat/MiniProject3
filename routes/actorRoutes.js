const express = require("express");
const router = express.Router();
const actorController = require("../controllers/actorController");

// Create a new actor
router.post("/", actorController.createActor);

// Retrieve all actors
router.get("/", actorController.getAllActors);

// Retrieve a single actor by ID
router.get("/:id", actorController.getActorById);

// Update an actor by ID
router.put("/:id", actorController.updateActor);

// Delete an actor by ID
router.delete("/:id", actorController.deleteActor);

module.exports = router;
