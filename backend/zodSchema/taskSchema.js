const mongoose = require("mongoose")
const { z } = require("zod")

const taskSchema =  z.object({
    name: z.string(),
    description: z.string().optional().default('No Description Provided'),
    deadline:z.string(),
    status: z.string().optional().default('Not Started'),
    assignedUsers:z.union([
        z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }),
        z.array(z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }))
    ]).optional().default([]),
    projectId:z.string().optional()
})
const updateTaskSchema = z.object({
    name:z.string().optional(),
    description:z.string().optional(),
    deadline:z.string().optional(),
    status:z.string().optional(),
    assignedUsers:z.union([
        z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }),
        z.array(z.string().refine((id)=> mongoose.isValidObjectId(id),{
            message: 'Invalid ObjectId',
        }))
    ]).optional(),
}).strict()

module.exports = {
    taskSchema,
    updateTaskSchema
}