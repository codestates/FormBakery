const express = require("express");
const router = express.Router();
const userController = require("../controller/users/user");

router.post("/login/:email", userController.login);
router.post("/logout", userController.logout);
router.post("/githubCallback", userController.githubCallback);

router.put("/signup", userController.signup);
router.post("/signupEmailAuth", userController.signupEmailAuth);
router.post("/passwordEmailAuth", userController.passwordEmailAuth);

router.post("/signout/:email", userController.signout);

router.post("/getUserInfo", userController.getUserInfo);
router.post("/accessTokenRequest", userController.accessTokenRequest);
router.put("/updateUserInfo/:email", userController.updateUserInfo);
router.put("/changePassword/:email", userController.changePassword);
router.put("/forgetPassword/:email", userController.forgetPassword);

module.exports = router;
