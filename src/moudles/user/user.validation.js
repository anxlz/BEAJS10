import { z } from "zod"
import { generalValidationFields } from "../../common/validation.js"

export const updateAccount=z.object({
    body:z.strictObject({
        username:generalValidationFields.username.optional(),
        phone:generalValidationFields.phone.optional()
    })
})

export const getUserById=z.object({
    params:z.strictObject({
        id:z.string().length(24,"invalid user id")
    })
})

export const restoreAccount=z.object({
    params:z.strictObject({
        id:z.string().length(24,"invalid user id")
    })
})

export const logout=z.object({
    body:z.strictObject({
        action:z.union([z.literal(0),z.literal(1)]).optional()
    })
})
