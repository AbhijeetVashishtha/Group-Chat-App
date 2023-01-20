const express = require('express');
const middlewareAuthentication = require('../middleware/auth');
const messageController = require('../controller/message');
const router = express.Router();

router.post('/send',middlewareAuthentication.authenticate, messageController.sendMessage)

module.exports = router;