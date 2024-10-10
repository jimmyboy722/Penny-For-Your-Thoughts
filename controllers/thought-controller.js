// IMPORTING USER AND THOUGHT MODELS
const { Thought, User } = require("../models");

// CREATING A ERROR MESSAGE FUNCTION IN ORDER TO FOLLOW 'DRY' CODING PRINCIPLE
const possibleErrorMessage = function () {
  if (!thoughtData) {
    return res
      .status(404)
      .json({ message: "There is no thought with this id!" });
  }
};

// CREATING THE THOUGHT CONTROLLER OBJECT
const thoughtController = {
  // RETRIEVING ALL THOUGHTS
  async getAllThoughts(req, res) {
    try {
      // WILL BE USING TRY CATCH BLOCKS TO HANDLE ERRORS
      const thoughtData = await Thought.find().sort({ createdAt: -1 });
      // .SORT USED TO SORT THE THOUGHTS IN DESCENDING ORDER, NEWEST THOUGHTS FIRST

      res.json(thoughtData); // SENDING THE JSON RESPONSE
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // RETRIEVING A SINGLE THOUGHT BY ID
  async getSingleThought(req, res) {
    try {
      const thoughtData = await Thought.findOne({
        // THOUGHT.FINDONE USED TO FIND THE SPECIFIC ID PER PARAMS
        _id: req.params.thoughtId,
      });

      possibleErrorMessage();

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // ADDING A NEW THOUGHT
  async addThought(req, res) {
    try {
      const thoughtData = await Thought.create(req.body);

      const userData = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: thoughtData._id } }, // $PUSH USED TO ADD A NEW THOUGHT ID TO THE USER THOUGHTS ARRAY
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id!" });
      }

      res.json({ message: "Thought successfully created!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // UPDATING A THOUGHT
  async updateThought(req, res) {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body }, // $SET IS THE MONGODB OPERATOR USED TO UPDATE A THOUGHT ARRAY
      { runValidators: true, new: true } // RUNVALIDATORS: MAKES SURE THE UPDATED DOCUMENT IS VALIDATED AGAINST THE SCHEMA
    );

    if (!thoughtData) {
      return res.status(404).json({ message: "No thought with this id!" });
    }

    res.json(thoughtData);

    console.log(err);
    res.status(500).json(err);
  },
  // DELETING A THOUGHT
  async deleteThought(req, res) {
    try {
      const thoughtData = await Thought.findOneAndRemove({
        _id: req.params.thoughtId,
      });

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      // REMOVING THE THOUGHT ID FROM THE USER THOUGHTS ARRAY
      const userData = User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } }, //$PULL USED TO REMOVE ALL INSTANCES OF A THOUGHT ID FROM THE USER THOUGHTS ARRAY
        { new: true }
      );

      if (!userData) {
        return res
          .status(404)
          .json({ message: "Thought created but no user with this id!" });
      }

      res.json({ message: "Thought successfully deleted!" });
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },

  // add a reaction to a thought
  async addReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $addToSet: { reactions: req.body } }, // $ADDTOSET USED TO ADD NEW REACTION TO THE THOUGHT REACTIONS ARRAY IF IT DOESN'T ALREADY EXIST
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res.status(404).json({ message: "No thought with this id!" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
  // remove reaction from a thought
  async removeReaction(req, res) {
    try {
      const thoughtData = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $pull: { reactions: { reactionId: req.params.reactionId } } },
        { runValidators: true, new: true }
      );

      if (!thoughtData) {
        return res
          .status(404)
          .json({ message: "There is no thought with this id!" });
      }

      res.json(thoughtData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  },
};

// EXPORTING THE THOUGHT CONTROLLER
module.exports = thoughtController;
