import jwt from "jsonwebtoken";
import { randomUUID } from "node:crypto";
import {
    ACCESS_ADMIN_TOKEN_SIGNATURE,
    ACCESS_USER_TOKEN_SIGNATURE,
    JWT_EXPIRES_IN,
    REFRESH_ADMIN_TOKEN_SIGNATURE,
    REFRESH_EXPIRES_IN,
    REFRESH_USER_TOKEN_SIGNATURE
} from "../../config.js";
import { RoleEnum, TokenTypeEnum } from "../enum/index.js";
import { badRequestException, notFoundException, unauthorizedException } from "../execption/index.js";
import { findById } from "../repository/index.js";
import { UserModel } from "../../DB/models/index.js";
import { compare } from "./hash.security.js";
import { exist, set } from "../services/index.js";

// Pick Signature By Role
const getSignature=(tokenType,role=RoleEnum.USER)=>{
    if(tokenType===TokenTypeEnum.REFRESH){
        return role===RoleEnum.ADMIN ? REFRESH_ADMIN_TOKEN_SIGNATURE : REFRESH_USER_TOKEN_SIGNATURE
    }
    return role===RoleEnum.ADMIN ? ACCESS_ADMIN_TOKEN_SIGNATURE : ACCESS_USER_TOKEN_SIGNATURE
}

// Pick Expiry
const getExpiresIn=(tokenType)=>{
    return tokenType===TokenTypeEnum.REFRESH ? REFRESH_EXPIRES_IN : JWT_EXPIRES_IN
}

// Base Revoke Key
export const userBaseRevokeTokenKey=({userId})=>{
    return `User::${userId.toString()}::Revoke_Token`
}

// Revoke Key
export const userRevokeTokenKey=({userId,jti})=>{
    return `${userBaseRevokeTokenKey({userId})}::${jti}`
}

// Generate Token
export const generateToken=({payload,tokenType=TokenTypeEnum.ACCESS,role=RoleEnum.USER,issuer})=>{
    return jwt.sign(
        payload,
        getSignature(tokenType,role),
        {
            expiresIn:getExpiresIn(tokenType),
            jwtid:randomUUID(),
            issuer
        }
    )
}

// Verify Token
// Tries the USER signature first, falls back to the ADMIN signature
export const verifyToken=(token,tokenType=TokenTypeEnum.ACCESS)=>{
    try{
        return jwt.verify(token,getSignature(tokenType,RoleEnum.USER))
    }catch(error){
        return jwt.verify(token,getSignature(tokenType,RoleEnum.ADMIN))
    }
}

// Decode Token
export const decodeToken=async({token,tokenType=TokenTypeEnum.ACCESS})=>{
    const payload=verifyToken(token,tokenType)

    if(!payload?.sub){
        badRequestException("missing token payload")
    }

    if(await exist({key:userRevokeTokenKey({userId:payload.sub,jti:payload.jti})})){
        unauthorizedException("expired login credentials")
    }

    const user=await findById({
        model:UserModel,
        id:payload.sub
    })
    if(!user || user.deletedAt){
        notFoundException("invalid user account")
    }

    if(user.changeCredentialsTime?.getTime()>payload.iat*1000){
        unauthorizedException("expired login credentials")
    }

    return {user,payload}
}

// Basic Auth
export const basicAuth=async({email,password})=>{
    const account=await UserModel.findOne({email}).select("+password")
    if(!account){
        unauthorizedException("Unauthorized Account")
    }
    const match=await compare(password,account.password)
    if(!match){
        unauthorizedException("Unauthorized Account")
    }
    return account
}

// Issue Access/Refresh Pair
export const createLoginCredentials=({user,issuer})=>{
    const access_token=generateToken({
        payload:{sub:user._id},
        tokenType:TokenTypeEnum.ACCESS,
        role:user.role,
        issuer
    })
    const refresh_token=generateToken({
        payload:{sub:user._id},
        tokenType:TokenTypeEnum.REFRESH,
        role:user.role,
        issuer
    })
    return {access_token,refresh_token}
}

// Revoke A Single Token
export const createRevokeToken=async({payload})=>{
    const remaining=payload.exp-Math.floor(Date.now()/1000)
    await set({
        key:userRevokeTokenKey({userId:payload.sub,jti:payload.jti}),
        value:true,
        expiresIn:remaining>0 ? remaining : 60
    })
    return true
}

// Rotate Token
export const rotateToken=async({payload,user,issuer})=>{
    const data=createLoginCredentials({user,issuer})
    await createRevokeToken({payload})
    return data
}
