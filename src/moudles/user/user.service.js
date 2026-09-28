import { notFoundException } from "../../common/execption/index.js"
import { findById, findByIdAndUpdate } from "../../common/repository/index.js"
import { createRevokeToken, userBaseRevokeTokenKey } from "../../common/security/index.js"
import { del, keys } from "../../common/services/index.js"
import { LogoutEnum } from "../../common/enum/index.js"
import { UserModel } from "../../DB/models/index.js"

// Update Account
export const updateAccount=async(id,body)=>{
    const user=await findByIdAndUpdate({
        model:UserModel,
        id,
        update:body
    })
    if(!user){
        notFoundException("user not found")
    }
    return user
}

// Soft Delete
export const deleteAccount=async(id)=>{
    const user=await findByIdAndUpdate({
        model:UserModel,
        id,
        update:{
            deletedAt:new Date()
        }
    })
    if(!user){
        notFoundException("user not found")
    }
    return user
}

// Restore Account
export const restoreAccount=async(id)=>{
    const user=await findByIdAndUpdate({
        model:UserModel,
        id,
        update:{
            deletedAt:null
        }
    })
    if(!user){
        notFoundException("user not found")
    }
    return user
}

// Get User
export const getUserById=async(id)=>{
    const user=await findById({
        model:UserModel,
        id,
        options:{
            select:"firstName LastName username image gender"
        }
    })
    if(!user || user.deletedAt){
        notFoundException("user not found")
    }
    return user
}

// Logout
export const logout=async(payload,user,{action=LogoutEnum.DEVICE}={})=>{
    switch(action){
        case LogoutEnum.ALL:
            user.changeCredentialsTime=new Date()
            await user.save()
            await del({key:await keys({prefix:userBaseRevokeTokenKey({userId:payload.sub})})})
            break
        default:
            await createRevokeToken({payload})
            break
    }
    return true
}
