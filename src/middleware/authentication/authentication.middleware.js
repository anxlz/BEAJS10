import { forbiddenException, unauthorizedException } from "../../common/execption/index.js"
import { basicAuth, decodeToken } from "../../common/security/index.js"
import { TokenTypeEnum } from "../../common/enum/index.js"

// Check Login
export const authentication=(tokenType=TokenTypeEnum.ACCESS)=>{
    return async(req,res,next)=>{
        const {authorization}=req.headers
        if(!authorization){
            unauthorizedException("Authorization header is required")
        }

        const[key,credential]=authorization.split(" ") || []

        switch(key){
            case "Basic":
                const[email,password]=Buffer.from(credential,"base64").toString().split(":")
                req.user=await basicAuth({email,password})
                break

            case "Bearer":
                const{user,payload}=await decodeToken({token:credential,tokenType})
                req.user=user
                req.payload=payload
                break

            default:
                unauthorizedException("Invalid authorization format")
        }

        next()
    }
}

// Check Role
export const authorization=(accessRoles=[])=>{
    return async(req,res,next)=>{
        if(!accessRoles.includes(req.user.role)){
            forbiddenException("Forbidden Account")
        }
        next()
    }
}
