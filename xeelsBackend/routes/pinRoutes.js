const express = require('express')
const router = express.Router();

const { setPin, setNewPin } = require('../controllers/pinControllers')

router.post('/:id/:pin', setPin)
router.put('/:id/:newPin', setNewPin)

module.exports = router;