const jwt = require("jsonwebtoken");
require('dotenv').config();
const USER_SECRET = process.env.USER_SECRET


const userVerifyToken = async (req, res, next) => {
    let token = req.headers.authorization
    if (!token) {
        return res.status(400).json({
            success: false,
            message: "Token Not Provided"
        })
    }
    try {
        let decoded = jwt.verify(token, USER_SECRET)
        req.user = decoded._id
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: "Token Invalid"
        })
    }
    return next()
}

module.exports = userVerifyToken