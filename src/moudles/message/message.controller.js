import { Router } from "express";
import { authentication } from "../../middleware/authentication/authentication.middleware.js";
import { deleteMessage, getMessages, sendMessage } from "./message.sevice.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import * as messageValidation from "./message.validation.js";

const router=Router()


// Send Message
router.post("/:receiverId",validation(messageValidation.sendMessage),async(req,res,next)=>{
    const data=await sendMessage(req.params.receiverId,req.body.content)
    return sucessresponse({res,data,status:201})
})


// Get Messages
router.get("/",authentication(),async(req,res,next)=>{
    const data=await getMessages(req.user._id)
    return sucessresponse({res,data})
})


// Delete Message
router.delete("/:messageId",authentication(),validation(messageValidation.deleteMessage),async(req,res,next)=>{
    const data=await deleteMessage(req.user._id,req.params.messageId)
    return sucessresponse({res,data})
})


export default router
