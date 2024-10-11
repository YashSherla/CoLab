const { User } = require("../db/db");

const authorize = (...allowedRoles) => {
    return async (req, res, next) =>{
    try {
        const id = req.user.id;
        const user = await User.findById(id);
        if (!user || !allowedRoles.includes(user.role) ) {
            return res.status(403).json({
                success:false,
                message:"Forbidden"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Server Error' });
    }
    }
}
module.exports = {
    authorize
}