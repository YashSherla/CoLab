const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    user:{
        type: String,
        ref:'User',
        required: true,
    },
    comment:{
        type: String,
        required:true,
        trim:true
    },
    relatedId:{
        type: mongoose.Schema.Types.ObjectId,
        required:true
    },
    relatedType:{
        type:String, // 'Task' / 'Project'
        required:true
    },
    createdAt:{
        type:Date,
        default: Date.now,
    }
},{timestamps:true})

module.exports = {
    commentSchema
}