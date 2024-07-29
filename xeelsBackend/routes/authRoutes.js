const express = require('express')
const router = express.Router();
const checkAuth = require('../middlewares/auth')

const { signup, signin, signof, verify } = require('../controllers/authControllers')

router.post("/signup", signup)
router.post("/signin", signin)
router.get("/verify", checkAuth, verify)
router.post("/signoff", checkAuth, signof)

module.exports = router;