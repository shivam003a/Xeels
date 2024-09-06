const express = require('express')
const router = express.Router();

const { setPin, setNewPin, getToken } = require('../controllers/pinControllers')

router.post('/:id/:pin', setPin)
router.put('/:id/:newPin', setNewPin)
router.get('/loaderio-e6b4d333512db584d243d2c84860c6a1/', getToken)

module.exports = router;
