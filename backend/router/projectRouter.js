const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { Project } = require('../model/projectModel');
const { authorize } = require('../middlewares/authorize');
const projectMiddelware = require('../middlewares/projectMiddleware');
const { validateContributorIds, validateUserRole } = require('../utils/validate');
const HTTP_STATUS = require('../utils/statusCode');
const { createProjectSchema, updateProjectSchema } = require('../zodSchema/projectSchema');
const { mogoConnect } = require('../db/db');
const router = express.Router();

router.post('/create/:id', verifyToken,async (req, res) => {
    if (req.params.id !== req.user.id.toString()) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "You can only create project form your account"
        })
    }
    try {
        await mogoConnect();
        const body = createProjectSchema.safeParse(req.body);
        if (!body.success) {
            const errorMessages = body.error.errors.map(err => {
                return `${err.path.join('.')} - ${err.message}`;
            });
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: errorMessages
            })
        }
        const { projectManager: projectManagerId, contributersIds } = body.data;
        console.log(body.data);
        const contibutor = Array.isArray(contributersIds) ? contributersIds : [contributersIds];
        if (contibutor) {
            console.log("This is contributor");
            await validateContributorIds(contibutor)
        }
        if (projectManagerId) {
            await validateUserRole(projectManagerId, 'Manager')
        }
        const project = await Project.create({
            name: body.data.name,
            description: body.data.deadline,
            deadline: body.data.deadline,
            status: body.data.status,
            createdBy: req.user.id,
            contributersIds: contributersIds,
            projectManager: projectManagerId,
        });
        if (!project) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Invaid Data"
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Your Project Succesfully Created"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/update/:projectId', verifyToken, projectMiddelware, async (req, res) => {
    try {
        const updateProject = updateProjectSchema.safeParse(req.body);
        if (!updateProject.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: updateProject.error.issues[0].message,
            })
        }
        if (
            (updateProject.data.name === undefined || updateProject.data.name === "") &&
            (updateProject.data.description === undefined || updateProject.data.description === "") &&
            (updateProject.data.status === undefined || updateProject.data.status === "")
        ) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "At least one of username, description, or password must be provided."
            });
        }
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            { '$set': updateProject.data },
            { new: true, runValidators: true })
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "You Successfully Update the Project",
            project: project
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/getAllYourProjects', verifyToken, async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id })
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Get Your All Projects",
            projects: projects
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:projectId', verifyToken, projectMiddelware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId)
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Successfully!",
            project: project
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: true,
            message: error.message
        })
    }
})
router.delete('/delete/:projectId', verifyToken, async (req, res) => {
    try {
        await Project.findOneAndDelete({ _id: req.params.projectId, createdBy: req.user.id })
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Project deleted successfully"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: true,
            message: error.message
        })
    }
})
router.post('/assignManager/:projectId', verifyToken, projectMiddelware, async (req, res) => {
    try {
        const projectManagerId = req.body.projectManagerId;
        if (!projectManagerId) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Invalid Data"
            })
        }
        await validateUserRole(projectManagerId, 'Manager')
        const project = await Project.findByIdAndUpdate(req.params.projectId, {
            '$set': {
                projectManager: projectManagerId,
            }
        })
        if (!project) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Project not found or not updated"
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Successfully assigned Project Manager"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/assignContributor/:projectId', verifyToken, projectMiddelware, async (req, res) => {
    try {
        const ids = req.body.userIds;
        if (!ids) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "User IDs are required"
            });
        }
        const userIds = Array.isArray(ids) ? ids : [ids];
        if (userIds.length === 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "User IDs are required"
            });
        }
        const verifyIds = await validateContributorIds(userIds)
        const updateassignUser = await Project.findByIdAndUpdate(
            req.params.projectId,
            {
                '$addToSet': {
                    contributersIds: {
                        '$each': verifyIds
                    }
                }
            },
            { new: true, runValidators: true }
        )
        if (!updateassignUser) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Project not found or not updated"
            });
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Successfully assigned users"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/commentProject/:projectId', verifyToken, async (req, res) => {
    try {
        const comment = req.body.comment;
        if (!comment) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Comment cannot be empty"
            })
        }
        const project = await Project.findById(req.params.projectId);
        if (!project) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Project Not Found"
            })
        }
        const projectComment = await Project.findByIdAndUpdate(req.params.projectId, {
            '$push': {
                comment: {
                    userId: req.user.id,
                    comment: req.body.comment,
                    relatedId: req.params.projectId,
                    relatedType: 'Project',
                }
            }

        })
        if (!projectComment) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Comment Unsuccessfully"
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success: true,
            message: "Comment Succesfully"
        })


    } catch (error) {
    }
})
router.get('/getProjectComments/:projectId', verifyToken, async (req, res) => {
    const projectId = req.params.projectId;
    if (!projectId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "ProjectId Required"
        })
    }
    const project = await Project.findById(projectId);
    if (!project) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "TaskId is incorrect"
        })
    }
    const comments = project.comment.map(({ userId, comment, createdAt }) => ({
        userId,
        comment,
        createdAt
    }));
    return res.status(HTTP_STATUS.OK).json({
        success: true,
        comment: comments,
    })
})
module.exports = router
