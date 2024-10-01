// IMPORTING MONGOOSE
const mongoose = require("mongoose");

// WRAPPING MONGOOSE AROUND LOCAL CONNECTION TO MONGODB
mongoose.connect("mongodb://127.0.0.1:27017/socialmedia");

//EXPORTING THE CONNECTION
module.exports = mongoose.connection;
