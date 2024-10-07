const mongoose = require('mongoose');
const projectSchema = new mongoose.Schema({
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
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        require:true
    }
},{timestamps:true})
const Project = mongoose.model('Project', projectSchema);
module.exports = {
    Project
}