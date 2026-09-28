
import { conflictException, notFoundException, unauthorizedException } from "../../common/execption/index.js"
import { createOne, findOne } from "../../common/repository/index.js"
import { decryption, encryption } from "../../common/security/encryption.security.js"
import { compare, createLoginCredentials, hash, verifyGoogleToken } from "../../common/security/index.js"
import { ProviderEnum } from "../../common/enum/index.js"
import { UserModel } from "../../DB/models/index.js"

export const signup=async({email,password,username,phone})=>{
    const duplicateEmail=await findOne({
        model:UserModel,
        filter:{email},
        options:{
            select:"email"
        }
    })
    if(duplicateEmail){
        conflictException("email is already exists")
    }
    const user=await createOne({
        model:UserModel,
        
        data:{
            email,
            password:await hash(password),
            username,
            phone:await encryption(phone)
        }
    })
    return user
}

export const login=async({email,password},issuer)=>{
    const account=await findOne({
        model:UserModel,
        filter:{email},
        options:{
            select:"+password"
        },
    })
    if(!account){
        notFoundException("this email is not found ")
    }
    if(account.provider!==ProviderEnum.SYSTEM){
        unauthorizedException("this email is registered with google, please login with google")
    }
    const match =await compare(password,account.password)
    if(!match){
        unauthorizedException("invalid login")
    }
    return createLoginCredentials({user:account,issuer})
}


// Login/Signup With Google
export const loginWithGmail=async({idToken},issuer)=>{
    const payload=await verifyGoogleToken(idToken)
    let account=await findOne({
        model:UserModel,
        filter:{
            email:payload.email
        }
    })
    if(!account){
        account=await createOne({
            model:UserModel,
            data:{
                email:payload.email,
                username:payload.name || payload.email,
                provider:ProviderEnum.GOOGLE,
                confirmEmail:new Date(),
                image:payload.picture
            }
        })
    }
    return createLoginCredentials({user:account,issuer})
}


export const getprofileByID=async(id)=>{
    const user=await findOne({
        model:UserModel,
        filter:{
            _id:id
        }
    })
    if(!user){
        notFoundException("not found")
    }
    if(user.phone){
        user.phone=await decryption(user.phone)
    }
    return user
}
