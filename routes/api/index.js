// IMPORTING ROUTER FUNCTIONALITY FROM EXPRESS
const router = require("express").Router();

// IMPORTING USER AND THOUGHT ROUTES
const userRoutes = require("./user-routes");
const thoughtRoutes = require("./thought-routes");

// MOUNTING USERS AND THOUGHTS ROUTES
router.use("/users", userRoutes);
router.use("/thoughts", thoughtRoutes);

module.exports = router;
