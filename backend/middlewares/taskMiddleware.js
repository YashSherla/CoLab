const taskMiddelware = async(req,res,next) => {
    try {
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: 'Server Error' });
    }
}
module.exports = taskMiddelware