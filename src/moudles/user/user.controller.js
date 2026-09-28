import { Router } from "express";
import { authentication, authorization } from "../../middleware/authentication/authentication.middleware.js";
import { deleteAccount, getUserById, logout, restoreAccount, updateAccount } from "./user.service.js";
import { sucessresponse } from "../../common/utlis/success.response.js";
import { rotateToken } from "../../common/security/index.js";
import { RoleEnum, TokenTypeEnum } from "../../common/enum/index.js";
import { validation } from "../../middleware/validation/validation.middleware.js";
import * as userValidation from "./user.validation.js";

const router=Router()


// Rotate Token
router.post("/rotate-token",authentication(TokenTypeEnum.REFRESH),async(req,res,next)=>{
    const data=await rotateToken({payload:req.payload,user:req.user,issuer:`${req.protocol}://${req.headers.host}`})
    return sucessresponse({res,data})
})


// Logout
router.post("/logout",authentication(),validation(userValidation.logout),async(req,res,next)=>{
    const data=await logout(req.payload,req.user,req.body)
    return sucessresponse({res,data})
})


// Update Account
router.patch("/",authentication(),authorization([RoleEnum.USER,RoleEnum.ADMIN]),validation(userValidation.updateAccount),async(req,res,next)=>{
    const data=await updateAccount(req.user._id,req.body)
    return sucessresponse({res,data})
})


// Soft Delete
router.delete("/",authentication(),async(req,res,next)=>{
    const data=await deleteAccount(req.user._id)
    return sucessresponse({res,data})
})


// Restore Account
router.patch("/restore/:id",authentication(),authorization([RoleEnum.ADMIN]),validation(userValidation.restoreAccount),async(req,res,next)=>{
    const data=await restoreAccount(req.params.id)
    return sucessresponse({res,data})
})


// Get User
router.get("/:id",validation(userValidation.getUserById),async(req,res,next)=>{
    const data=await getUserById(req.params.id)
    return sucessresponse({res,data})
})


export default router
