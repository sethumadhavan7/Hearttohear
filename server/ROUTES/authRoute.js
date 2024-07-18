const express = require('express')
const router = express.Router();

router.route('/register')
    .post(require('../CONTROLLERS/registerController').register);
router.route('/login')
    .post(require('../CONTROLLERS/loginController').login);

module.exports = router;