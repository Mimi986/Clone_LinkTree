import { StatusCodes } from "http-status-codes";

const errorHandlerMiddleware = (err,req,res,next) => {
    console.log(err)
    const statusCode = err.StatusCodes || StatusCodes.INTERNAL_SERVER_ERROR    //pas sure pour le premier statusCodes
    const msg = err.message || "Something went wrong, try again"
    res.status(statusCode).json({msg})
}

export default errorHandlerMiddleware