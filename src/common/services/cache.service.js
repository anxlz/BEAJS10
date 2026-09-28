import { redisClient } from "../../DB/redis.connection.js"

// Set Key
export const set=async({key,value,expiresIn})=>{
    if(expiresIn){
        return await redisClient.set(key,String(value),{EX:expiresIn})
    }
    return await redisClient.set(key,String(value))
}

// Get Key
export const get=async({key})=>{
    return await redisClient.get(key)
}

// Key Exists
export const exist=async({key})=>{
    return (await redisClient.exists(key))===1
}

// Keys By Prefix
export const keys=async({prefix})=>{
    return await redisClient.keys(`${prefix}*`)
}

// Delete Keys
export const del=async({key})=>{
    if(!key || (Array.isArray(key) && key.length===0)){
        return 0
    }
    return await redisClient.del(key)
}
