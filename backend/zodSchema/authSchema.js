const { z } = require("zod")

const signupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
    active: z.boolean().optional(),
}).strict()
const signinSchema = z.object({
    email: z.string().email(),
    password: z.string(),
}).strict()
const googleSignupSchema = z.object({
    username: z.string(),
    email: z.string().email(),
    avatar: z.string()
}).strict()
module.exports = {
    signinSchema,
    signupSchema,
    googleSignupSchema
}