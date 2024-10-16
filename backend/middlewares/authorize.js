const { User } = require("../model/userModel");

const authorize = (...allowedRoles) => {
    return async (req, res, next) =>{
    try {
        const id = req.user.id;
        console.log(id);
        const user = await User.findOne();
        console.log("This is user"+ user);
        if (!user || !allowedRoles.includes(user.role) ) {
            return res.status(403).json({
                success:false,
                message:"Only Admin can create projects"
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