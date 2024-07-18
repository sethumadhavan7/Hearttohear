const express = require('express');
const router = express.Router();
router.route('/availablity/:id')
    .patch(require('../CONTROLLERS/updateController').updateAvailablity)
router.route('/rating/:id')
    .patch(require('../CONTROLLERS/updateController').updateRating)

module.exports = router;