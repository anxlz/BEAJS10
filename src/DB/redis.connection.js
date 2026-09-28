import { createClient } from "redis"
import { REDIS_URL } from "../config.js"

export const redisClient=createClient({
    url:REDIS_URL
})

// Connect Redis
export const connectRedis=async()=>{
    redisClient.on("error",(err)=>console.log("Redis Client Error",err))
    await redisClient.connect()
    console.log("Redis connection stablish successfully")
}
