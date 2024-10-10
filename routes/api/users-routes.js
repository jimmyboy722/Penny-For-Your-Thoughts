// IMPORTING ROUTER FUNCTIONALITY FROM EXPRESS
const router = require("express").Router();

// IMPORTING USER CONTROLLER FUNCTIONS
const {
  getAllUsers,
  getSingleUser,
  addUser,
  updateUser,
  deleteUser,
  addFriend,
  deleteFriend,
} = require("../../controllers/userController");

//DEFINING ROUTES

// ENDPOINT:/api/users
// RETRIEVE ALL USERS AND ADD A NEW USER
router.route("/").get(getAllUsers).post(addUser);

//ENDPOINT: /api/users/:userId
// RETRIEVE, UPDATE, AND DELETE A SINGLE USER
router.route("/:userId").get(getSingleUser).put(updateUser).delete(deleteUser);

//ENDPOINT: /api/users/:userId/friends/:friendId
// ADD A FRIEND FOR THE USER TO IDENTIFY BY USER ID AND DELETE A FRIEND IDENTIFIED BY FRIEND ID
router.route("/:userID/friends/:friendID").post(addFriend).delete(deleteFriend);

// EXPORTING THE ROUTER
module.exports = router;
