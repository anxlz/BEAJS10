import crypto from "node:crypto"
import dns from "dns";



dns.setServers(["8.8.8.8", "1.1.1.1"]);
import express from "express"
import { globalerror } from "./middleware/erroe.message.js"
import { authcontroller,usercontroller,messagecontroller } from "./moudles/index.js"
import { PORT } from "./config.js"
import { startserver } from "./DB/database.connection.js"
const app=express()
startserver(app,PORT)
app.use(express.json())
app.all("/",(req,res)=>{
    res.status(200).send({message:"welcome"})
})


app.use("/auth",authcontroller)
app.use("/user",usercontroller)
app.use("/message",messagecontroller)






app.all("{/*dummy}",(req,res)=>{
    res.status(404).send({message:"invalid route"})
})
app.use(globalerror)

