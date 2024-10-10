//  IMPORTING USER AND THOUGHT MODELS
const { User, Thought } = require("../models");

// CREATING A ERROR MESSAGE FUNCTION IN ORDER TO FOLLOW 'DRY' CODING PRINCIPLE
const errorMessage = function () {
  this.res.status(404).json({ message: "There is no user with that ID" });
};

// USER CONTROLLER OBJECT
// CONTROLLER FUNCTIONS ESSENTIALLY WILL BE THE SAME WITH MINOR CHANGES DEPENDING ON THE OPERATION
const userController = {
  // RETRIEVING ALL USERS
  async getAllUsers(req, res) {
    // WILL BE USING TRY CATCH BLOCKS TO HANDLE ERRORS
    try {
      const userData = await User.find().select("-__v");
      res.json(userData); // SENDING THE JSON RESPONSE
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // RETRIEVING A SINGLE USER BY ID
  async getSingleUser(req, res) {
    try {
      const userData = await User.findOne({ _id: req.params.userId }) //USER.FINDONE USED TO FIND THE SPECIFIC ID
        .select("-__v") // MONGOOSE FEATURE TO REMOVE THE __V (VERSION TRACKING) PROPERTY
        .populate("thoughts")
        .populate("friends");

      if (!userData) {
        // THROWS AN ERROR MESSAGE IF THERE IS NO USER WITH THAT ID
        errorMessage();
      }

      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // ADDING A NEW USER
  async addUser(req, res) {
    try {
      const userData = await User.create(req.body);
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
  // UPDATING A USER
  async updateUser(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $set: req.body },
        { runValidators: true, new: true }
        // RUNVALIDATORS: MAKES SURE THE UPDATED DOCUMENT IS VALIDATED AGAINST THE SCHEMA
      );
      if (!userData) {
        errorMessage();
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETING A USER
  async deleteUser(req, res) {
    try {
      const userData = await User.findOneAndDelete({ _id: req.params.userId });
      if (!userData) {
        errorMessage();
      }
      // DELETING ALL THOUGHTS ASSOCIATED WITH THE USER BY ID
      await Thought.deleteMany({ _id: { $in: userData.thoughts } });
      res.json({ message: "User and corresponding thoughts deleted!" });
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // ADDING A FRIEND
  async addFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $addToSet: { friends: req.params.friendId } },
        { new: true }
      );
      if (!userData) {
        errorMessage();
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },

  // DELETING A FRIEND
  async deleteFriend(req, res) {
    try {
      const userData = await User.findOneAndUpdate(
        { _id: req.params.userId },
        { $pull: { friends: req.params.friendId } },
        { runValidators: true, new: true }
      );
      if (!userData) {
        errorMessage();
      }
      res.json(userData);
    } catch (err) {
      console.error(err);
      res.status(500).json(err);
    }
  },
};
module.exports = {};
