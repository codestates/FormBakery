const express = require("express");
var cors = require("cors");
const app = express();
const port = 80;
const userRouter = require("./routers/user");
const answerRouter = require("./routers/answer");
const formRouter = require("./routers/form");
const linkRouter = require("./routers/link");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(express.text());
app.use(cors({ credentials: true, origin: "https://form-bakery.vercel.app/" }));
app.use(cookieParser());
app.use("/image", express.static(__dirname + "/image"));

app.use("/user", userRouter);
app.use("/answer", answerRouter);
app.use("/form", formRouter);
app.use("/link", linkRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server open!");
});
