const express = require('express');
const { Task } = require('../model/taskModel');
const { verifyToken } = require('../middlewares/verifyToken');
const router = express.Router({mergeParams:true});
router.post('/create/:id',verifyToken,async(req,res)=>{
    try {
        const body = req.body;
        const task =  await Task.create({
            ...body,
            assignedUsers:req.user.id,
            projectId:req.params.id
        });
        await task.save();
        return res.status(200).json({
            success:true,
            message:"Successfully created task"
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
