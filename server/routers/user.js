const express = require("express");
const router = express.Router();
const userController = require("../controller/users/user");

const multer = require("multer");
const method = require("../method/custom");

const DIR_NAME = __dirname
  .split("/")
  .slice(0, __dirname.split("/").length - 1)
  .join("/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR_NAME + "/image/user/"); // 파일 업로드 경로
  },
  filename: (req, file, cb) => {
    cb(null, method.randomString(8, file.originalname)); //파일 이름 설정
  },
});

const upload = multer({
  storage,
});

router.put(
  "/uploadProfileImage/:email",
  upload.single("file"),
  userController.uploadProfileImage
);

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
