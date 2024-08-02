const express = require("express")
const app = express()
const mongoose = require("mongoose")
const dotEnv = require("dotenv")
const userRoute = require("./route/userRoute")
const cors = require("cors")
app.use(cors({origin:"*"}))

dotEnv.config()
app.use(express.json())
mongoose.connect(process.env.MONGODB_URI).then(()=>{
    console.log("mongodb connected sucssesfully")
})
.catch((error)=>{
    console.log("mongodb is not connected",error)
})
app.use("/user",userRoute)
const port = process.env.PORT || 5000
app.listen(port,()=>{
    console.log("server running",port);
})