const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { Project } = require('../model/projectModel');
const { User } = require('../model/userModel');
const { authorize } = require('../middlewares/authorize');
const projectMiddelware = require('../middlewares/projectMiddleware');
const z = require('zod');
const mongoose = require('mongoose');
const { validateContributorIds, validateUserRole } = require('../func/validate');
const router = express.Router();
const createProjectSchema = z.object({
    name: z.string(),
    description: z.string().optional().default("No Description Provided"),
    deadline: z.string(),
    status: z.string().optional().default('Not Started'),
    contributersIds: z.union([
        z.string().refine((id) => mongoose.isValidObjectId(id), {
            message: 'Invalid ObjectId',
        }),
        z.array(z.string().refine((id) => mongoose.isValidObjectId(id), {
            message: 'Invalid ObjectId',
        })),
    ]).optional().default([]),
    projectManager: z.string().optional(),
    createdBy: z.string().optional(),
});
const updateProjectSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    status: z.string().optional()
});
router.post('/create/:id', verifyToken, async (req, res) => {
    if (req.params.id !== req.user.id.toString()) {
        return res.status(400).json({
            success: false,
            message: "You can only create project form your account"
        })
    }
    try {
        const body = createProjectSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                success:false,
                message:body.error.format()
            })
        }
        const {projectManager:projectManagerId,contributorIds}=body.data
        const contibutor = Array.isArray(contributorIds) ? contributorIds : [contributorIds];
        if (contibutor.length === 0) {
            return res.status(400).json({
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
            return res.status(400).json({
                success: false,
                message: "Invaid Data"
            })
        }
        return res.status(200).json({
            success: true,
            message: "Your Project Succesfully Created"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/update/:projectId', verifyToken, projectMiddelware, async (req, res) => {
    try {
        const updateProject = updateProjectSchema.safeParse(req.body);
        if (!updateProject.success) {
            return res.status(400).json({
                success:false,
                message:"Invalid Data"
            })
        }
        const project = await Project.findByIdAndUpdate(
            req.params.projectId,
            { '$set': updateProject.data },
            { new: true, runValidators: true })
        return res.status(200).json({
            success: true,
            message: "You Successfully Update the Project",
            project: project
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/getAllYourProjects', verifyToken, async (req, res) => {
    try {
        const projects = await Project.find({ createdBy: req.user.id })
        return res.status(200).json({
            success: true,
            message: "Get Your All Projects",
            projects: projects
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})

router.get('/:projectId', verifyToken,projectMiddelware, async (req, res) => {
    try {
        const project = await Project.findById(req.params.projectId)
        return res.status(200).json({
            success: true,
            message: "Successfully!",
            project: project
        })
    } catch (error) {
        return res.status(500).json({
            success: true,
            message: error.message
        })
    }
})
router.delete('/delete/:projectId', verifyToken,projectMiddelware, async (req, res) => {
    try {
        const project = await Project.findByIdAndDelete(req.params.projectId);
        return res.status(200).json({
            success: true,
            message: "Project deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
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
            return res.status(400).json({
                success:false,
                message:"Project not found or not updated"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully assigned Project Manager"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.post('/assignContributor/:projectId', verifyToken , projectMiddelware, async (req, res) => {
    try {
        const ids = req.body.userIds;
        const userIds = Array.isArray(ids) ? ids : [ids];
        if (userIds.length === 0) {
            return res.status(400).json({
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
            return res.status(404).json({
                success: false,
                message: "Project not found or not updated"
            });
        }
        return res.status(200).json({
            success: true,
            message: "Successfully assigned users"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router
