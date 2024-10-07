const mongoose = require('mongoose');
const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        require:true,
        trim:true
    },
    description:{
        type:String,
        true:true,
    },
    deadline:{
        type:Date
    },
    status:{
        type:String,
        enum: ['Not Started', 'In Progress', 'Completed'],
        default: 'Not Started',
    },
    assignedUsers:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    projectId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Project',
        require:true
    }
},{timestamps:true})
const Task = mongoose.model('Project', taskSchema);
module.exports = {
    Task
}