import {StatusCodes} from 'http-status-codes'

export class NotFoundError extends Error {
    constructor(message){
        super(message)
        this.name="Not Found Error"
        this.statusCode = StatusCodes.NOT_FOUND
    }
}

export class UnauthenticatedError extends Error {
    constructor(message){
        super(message)
        this.name ="Unauthenticated"
        this.statusCode = StatusCodes.UNAUTHORIZED   
    }
}

export class BadRequestError extends Error {
    constructor(message){
        super(message)
        this.name="Bad Request Error"
        this.statusCode = StatusCodes.BAD_REQUEST
    }
}

export class UnauthorizedError extends Error {
    constructor(message){
        super(message)
        this.name="Unauthorized Error"
        this.statusCode = StatusCodes.FORBIDDEN   }
}