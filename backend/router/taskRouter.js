const express = require('express');
const router = express.Router();
router.post('/create',(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.post('/update',(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/:id',(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.get('/get',(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
router.delete('/delete/:id',(req,res)=>{
    try {
        
    } catch (error) {
        return res.status(500).json({
            success:true,
            message:error.message
        })
    }
})
module.exports = router;