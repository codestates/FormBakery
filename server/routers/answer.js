const express = require('express');
const router = express.Router();
const answerController = require('../controller/answer/answer');

router.put('/create/:email',answerController.create);
router.post('/get/:email',answerController.getAnswer);
router.post('/list',answerController.getAnswerList);
router.delete('/delete/:id',answerController.deleteAnswer);
router.put('/update',answerController.updateAnswer);
module.exports = router;