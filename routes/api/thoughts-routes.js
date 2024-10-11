// IMPORTING ROUTER FUNCTIONALITY FROM EXPRESS
const router = require("express").Router();

// IMPORTING THOUGHT CONTROLLER FUNCTIONS
const {
  getAllThoughts,
  getSingleThought,
  addThought,
  updateThought,
  deleteThought,
  addReaction,
  deleteReaction,
} = require("../../controllers/thought-controller");

// DEFINING ROUTES

// ENDPOINT: /api/thoughts
// RETRIEVE ALL THOUGHTS AND ADD A NEW THOUGHT
router.route("/").get(getAllThoughts).post(addThought);

// ENDPOINT: /api/thoughts/:thoughtId
// RETRIEVE, UPDATE, AND DELETE A SINGLE THOUGHT
router
  .route("/:thoughtId")
  .get(getSingleThought)
  .put(updateThought)
  .delete(deleteThought);

// ENDPOINT: /api/thoughts/:thoughtId/reactions
// ADD A REACTION FOR THE THOUGHT TO IDENTIFY BY THOUGHT ID AND DELETE A REACTION IDENTIFIED BY REACTION ID
router.route("/:thoughtId/reactions").post(addReaction).delete(deleteReaction);

// EXPORTING THE ROUTER
module.exports = router;
