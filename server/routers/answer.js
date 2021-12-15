const express = require('express');
const router = express.Router();
const answerController = require('../controller/answer/answer');

router.put('/create/:email',answerController.create);
router.post('/get/:email',answerController.getAnswer);
module.exports = router;