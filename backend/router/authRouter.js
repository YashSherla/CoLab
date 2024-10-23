const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../model/userModel');
const HTTP_STATUS = require('../utils/statusCode');
const { signupSchema, signinSchema, googleSignupSchema } = require('../zodSchema/authSchema');
const password = "admin"
const router = express.Router();
const { mogoConnect } = require('../db/db')
router.post('/signup', async (req, res) => {
    const body = signupSchema.safeParse(req.body);
    try {
        if (!body.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Invalid Input / Password should atleast 6",
            })
        }
        const hashedPassword = bcryptjs.hashSync(body.data.password, 10);
        await mogoConnect()
        const user = await User.create({ ...body.data, password: hashedPassword })
        const token = jwt.sign({ id: user._id }, password);
        const { password: pass, ...others } = user._doc;
        return res.cookie('access_token',token,{
            httpOnly:true,
            // secure:false,
            // sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        }).status(HTTP_STATUS.OK).json({
            success: true,
            message: "User created successfully",
            user:others
        })
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/signin', async (req, res) => {
    const body = signinSchema.safeParse(req.body);
    console.log("This is body" + body.data);
    try {
        if (!body.success) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: " Incorrect inputs / Provide Correct inputs",
            })
        }
        await mogoConnect()
        const user = await User.findOne({ email: body.data.email })
        if (!user) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "User not found",
            })
        }
        const validPassword = bcryptjs.compareSync(body.data.password, user.password);
        if (!validPassword) {
            return res.status(HTTP_STATUS.BAD_REQUEST).json({
                success: false,
                message: "Invalid password",
            })
        }
        const token = jwt.sign({ id: user._id }, password);
        console.log(token);
        const { password: pass, ...others } = user._doc;
        return res.cookie('access_token',token,{
            httpOnly:true,
            // secure:false,
            // sameSite: 'None',
            maxAge: 24 * 60 * 60 * 1000,
        }).status(HTTP_STATUS.OK).json({
            success: true,
            message: "User logged in successfully",
            // token: token,
            user: others
        })

    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
router.post('/google', async (req, res) => {
    try {
        await mogoConnect()
        const body = googleSignupSchema.safeParse(req.body)
        const user = await User.findOne({ email: body.data.email })
        if (user) {
            const token = jwt.sign({ id: user._id }, password);
            const { password: pass, ...others } = user._doc;
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "User logged in successfully",
                token: token,
                user: others
            })
        } else {
            const generatedPassword = Math.random().toString(36).slice(-8) + Math.random().toString(36).slice(-8);
            const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
            const newUser = await User.create({
                username: body.data.username,
                email: body.data.email,
                password: hashedPassword,
                avatar: body.data.avatar
            })
            await newUser.save();
            const token = jwt.sign({ id: user._id }, password);
            const { password: pass, ...others } = user._doc;
            return res.status(HTTP_STATUS.OK).json({
                success: true,
                message: "User created successfully",
                token: token,
                user: others
            })
        }
    } catch (error) {
        return res.status(HTTP_STATUS.INTERNAL_SERVER_ERROR).json({
            success: false,
            message: error.message
        })
    }
})
module.exports = router;