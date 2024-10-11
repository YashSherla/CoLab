const express = require('express');
const { Task } = require('../model/taskModel');
const { verifyToken } = require('../middlewares/verifyToken');
const { Project } = require('../model/projectModel');
const { User } = require('../model/userModel');
const { validateUserRole } = require('../utils//validate');
const projectMiddelware = require('../middlewares/projectMiddleware');
const { authorize } = require('../middlewares/authorize');
const taskMiddelware = require('../middlewares/taskMiddleware');
const HTTP_STATUS = require('../utils/statusCode');
const { taskSchema , updateTaskSchema } = require('../zodSchema/taskSchema');
const router = express.Router({mergeParams:true});

router.post('/create/:projectId',verifyToken,projectMiddelware,async(req,res)=>{
    const projectId = req.params.projectId;
    if (!projectId) {
        return res.status(401).json({
            success:false,
            message:"ProjectId required"
        })
    }
    try {
        const body = taskSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"Invalid Fields"
            })
        }
        const {assignedUsers:assignedUsersIds} = body.data;
        const assignUser = Array.isArray(assignedUsersIds) ? (assignedUsersIds) : [assignedUsersIds];
        const verifyingId = await Promise.all(assignUser.map(async(id)=>{
            const project = await Project.findOne({_id:projectId,contributersIds:id})
            if (!project) {
                const user = await User.findById(id);
                throw new Error(`User with ID ${id} is not a contributor for the project${user ? `: ${user.username}` : ''}`);            } 
            const valid = validateUserRole(id,'Contributor');
            return valid
        }))
        const task =  await Task.create({
            ...body.data,
            assignedUsers:verifyingId,
            projectId:projectId
        });
        return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Successfully created task",
            task:task
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        })
    }
})
router.post('/update',verifyToken,taskMiddelware, async (req,res)=>{
    const {projectId,taskId} = req.query;
    if (!projectId || !taskId) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success: false,
            message: 'ProjectId required or TaskId required'
        });
    }
    try {
        const body = updateTaskSchema.safeParse(req.body);
        if (!body.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"Invalid Feilds"
            })
        }
        const {assignedUsers:assignedUsersIds} = body.data;
        const assignUser = Array.isArray(assignedUsersIds) ? (assignedUsersIds) : [assignedUsersIds];
        console.log(assignUser[0]);
        let verifyingId = [];
        if (assignUser.length > 0 && assignUser === undefined) {
            verifyingId = await Promise.all(assignUser.map(async(id)=>{
                const project = await Project.findOne({_id:projectId,contributersIds:id})
                if (!project) {
                    const user = await User.findById(id);
                    throw new Error(`User with ID ${id} is not a contributor for the project${user ? `: ${user.username}` : ''}`);            } 
                const valid = validateUserRole(id,'Contributor');
                return valid;
            }))
        }
        const existingTask = await Task.findOne({_id:taskId,projectId:projectId})
        if (!existingTask) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"TaskId is incorrect or ProjectId is incorrect"
            })
        }
        const updatedTaskData = {
            name: body.data.title || existingTask.title,
            description: body.data.description || existingTask.description,
            deadline:body.data.deadline || existingTask.deadline,
            status: body.data.status || existingTask.status,
            assignedUsers: verifyingId.length > 0 ? verifyingId : existingTask.assignedUsers,
        }
        const updatedTask = await Task.findByIdAndUpdate(taskId, updatedTaskData, { new: true, runValidators: true });
        return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Successfully Updated the Task",
            task:updatedTask
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        })
    }
})
router.get('/get',verifyToken,async (req,res)=>{
    const {projectId,taskId} = req.query;
    try {
        const task = await Task.findOne({_id:taskId,projectId:projectId})
        if (!task) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:'Task not found',
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Successfully!",
            task:task
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/getProjectAllTask',verifyToken,async (req,res)=>{
    try {
      const tasks = await Task.find({projectId:req.params.projectId})
      if (!tasks) {
        return res.status(HTTP_STATUS.BAD_REQUEST).json({
            success:false,
            message:'Failed to fetch tasks',
        })
      }
      return res.status(HTTP_STATUS.OK).json({
        success:true,
        message:"Get Your All Projects",
        tasks:tasks
      })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:true,
            message:error.message
        })
    }
})
router.delete('/delete/:taskId',verifyToken,authorize('Admin','Manager'),async(req,res)=>{
    try {
        const task = await Task.findByIdAndDelete(req.params.taskId)
        if (!task) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:"Tasl not found in this project"
            })
        }
        return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Task deleted successfully"
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:true,
            message:error.message
        })
    }
})
module.exports = router
