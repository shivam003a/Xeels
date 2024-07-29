const Pin = require('../models/pinSchema')
const bcrypt = require('bcrypt')
const dotenv = require('dotenv')

dotenv.config()

exports.setPin = async(req, res)=>{
    const {id, pin} = req.params;
    const SECRET_PIN = process.env.SECRET_PIN
    const SECRET_MAIL = process.env.SECRET_MAIL

    if(id !== SECRET_PIN){
        return res.status(400).json({
            success: false,
            message: "Not Authorised",
            response: null
        })
    }

    try{
        const mailExist = await Pin.findOne({uid: SECRET_MAIL})
        if(mailExist){
            return res.status(400).json({
                success: false,
                message: "Mail Already Exist",
                response: null
            })
        }

        const salt = await bcrypt.genSalt(10)
        const updatedPin = await bcrypt.hash(pin, salt)

        const _ = await Pin.create({
            pin: updatedPin
        })

        res.status(200).json({
            success: true,
            message: "Pin Creation Successful",
            response: null
        })

    }catch(e){
        res.status(500).json({
            success: false,
            message: e.message || "Server Error",
            response: null
        })
    }
}

exports.setNewPin = async(req, res)=>{
    const {id, newPin} = req.params;
    const SECRET_PIN = process.env.SECRET_PIN
    const SECRET_MAIL = process.env.SECRET_MAIL

    if(id !== SECRET_PIN){
        return res.status(400).json({
            success: false,
            message: "Not Authorised",
            response: null
        })
    }

    try{
        const mailExist = await Pin.findOne({uid: SECRET_MAIL})
        if(!mailExist){
            return res.status(400).json({
                success: false,
                message: "Mail Does Not Exist",
                response: null
            })
        }

        const salt = await bcrypt.genSalt(10)
        const updatedPin = await bcrypt.hash(newPin, salt)

        const _ = await Pin.findOneAndUpdate({uid: SECRET_MAIL}, {
            $set: {pin: updatedPin}
        }, {new: true})

        res.status(200).json({
            success: true,
            message: "Pin Updation Successful",
            response: null
        })

    }catch(e){
        res.status(500).json({
            success: false,
            message: "Server Error",
            response: null
        })
    }
}
