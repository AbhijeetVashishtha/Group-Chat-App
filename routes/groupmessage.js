const express = require('express');

const router = express.Router();

const middlewareAuthentication = require('../middleware/auth');
const contentController = require('../controller/groupmessage');


router.post('/addparticipant/:id', middlewareAuthentication.authenticate, contentController.addParticipation);

router.post('/sendmessage/:id', middlewareAuthentication.authenticate,contentController.sendGroupMessage);

router.get('/getgrpmessages/:id', middlewareAuthentication.authenticate, contentController.getGrpMessages);

module.exports = router;