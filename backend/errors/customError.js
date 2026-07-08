import {StatusCodes} from 'http-status-codes'

export class NotFoundError extends Error {
    constructor(message){
        super(message)
        this.name="Not Found Error"
        this.status = StatusCodes.NOT_FOUND
    }
}

export class UnauthenticatedError extends Error {
    constructor(message){
        super(message)
        this.name ="Unauthenticated"
        this.status=StatusCodes.UNAUTHENTICATED
    }
}

export class BadRequestError extends Error {
    constructor(message){
        super(message)
        this.name="Bad Request Error"
        this.status=StatusCodes.BAD_REQUEST_ERROR
    }
}

export class UnauthorizedError extends Error {
    constructor(message){
        super(message)
        this.name="Unauthorized Error"
        this.status=StatusCodes.UNAUTHORIZED
    }
}