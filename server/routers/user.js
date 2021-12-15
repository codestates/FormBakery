const express = require("express");
const router = express.Router();
const userController = require("../controller/users/user");

router.post("/login/:email", userController.login);
router.post("/logout", userController.logout);

module.exports = router;
