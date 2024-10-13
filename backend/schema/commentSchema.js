const mongoose = require('mongoose');
const commentSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    comment: {
        type: String,
        required: true,
        trim: true
    },
    relatedId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    relatedType: {
        type: String, // 'Task' / 'Project'
        required: true
    },
}, { timestamps: true })

module.exports = {
    commentSchema
}