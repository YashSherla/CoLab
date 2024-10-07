const jwt = require('jsonwebtoken');
const password = "admin"
const verifyToken = async(req,res,next) =>{
    const authHeader = req.headers.authorization; 
    console.log(authHeader);
    if (!authHeader ||  !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({
            success:false,
            message: "No token provided"
        })
    }
    const token = authHeader.split(' ')[1];
    try {
        const decode = jwt.verify(token,password)
        if (!decode) {
            return res.status(401).json({
                success:false,
                message:"Your token is Invalid"
            })
        }
        req.user = decode;
        next()
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

}
module.exports = {
    verifyToken
}