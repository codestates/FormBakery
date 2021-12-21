const express = require("express");
const router = express.Router();
const formController = require("../controller/form/form");
const multer = require("multer");
const method = require("../method/custom");
const DIR_NAME = __dirname
  .split("/")
  .slice(0, __dirname.split("/").length - 1)
  .join("/");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, DIR_NAME + "/image/form/"); // 파일 업로드 경로
  },
  filename: (req, file, cb) => {
    cb(null, method.randomString(8, file.originalname)); //파일 이름 설정
  },
});

const upload = multer({
  storage,
});

router.put("/create/:uuidInfo", formController.create);

router.get("/get/:id", formController.getForm);

router.put("/image/:id", upload.single("file"), formController.uploadImageLink);

router.post("/list/:email", formController.getFormList);

router.put("/update/:id", formController.updateForm);

router.delete("/delete/:id", formController.deleteForm);
module.exports = router;
