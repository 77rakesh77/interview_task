const jwt = require("jsonwebtoken");
require('dotenv').config();
const USER_SECRET = process.env.USER_SECRET

const optional = {
    expiresIn: "365d"
}


async function userJwtToken({ _id }) {
    try {
        const payload = { _id };
        const token = jwt.sign(payload, USER_SECRET, optional);
        return { token: token };

    } catch (error) {
        return { error: true }
    }
}


module.exports = userJwtToken 
