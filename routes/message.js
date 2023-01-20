const express = require('express');
const middlewareAuthentication = require('../middleware/auth');
const messageController = require('../controller/message');
const router = express.Router();

router.post('/send',middlewareAuthentication.authenticate, messageController.sendMessage);

router.get('/fetchmessage', messageController.fetchMessage);

module.exports = router;