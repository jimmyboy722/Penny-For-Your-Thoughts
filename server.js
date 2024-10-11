// IMPORTING EXPRESS, THE CONNECTION TO MONGODB, AND ALL OF THE ROUTES
const express = require("express");
const db = require("./config/connection");
const routes = require("./routes");

// CREATING AN INSTANCE OF EXPRESS APPLICATION TO DEFINE ROUTES AND MIDDLEWARE
const app = express();
// DEFINING THE PORT
const PORT = process.env.PORT || 3000;

// MIDDLEWARE SETUP
// PARSES RECEIVED REQUESTS WITH URL ENCODED DATA AND MAKES THE DATA AVAILABLE IN req.body
app.use(express.urlencoded({ extended: true }));
// NATIVE EXPRESS FUNCTION THAT PARSES RECEIVED REQUESTS TO JSON
app.use(express.json());
// MOUNTING THE ROUTES
app.use(routes);

// SETTING UP THE EVENT LISTENER FOR WHEN THE MONGODB CONNECTION IS ESTABLISHED
db.once("open", () => {
  // STARTING THE SERVER
  app.listen(PORT, () => {
    console.log(`App listening at http://localhost:${PORT}`);
  });
});
