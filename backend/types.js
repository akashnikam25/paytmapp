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

module.exports = {
    userType,
    loginUser
}