const express = require("express");
const {
  addUser,
  deleteUser,
  getUsers,
} = require("../controllers/userController");
const router = express.Router();

router.post("/users", addUser);
router.delete("/users/:id", deleteUser);
router.get("/users", getUsers); // Add this line

module.exports = router;
