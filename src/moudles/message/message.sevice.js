import { notFoundException } from "../../common/execption/index.js"
import { createOne, deleteOne, find, findById } from "../../common/repository/index.js"
import { MessageModel, UserModel } from "../../DB/models/index.js"

// Send Message
export const sendMessage=async(receiverId,content)=>{
    const receiver=await findById({
        model:UserModel,
        id:receiverId
    })
    if(!receiver || receiver.deletedAt){
        notFoundException("user not found")
    }
    const message=await createOne({
        model:MessageModel,
        data:{
            content,
            receiverId
        }
    })
    return message
}

// Get Messages
export const getMessages=async(userId)=>{
    const messages=await find({
        model:MessageModel,
        filter:{
            receiverId:userId
        },
        options:{
            sort:{createdAt:-1}
        }
    })
    return messages
}

// Delete Message
export const deleteMessage=async(userId,messageId)=>{
    const message=await findById({
        model:MessageModel,
        id:messageId
    })
    if(!message || message.receiverId.toString()!==userId.toString()){
        notFoundException("message not found")
    }
    await deleteOne({
        model:MessageModel,
        filter:{_id:messageId}
    })
    return message
}
