const mongoose = require('mongoose');
const { commentModel, commentSchema } = require('./commentModel');
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    description:{
        type:String,
        trim:true,
        default:"No Description Provided"
    },
    deadline:{
        type:Date,
        validate:{
            validator: (value)=>{
                return value >= new Date();
            },
            message:'Deadline must be a future date.'
        }
    },
    status:{
        type:String,
        enum: ['Not Started', 'In Progress', 'Completed', 'Archived', 'Cancelled'],
        default: 'Not Started',
    },
    assignedUsers:{
        type:[mongoose.Schema.Types.ObjectId],
        ref:'User',
        default:[]
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        required:true
    },
    comment:[commentSchema] 
},{timestamps:true})
const Task = mongoose.model('Task', taskSchema);
module.exports = {
    Task
}