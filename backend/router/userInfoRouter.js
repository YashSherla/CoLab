const express = require('express');
const router = express.Router();
const { z } = require("zod");
const HTTP_STATUS = require('../utils/statusCode');
const { verifyToken } = require('../middlewares/verifyToken');
const  mongoose  = require('mongoose');
const multer = require('multer');
const { UserInfoModel } = require('../model/userInfoModel');
const upload = multer({ dest: 'uploads/' })
const createUserInfo = z.object({
    avatar: z.string().optional(),
    role: z.enum(['Admin', 'Manager', 'Contributor']),
    experience: z.string().nullable().optional(),  // Allows null or optional values
    education: z.object({
      degree: z.string().optional(),
      institution: z.string().optional(),
      graduationYear: z.number().optional().nullable(),
    }).optional()
})
router.post('/create',verifyToken,upload.single('avatar'),async(req,res)=>{
    try {
       const body = createUserInfo.safeParse({
        ...req.body,
        avatar:req.file ? req.file.path : "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?w=1380&t=st=1728277785~exp=1728278385~hmac=cd69347b4cb84e600bcaf71dfb34e00eb404aaf15728c9f21e22041b46a7560a"
       });
       if (!body.success) {
            const errorMessages = body.error.errors.map(err => {
                return `${err.path.join('.')} - ${err.message}`;
            });
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message:errorMessages
            })
       }
       const userInfo = await UserInfoModel.create({
        ...body.data,
        userId:req.user.id,
       })
       if (!userInfo) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success:false,
                message: "Invalid Data"
            })
       }
       return res.status(HTTP_STATUS.OK).json({
            success:true,
            message:"Data Saved Successfully",
       })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success:false,
            message:error.message
        })
    }
})

module.exports = router;