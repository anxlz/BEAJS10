import mongoose from "mongoose";

const MessageSchema=new mongoose.Schema({
    content:{
        type:String,
        required:true,
        minLength:2,
        maxLength:500
    },
    senderId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        default:null
    },
    receiverId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    }
},{
    timestamps:true
})

export const MessageModel=mongoose.models.Message || mongoose.model("Message",MessageSchema)
