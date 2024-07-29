const jwt = require('jsonwebtoken');
const User = require('../models/userSchema');
const dotenv = require('dotenv');

dotenv.config();

const checkAuth = async (req, res, next) => {
    const jwtToken = req.cookies.xeelsToken;

    if (!jwtToken) {
        return res.status(400).json({
            success: false,
            message: "JWT error: token not found"
        });
    }

    try {
        const isTokenValid = await jwt.verify(jwtToken, process.env.JWT_SECRET);
        if (!isTokenValid) {
            return res.status(400).json({
                success: false,
                message: "JWT error: invalid token"
            });
        }

        const isTokenExist = await User.findOne({
            email: isTokenValid.email,
            token: jwtToken
        });

        if (!isTokenExist) {
            throw new Error("Token Error: not found");
        }

        req.user = isTokenValid;
        next();

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error"
        });
    }
}

module.exports = checkAuth;
