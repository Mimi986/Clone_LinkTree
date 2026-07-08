import jwt from "jsonwebtoken"

const verifyToken = (req,res,next) => {
    const token = req.cookie.token 
    //if(!token)
}