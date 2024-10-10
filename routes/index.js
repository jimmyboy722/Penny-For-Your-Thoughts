// IMPORTING ROUTER FUNCTIONALITY FROM EXPRESS
const router = require("express").Router();

// IMPORTING API ROUTES
const apiRoutes = require("./api");

// MOUNTING API ROUTES, ANY REQUESTS TO /api WILL GO TO apiRoutes
router.use("/api", apiRoutes);
// CATCHALL FOR IF THE ROUTE IS NOT FOUND TO RETURN AN ERROR MESSAGE
router.use((req, res) => {
  return res.send("Wrong route!");
});

// EXPORTING THE ROUTER
module.exports = router;
