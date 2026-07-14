import express from "express"
import dotenv from "dotenv"
import { connectDB } from "./db/connectDB.js"
import adminRouter from "./routes/adminRouter.js"
import authRouter from "./routes/authRouter.js"
import cookieParser from "cookie-parser"
import errorHandlerMiddleware from './middlewares/errorHandlerMiddleware.js'
import { authenticateUser } from "./middlewares/authMiddleware.js"
import cors from 'cors'
import publicRouter from "./routes/publicRouter.js"

dotenv.config()
const app = express()



app.use(cors({origin:"http://localhost:5173",credentials:true}))
app.use(express.json())
app.use(cookieParser())
app.use("/api/auth",authRouter)
app.use("/api/admin",authenticateUser,adminRouter)
app.use("/api/public",authenticateUser,publicRouter)

app.use(errorHandlerMiddleware)

const port = process.env.PORT || 3000
app.listen(port,()=>{
    connectDB()
    console.log("server is running on port 3000")
})