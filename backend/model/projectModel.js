const mongoose = require('mongoose');
const { commentSchema } = require('../schema/commentSchema');
const projectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        true: true,
        default: "No Description Provided"
    },
    deadline: {
        type: Date,
        validate: {
            validator: (value) => {
                return value >= new Date();
            },
            message: 'Deadline must be a future date.'
        }
    },
    status: {
        type: String,
        enum: ['Not Started', 'In Progress', 'Completed', 'Archived', 'Cancelled'],
        default: 'Not Started',
    },
    contributersIds: {
        type: [
            mongoose.Schema.Types.ObjectId
        ],
        ref: 'User',
        default: [],
    },
    projectManager: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    files: {
        type: Array,
        default: [],
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: [commentSchema],
        default: [],
    },
}, { timestamps: true })
const Project = mongoose.model('Project', projectSchema);
module.exports = {
    Project
}