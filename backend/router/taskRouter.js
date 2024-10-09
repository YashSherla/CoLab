const express = require('express');
const { Task } = require('../model/taskModel');
const z = require('zod')
const { verifyToken } = require('../middlewares/verifyToken');
const { default: mongoose } = require('mongoose');
const { Project } = require('../model/projectModel');
const { User } = require('../model/userModel');
const { validateUserRole } = require('../func/validate');
const router = express.Router({mergeParams:true});
const taskSchema =  z.object({
    name: z.string(),
    description: z.string().optional().default('No Description Provided'),
    deadline:z.string(),
    status: z.string().optional().default('Not Started'),
    assignedUsers:z.union([
        z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }),
        z.array(z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }))
    ]),
    projectId:z.string().optional()
})
router.post('/create/:projectId',verifyToken,async(req,res)=>{
    try {
        const body = taskSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(400).json({
                success:false,
                message:"Invalid Fields"
            })
        }
        const {assignedUsers:assignedUsersIds} = body.data;
        const assignUser = Array.isArray(assignedUsersIds) ? (assignedUsersIds) : [assignedUsersIds];

        const verifyingId = await Promise.all(assignUser.map(async(id)=>{
            const project = await Project.findOne({contributersIds:id});
            if (!project) {
                const user = await User.findById(id);
                throw new Error(`User with ID ${id} is not a contributor for the project${user ? `: ${user.username}` : ''}`);            } 
            const valid = validateUserRole(id,'Contributor');
            return valid
        }))
        const task =  await Task.create({
            ...body.data,
            assignedUsers:verifyingId,
            projectId:req.params.projectId
        });
        return res.status(200).json({
            success:true,
            message:"Successfully created task",
            task:task
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.post('/update/:id/:projectId',verifyToken,async (req,res)=>{
    try {
        const task = await Task.findOneAndUpdate(
            {_id:req.params.id,assignedUsers:req.user.id,projectId:req.params.projectId},
            {'$set':req.body},
            {new:true,runValidators:true})
        if (!task) {
            return res.status(400).json({
                success:false,
                message:"Task not found or not authorized"
            })
        }
        return res.status(200).json({
            success:true,
            message:"You Successfully Created the Task",
            task:task
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.get('/:id/:projectId',verifyToken,async (req,res)=>{
    try {
        const task = await Task.findOne({_id:req.params.id,projectId:req.params.projectId})
        if (!task) {
            return res.status(400).json({
                success:false,
                message:'Task not found',
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully!",
            task:task
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/getAllProjectsTask',verifyToken,async (req,res)=>{
    try {
      const tasks = await Task.find({projectId:req.params.projectId})
      if (!tasks) {
        return res.status(400).json({
            success:false,
            message:'Failed to fetch tasks',
        })
      }
      return res.status(200).json({
        success:true,
        message:"Get Your All Projects",
        tasks:tasks
      })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.delete('/delete/:id/:projectId',verifyToken,async(req,res)=>{
    try {
     const task = await Task.findByIdAndDelete({_id:req.params.id,createdBy:req.user.id});
        if (!task) {
            return res.status(400).json({
                success:false,
                message:"Tasl not found in this project"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Task deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
module.exports = router
