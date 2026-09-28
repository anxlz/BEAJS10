import { z } from "zod"

const objectId=z.string().length(24,"invalid id")

export const sendMessage=z.object({
    params:z.strictObject({
        receiverId:objectId
    }),
    body:z.strictObject({
        content:z.string().min(2).max(500)
    })
})

export const deleteMessage=z.object({
    params:z.strictObject({
        messageId:objectId
    })
})
