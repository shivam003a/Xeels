// Importing Dependecies
const express = require('express')
const dotenv = require('dotenv')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const connectDB = require("./config/db")
const authRoutes = require('./routes/authRoutes')
const pinRoutes = require('./routes/pinRoutes')
const xeelsRoutes = require('./routes/xeelsRoutes')

// Initializing Express
const app = express()
dotenv.config()

// PORT
const PORT = process.env.PORT || 5000;

// MiddleWares
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}))
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}))
app.use(cookieParser())

// default route
app.get("/", (req, res)=>{
    res.status(200).json({
        body: "testing home"
    })
})

app.get("/loaderio-e6b4d333512db584d243d2c84860c6a1", (req, res)=>{
    res.status(201).sendFile(__dirname + "/loaderio-e6b4d333512db584d243d2c84860c6a1.txt")
})

// Setting Routes
app.use('/api/auth', authRoutes)
app.use('/api/pin', pinRoutes)
app.use('/api/xeels', xeelsRoutes)

app.listen(PORT, async()=>{
    try{
        console.log(`Server is running at PORT ${PORT}`)
        await connectDB();

    }catch(e){
        console.error("Error Connecting DB")
        process.exit(1)
    }
})
