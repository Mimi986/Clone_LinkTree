import { UnauthenticatedError } from "../errors/customError.js";
import { verifyJWT } from "../utils/generateTokenAndSetCookie.js";

export const authenticateUser= async (req,res,next)=> {
    const {token} = req.cookies
    if(!token) throw new UnauthenticatedError("authentication invalid")
        try {
            const {userId} = verifyJWT(token)
            req.user = {userId}
            next()
        } catch (error) {
            throw new UnauthenticatedError("authentication invalid")
        }
}