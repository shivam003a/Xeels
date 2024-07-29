const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')

dotenv.config()

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true,
        minLength: 4,
    },
    token: {
        type: String
    },
    savedXeels: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Xeels"
    }]
}, { timestamps: true})

userSchema.methods.genAuthToken = async function(){
    const payload = {
        _id: this._id,
        email: this.email
    }

    const JWT_SECRET = process.env.JWT_SECRET
    if(!JWT_SECRET){
        throw new Error("JWT SECRET env not found")
    }

    const token = await jwt.sign(payload, JWT_SECRET, {
        expiresIn: "168h"
    })

    this.token = token
    await this.save();
    return token;
}

const User = mongoose.model('User', userSchema);

module.exports = User;