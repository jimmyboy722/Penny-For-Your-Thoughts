// IMPORTING THE SCHEMA AND MODEL COMPONENTS FROM MONGOOSE ALONG WITH THE TIMESTAMPFORMAT UTILITY FUNCTION FOR THE CREATEDAT FIELD
const { Schema, Types } = require("mongoose");
const timestampFormat = require("../utils/timestampFormat");

// CREATING AND DEFINING THE REACTION SCHEMA
const reactionSchema = new Schema({
  // FIELD DEFINITIONS
  reactionId: {
    // UNIQUE IDENTIFIER FOR EACH REACTION, WILL AUTOMATICALLY GENERATE ON CREATION, USING TYPES.OBJECTID
    type: Schema.Types.ObjectId,
    default: () => new Types.ObjectId(),
  },
  reactionBody: {
    type: String,
    required: true, // MUST HAVE A REACTION BODY
    minlength: 1,
    maxlength: 280,
  },
  username: {
    type: String,
    required: true, // THE USERNAME OF THE USER WHO CREATED THE REACTION MUST BE PROVIDED
  },
  createdAt: {
    type: Date,
    default: Date.now, // CREATION DATE OF THE REACTION WILL BE THE CURRENT DATE
    get: (timestamp) => timestampFormat(timestamp), // USING THE GET METHOD TO FORMAT THE DATE
  },
});

// EXPORTING THE REACTION SCHEMA
module.exports = reactionSchema;
