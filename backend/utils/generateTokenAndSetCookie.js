import jwt from "jsonwebtoken"
import dotenv from "dotenv" 

export const generateTokenAndSetCookie = (res,userId) => {
    const token = jwt.sign({userId},process.env.JWT_SECRET,{expiresIn:"3d"})

    res.cookie("token",token,{
        httpOnly:true,
        maxAge:3*24*60*3600
    })
    return token 
}

export const verifyJWT = (token) => {
    const decoded = jwt.verify(token,process.env.JWT_SECRET)
    return decoded 
}