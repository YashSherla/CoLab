const { z } = require("zod");

const updateBody = z.object({
    username: z.string().optional(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
    avatar: z.string().optional(),
    role: z.string().optional(),
}).strict();

module.exports = {
    updateBody,
}