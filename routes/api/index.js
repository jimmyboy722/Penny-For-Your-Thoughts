// IMPORTING ROUTER FUNCTIONALITY FROM EXPRESS
const router = require("express").Router();

// IMPORTING USER AND THOUGHT ROUTES
const userRoutes = require("../api/users-routes");
const thoughtRoutes = require("../api/thoughts-routes");

// MOUNTING USERS AND THOUGHTS ROUTES
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
