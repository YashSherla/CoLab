const express = require('express');
const { verifyToken } = require('../middlewares/verifyToken');
const bcryptjs = require('bcryptjs');
const z = require('zod');
const { User } = require('../model/userModel');
const { authorize } = require('../middlewares/authorize');
const multer = require('multer');

const upload = multer({ dest: 'uploads/' })

const router = express.Router();
const updateBody = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    avatar: z.string().optional(),
    role: z.string().optional(),
})
router.post('/update/:id', verifyToken, upload.single('avatar'), async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: "You can only update your own account!"
        })
    }
    try {
        const body = updateBody.safeParse({
            ...req.body,
            avatar: req.file ? req.file.path : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=1380&t=st=1728277785~exp=1728278385~hmac=cd69347b4cb84e600bcaf71dfb34e00eb404aaf15728c9f21e22041b46a7560a"
        });
        console.log("This is File " + req.file);
        if (!body.success) {
            return res.status(401).json({
                success: false,
                message: "Invalid data"
            })
        }
        if (body.data.password) {
            body.data.password = bcryptjs.hashSync(body.data.password, 10);
        }
        console.log(body.data);
        const user = await User.findByIdAndUpdate(req.params.id, body.data, { new: true })
        if (!user) {
            return res.status(400).json({
                success: false,
                message: "User not Found"
            })
        }
        const { password: pass, ...others } = user._doc;
        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: others
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.delete('/delete/:id', verifyToken, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: "You can only delete your own account!"
        })
    }
    try {
        await User.findByIdAndDelete(req.params.id);
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully"
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/get/:id', verifyToken, async (req, res) => {
    if (req.params.id !== req.user.id) {
        return res.status(401).json({
            success: false,
            message: "You can only fetch your own account!"
        })
    }
    try {
        const user = await User.findById(req.params.id);
        const { password: pass, ...others } = user._doc;
        return res.status(200).json({
            success: true,
            message: "User Deleted Successfully",
            user: others
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
})
router.get('/manager',verifyToken,async(req,res)=>{
    try {
        const getProjectManagers = await User.find({role:'Manager'})
        if (!getProjectManagers) {
            return res.status(400).json({
                success:false,
                message:"No Manager Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Fetch All Managers",
            managers:getProjectManagers,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
router.get('/contributor',verifyToken,async(req,res)=>{
    try {
        const getContributor = await User.find({role:'Contributor'})
        if (!getContributor) {
            return res.status(400).json({
                success:false,
                message:"No Contributor Found"
            })
        }
        return res.status(200).json({
            success:true,
            message:"Fetch All Contributor",
            contributors:getContributor,
        })
    } catch (error) {
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
})
module.exports = router;