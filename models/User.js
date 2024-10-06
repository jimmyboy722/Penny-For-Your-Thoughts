// IMPORTING THE SCHEMA AND MODEL COMPONENTS FROM MONGOOSE
// SCHEMA: DEFINES THE STRUCTURE OF THE DOCUMENTS IN THE COLLECTION
// MODEL: CREATES A MONGODB MODEL FROM THE SCHEMA
const { Schema, model } = require("mongoose");

// CREATING AND DEFINING THE USER SCHEMA
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true, // SO NO TWO USERS CAN HAVE THE SAME USERNAME
      trim: true, // TRIMS THE WHITESPACE FROM BOTH SIDES
    },
    email: {
      type: String,
      required: true,
      unique: true, // SO NO TWO USERS CAN HAVE THE SAME EMAIL
      match: [/.+@.+\..+/, "Needs to match an email address!"], // USES A REGEX TO  MAKE SURE THE STRING IS IN THE EMAIL FORMAT
    },
    thoughts: [
      // ARRAY OF OBJECT IDS THAT REFERENCE THE THOUGHT MODEL, ALLOWING FOR A USER TO HAVE MANY THOUGHTS
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      // ARRAY OF OBJECT IDS THAT REFERENCE THE USER MODEL, ALLOWING FOR A USER TO HAVE MANY FRIENDS
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // SCHEMA OPTIONS
    // USE THE tOJSON METHOD TO GET A VIRTUAL PROPERTY FOR EACH DOCUMENT IN THE COLLECTION
    toJSON: {
      virtuals: true,
    },
    id: false, // PREVENTS MONGOOSE FROM ADDING AN ID FIELD
  }
);

// CREATING A VIRTUAL PROPERTY THAT RETURNS THE NUMBER OF FRIENDS A USER HAS
// NOT STORED IN THE DATABASE, BUT CAN BE CALLED ON
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});
// CREATING THE USER MODEL USING THE USER SCHEMA
const User = model("User", userSchema);
// EXPORTING THE USER MODEL
module.exports = User;
