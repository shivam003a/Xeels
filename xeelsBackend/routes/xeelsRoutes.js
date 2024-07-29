const express = require('express')
const router = express.Router()
const checkAuth  = require('../middlewares/auth')

const { uploadXeels, getXeels, saveXeels, unsaveXeels, getAllSaved } = require('../controllers/xeelsControllers')

router.post('/', checkAuth, uploadXeels)
router.get('/', checkAuth, getXeels)

module.exports = router