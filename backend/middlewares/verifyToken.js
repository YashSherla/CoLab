const jwt = require('jsonwebtoken');
const HTTP_STATUS = require('../utils/statusCode');
const password = "admin"
const verifyToken = async (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(HTTP_STATUS.UNAUTHORIZED).json({
            success: false,
            message: "No token provided"
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token, password)
        if (!decode) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success: false,
                message: "Your token is Invalid"
            })
        }
        // console.log(decode);
        req.user = decode;
        next()
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }

}
module.exports = {
    verifyToken
}