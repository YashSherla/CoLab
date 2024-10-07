const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');
const z = require('zod');
const router = express.Router();
const signupSchema = z.object({
    username:z.string(),
    email:z.string(),
    password:z.string()
})
const signinSchema = z.object({
    email:z.string(),
    password:z.string(),
})
router.get('/signup',(req,res)=>{
    const body = signupSchema.safeParse(req.body);
    
    res.json({
        message:"User Sign"
    })
})

module.exports = router;