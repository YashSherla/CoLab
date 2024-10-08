const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const { Project } = require('../model/projectModel');
const {User} = require('../model/userModel');
const { authorize } = require('../middlewares/authorize');
const router = express.Router();
router.post('/create/:id',verifyToken,async(req,res)=>{
    if (req.params.id !== req.user.id.toString()) {
        return res.json({
            success:false,
            message:"You can only create project form your account"
        })
    }
    try {
        const body = req.body;
        const project =  await Project.create({
            ...body,
            createdBy:req.user.id
        });
        if (!project) {
            return res.status(400).json({
                success:false,
                message:"Invaid Data"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Your Project Succesfully Created"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.post('/update/:id',verifyToken,async (req,res)=>{
    try {
        const project = await Project.findOneAndUpdate(
            {_id:req.params.id,createdBy:req.user.id},
            {'$set':req.body},
            {new:true,runValidators:true})
        if (!project) {
            return res.status(400).json({
                success:false,
                message:"Project not found or not authorized"
            })
        }
        await project.save();
        return res.status(200).json({
            success:true,
            message:"You Successfully Created the Project",
            project:project
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/:id',verifyToken,async (req,res)=>{
    try {
        const project = await Project.findOne({_id:req.params.id,createdBy:req.user.id})
        if (!project) {
            return res.status(400).json({
                success:false,
                message:'Project not found or not authorized',
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully!",
            project:project
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/getAllYourProjects',verifyToken,async (req,res)=>{
    try {
      const projects = await Project.find({createdBy:req.user.id})
      if (!projects) {
        return res.status(400).json({
            success:false,
            message:'Project not found or not authorized',
        })
      }
      return res.status(200).json({
        success:true,
        message:"Get Your All Projects",
        projects:projects
      })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.delete('/delete/:id',verifyToken,async(req,res)=>{
    try {
     const project = await Project.findByIdAndDelete({_id:req.params.id,createdBy:req.user.id});
        if (!project) {
            return res.status(400).json({
                success:false,
                message:"Project not found or not authorized"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Project deleted successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/assignedUsers/:id',verifyToken,async(req,res)=>{
    try {
        const ids = req.body.userIds;
        const userIds = Array.isArray(ids) ? ids : [ids];
        if (userIds.length === 0) {
            return res.status(400).json({
                success: false,
                message: "User IDs are required"
            });
        }
        const verifyIds = await Promise.all(userIds.map( async (id)=> {
            const user = await User.findById(id);
            if (user) {
                if (user.role === 'Contributor') {
                    return user._id
                }else{
                    return null
                }
            }else{
                return null;
            }
        }))
        if (verifyIds.includes(null)) {
            return res.status(400).json({
                success:false,
                message:"One or more users not found"
            })
        }
        const updateassignUser = await Project.findOneAndUpdate(
            {_id:req.params.id,assignedUsers:req.user.id},
            {'$set':{assignedUsers:verifyIds}},
            {new:true,runValidators:true}
            )
        if (!updateassignUser) {
            return res.status(400).json({
                success:false,
                message:"Project not found or not authorized"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Successfully assigned users"
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
module.exports = router
