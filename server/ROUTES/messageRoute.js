const express = require('express')
const router = express.Router()

router.route('/')
    .post(require('../CONTROLLERS/messageController').newMessage)

router.route('/inbox')
    .post(require('../CONTROLLERS/messageController').getAllMessages)

module.exports = router