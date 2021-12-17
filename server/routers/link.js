const express = require('express');
const router = express.Router();
const linkController = require('../controller/form/link');

router.post('/send/:email',linkController.sendLink);

module.exports = router;