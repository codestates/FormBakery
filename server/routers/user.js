const express = require("express");
const router = express.Router();
const userController = require("../controller/users/user");

router.post("/login/:email", userController.login);
router.post("/logout", userController.logout);

router.post("/githubCallback", userController.githubCallback);
router.put("/signup", userController.signup);

module.exports = router;
