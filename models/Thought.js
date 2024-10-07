// IMPORTING THE SCHEMA AND MODEL COMPONENTS FROM MONGOOSE
const { Schema, model } = require("mongoose");
// IMPORTING THE TIMESTAMPFORMAT UTILITY FUNCTION TO FORMAT DATES ALONG WITH THE REACTION SCHEMA FOR REUSABLE REACTON DEFINITIONS
const timestampFormat = require("../utils/timestampFormat");
const reactionSchema = require("./Reaction");

// CREATING AND DEFINING THE THOUGHT SCHEMA
const thoughtSchema = new Schema(
  {
    // FIELD DEFINITIONS
    thoughtText: {
      type: String,
      required: "You must enter a thought...",
      minlength: 1,
      maxlength: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now,
      get: (timestamp) => timestampFormat(timestamp),
    },
    username: {
      // THE USERNAME OF THE USER WHO CREATED THE THOUGHT
      type: String,
      required: true,
    },
    reactions: [reactionSchema], // ARRAY OF OBJECT IDS THAT REFERENCE THE REACTION MODEL, ALLOWING FOR A THOUGHT TO HAVE MANY REACTIONS
  },
  {
    // SCHEMA OPTIONS
    toJSON: {
      // INCLUDING THE VIRTUALS AND GETTERS IN THE JSON REPRESENTATION SO WHEN SENDING THE THOUGHT TO THE CLIENT IT WILL INCLUDE THE VIRTUALS AND GETTERS
      virtuals: true,
      getters: true,
    },
    id: false, // PREVENTING MONGOOSE FROM ADDING THE ID FIELD HERE
  }
);

// CREATING THE THOUGHT SCHEMA VIRTUALS, CALCULATING THE NUMBER OF REACTIONS FOR THE THOUGHT BY RETURNING THE LENGTH OF THE REACTIONS ARRAY
thoughtSchema.virtual("reactionCount").get(function () {
  return this.reactions.length;
});

// CREATING THE THOUGHT MODEL USING THE THOUGHT SCHEMA
const Thought = model("Thought", thoughtSchema);

// EXPORTING THE THOUGHT MODEL
module.exports = Thought;
