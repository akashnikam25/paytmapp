const zod = require("zod")

const userType = zod.object({
    username:zod.string(),
    firstName:zod.string(),
    lastName:zod.string(),
    password:zod.string()
})

const loginUser = zod.object({
    username:zod.string(),
    password:zod.string()
})

const updateBody = zod.object({
    firstName:zod.string().optional(),
    lastName:zod.string().optional(),
    password:zod.string().optional()
})

module.exports = {
    userType,
    loginUser,
    updateBody
}