const Xeels = require('../models/xeelsSchema')
const User = require('../models/userSchema')

exports.uploadXeels = async (req, res) => {
    try {
        const { title, videoUrl } = req.body;

        if (!title || !videoUrl) {
            return res.status(400).json({
                success: false,
                message: "Fields Can't be Empty",
                response: null
            })
        }

        const xeelsData = await Xeels.create({
            title, videoUrl
        })

        res.status(200).json({
            success: true,
            message: "Xeels Uploaded",
            response: xeelsData
        })

    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error",
        })
    }
}

exports.getXeels = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const skip = (page - 1) * limit

        const xeelsAgreggate = await Xeels.aggregate([{
            $sample: { size: 1000 }
        }])

        const xeelsData = xeelsAgreggate.slice(skip, Math.min(xeelsAgreggate.length, limit + skip))

        res.status(200).json({
            success: true,
            message: "Xeels Uploaded",
            response: xeelsData,
            page: page,
            limit: limit
        })
    } catch (e) {
        res.status(500).json({
            success: false,
            message: e.message || "Internal Server Error",
        })
    }
}