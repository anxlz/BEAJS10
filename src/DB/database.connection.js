import mongoose from "mongoose";
import { UserModel } from "./models/user.model.js";
import { DB_URI } from "../config.js";
import { connectRedis } from "./redis.connection.js";
export const startserver=async(app,port)=>{
    try{
        await mongoose.connect(DB_URI,{serverSelectionTimeoutMS:30000})
        await UserModel.syncIndexes()
        await connectRedis()
        console.log("DB is ready")
        app.listen(port,()=>{
            console.log(`server is ready running on port ${port}`)
        })
        
    }catch(error){
        console.log(`failed to connect error->>> ${error}`)
    }
}