// THIS FILE SERVES AS THE CENTRAL EXPORT FOR ALL MODELS
// INSTEAD OF IMPORTING EACH MODEL SEPARATELY, THIS FILE IMPORTS ALL MODELS AT ONCE

// IMPORTING USER AND THOUGHT MODELS
const User = require("./User");
const Thought = require("./Thought");
// REACTION MODEL IS SCHEMA ONLY
module.exports = { User, Thought };
