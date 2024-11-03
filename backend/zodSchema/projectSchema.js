const mongoose = require("mongoose");
const { z } = require("zod");

const createProjectSchema = z.object({
    name: z.string(),
    description: z.string().optional().default("No Description Provided"),
    deadline: z.string(),
    status: z.string().optional().default('Not Started'),
    contributersIds: z.union([
        z.string().refine((id) => mongoose.isValidObjectId(id), {
            message: 'Invalid ObjectId',
        }),
        z.array(z.string().refine((id) => mongoose.isValidObjectId(id), {
            message: 'Invalid ObjectId',
        })),
    ]).optional().default([]),
    projectManager: z.string().optional(),
    files: z.array(z.string()).optional(),
    createdBy: z.string().optional(),
    // comment: z.array(z.object({
    //     userId: z.string().refine((id) => mongoose.isValidObjectId(id), {
    //         message: 'Invalid ObjectId user'
    //     }),
    //     relatedId: z.string().refine((id) => mongoose.isValidObjectId(id), {
    //         message: 'Invalid ObjectId user'
    //     }),
    //     comment: z.string(),
    // })).optional().default([])
}).strict();


const updateProjectSchema = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    deadline: z.string().optional(),
    status: z.string().optional(),
}).strict();

module.exports = {
    createProjectSchema,
    updateProjectSchema
}