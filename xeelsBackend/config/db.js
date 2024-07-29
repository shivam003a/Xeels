const mongoose = require("mongoose");
const dotenv = require('dotenv');

dotenv.config();

const connectDB = async () => {
    const DB_URL = process.env.DB_URL
    if(!DB_URL){
        throw new Error("Db Url is NULL")
    }

    try {
        await mongoose.connect(DB_URL)
        console.log("DB Connected")

    } catch (e) {
        console.error(e.message);
        process.exit(1)

    }
}

module.exports = connectDB;