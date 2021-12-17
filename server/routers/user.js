const express = require("express");
const router = express.Router();
const userController = require("../controller/users/user");

router.post("/login/:email", userController.login);
router.post("/logout", userController.logout);
router.post("/githubCallback", userController.githubCallback);

router.put("/signup", userController.signup);
router.post("/emailAuth", userController.emailAuth);
router.post("/signout/:email", userController.signout);

router.post("/getUserInfo", userController.getUserInfo);
router.post("/accessTokenRequest", userController.accessTokenRequest);
router.post("/updateUserInfo", userController.updateUserInfo);

module.exports = router;
