const { Project } = require("../model/projectModel");

const projectMiddelware = async(req,res,next) => {
    try {
        const projectId = req.params.projectId;
        const project = await Project.findById(projectId)
        if (!project) {
            return res.status(400).json({
                success:false,
                message: "Project not found",
            })
        }
        const isAuthorized = project.createdBy.toString() === req.user.id || 
        project.projectManager.toString() === req.user.id;
        if (!isAuthorized) {
            return res.status(400).json({
                success:false,
                message:"Not authorized to assign users to this project"
            })
        }
        next()
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message });
    }
}
module.exports = projectMiddelware