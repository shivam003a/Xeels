const User = require('../models/userSchema')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

exports.signup = async (req, res) => {
    try {
        let { name, email, password } = req.body;
        email = email.trim().toLowerCase()

        if (!name || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields Can't be Empty",
                response: null
            })
        }

        const isEmailExist = await User.findOne({ email });

        if (isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "User Already Registered",
                response: null
            })
        }


        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const responseData = await User.create({
            name,
            email,
            password: hashedPassword
        })

        const data = responseData.toObject();
        data.password = null;

        res.status(200).json({
            success: true,
            message: "User Registered!",
            response: data
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error",
        })
    }
}

exports.signin = async (req, res) => {
    try {
        let { email, password } = req.body;
        email = email.trim().toLowerCase()

        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Fields Can't be Empty",
                response: null
            })
        }

        const isEmailExist = await User.findOne({ email });

        if (!isEmailExist) {
            return res.status(400).json({
                success: false,
                message: "User is Not Registered",
                response: null
            })
        }

        const isPassMatched = await bcrypt.compare(password, isEmailExist.password);

        if (!isPassMatched) {
            return res.status(400).json({
                success: false,
                message: "Invalid Credentials",
                response: null
            })
        }

        const jwtToken = await isEmailExist.genAuthToken();

        res.cookie("xeelsToken", jwtToken, {
            expires: new Date(Date.now() + 604800000),
            httpOnly: true,
            secure: true,
            sameSite: 'None'
        })

        const data = isEmailExist.toObject();
        data.password = null;
        data.token = null;

        res.status(200).json({
            success: true,
            message: "Sigin Success",
            response: data
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: "Internal Server Error"
        })
    }
}

exports.signof = async (req, res) => {
    try {
        const id = req.user._id;
        const loggedUser = await User.findByIdAndUpdate(id, {
            $set: { token: null }
        }, { new: true }).select('-password');

        res.clearCookie('xeelsToken');

        res.status(200).json({
            success: true,
            message: "Logged Out",
            response: loggedUser
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error"
        })
    }
}

exports.verify = async (req, res) => {
    try {
        const _id = req.user._id

        const response = await User.findById(_id);
        if (!response) {
            return res.status(400).json({
                success: false,
                message: "Unauthorised",
                response: null
            })
        }

        res.status(200).json({
            success: true,
            message: "Verified",
            response: null
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error"
        })
    }
}