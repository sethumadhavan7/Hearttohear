const express = require('express')
const router = express.Router();

router.route('/helpers')
    .post(require('../CONTROLLERS/fetchUserController').fetchAllHelpers)

module.exports = router;