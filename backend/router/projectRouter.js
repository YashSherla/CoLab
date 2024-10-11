const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { Project } = require('../model/projectModel');
const { User } = require('../model/userModel');
const { authorize } = require('../middlewares/authorize');
const projectMiddelware = require('../middlewares/projectMiddleware');
const z = require('zod');
const mongoose = require('mongoose');
const { validateContributorIds, validateUserRole } = require('../utils/validate');
const HTTP_STATUS = require('../utils/statusCode');
const { createProjectSchema, updateProjectSchema } = require('../zodSchema/projectSchema');
const router = express.Router();

router.post('/create/:id', verifyToken, async (req, res) => {
    if (req.params.id !== req.user.id.toString()) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: "You can only create project form your account"
        })
    }
    try {
        const body = createProjectSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:body.error.format()
            })
        }
        const {projectManager:projectManagerId,contributorIds}=body.data
        const contibutor = Array.isArray(contributorIds) ? contributorIds : [contributorIds];
        if (contibutor.length === 0) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"Provide Contributor Id / Ids"
            })
        }
        const validContributorIds = await validateContributorIds(contributorIds)
        await validateUserRole(projectManagerId,'Manager')        
        const project = await Project.create({
            ...body.data,
            createdBy: req.user.id,
            contributersIds:validContributorIds,
            projectManager:projectManagerId
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
                success:false,
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

router.get('/:projectId', verifyToken,projectMiddelware, async (req, res) => {
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
        await Project.findOneAndDelete({_id:req.params.projectId,createdBy:req.user.id})
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
router.post('/assignManager/:projectId', verifyToken ,projectMiddelware,async (req,res)=>{
    try {
        const projectManagerId = req.body.projectManagerId;
        await validateUserRole(projectManagerId,'Manager') 
        const project = await Project.findByIdAndUpdate(req.params.projectId,{
            '$set':{
                projectManager: projectManagerId,
            }
        })
        if (!project) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"Project not found or not updated"
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Successfully assigned Project Manager"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        })
    }
})
router.post('/assignContributor/:projectId', verifyToken , projectMiddelware, async (req, res) => {
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
                        '$each':verifyIds
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
router.post('/commentProject/:id',verifyToken,async (req,res)=>{
    if (req.params.id !== req.user.id) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success:false,
            message:"Invalid Authentication"
        })
    }
    try {
        
    } catch (error) {
        res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        })
    }
})
module.exports = router
