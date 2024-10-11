const { Project } = require("../model/projectModel");
const HTTP_STATUS = require("../utils/statusCode");

const taskMiddelware = async(req,res,next) => {
    try {
        const projectId = req.query.projectId;
        if (!projectId) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"ProjectId required!"
            })
        }
        const projectData = await Project.findById(projectId);
        if (!projectData) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success:false,
                message:"Project Not Found!"
            })
        }
        const isAuthorized = projectData.createdBy.equals(req.user.id) || 
        projectData.projectManager.equals(req.user.id);
        if (!isAuthorized) {
            return res.status(HTTP_STATUS.UNAUTHORIZED).json({
                success:false,
                message:"Not authorized something to this project"
            })
        }
        next();
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        });
    }
}

module.exports = taskMiddelware