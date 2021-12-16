const express = require("express");
var cors = require("cors");
const app = express();
const port = 80;
const userRouter = require("./routers/user");
const answerRouter = require("./routers/answer");
const formRouter = require('./routers/form');
app.use(express.json());
app.use(express.text());
app.use(cors());

app.use("/user", userRouter);
app.use("/answer", answerRouter);
app.use('/form',formRouter);
app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("server open!");
});
