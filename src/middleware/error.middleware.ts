import { Request, Response, NextFunction } from 'express';
import { logEvents } from '../utilities/logEvents';

const errorHandler = (error: any, request: Request, response: Response, next: NextFunction) => {
    const statusCode = response.statusCode ? response.statusCode : 500
    /*
    let message = `${statusCode}: ${error?.message}\t${request?.method}\t${request?.url}\t${request?.headers?.origin}`
    const filename = 'errorLog.txt'

    // Log every error in errorLog file

    logEvents(message, filename)
    */

    response
        .status(statusCode)
        .json({
            message: error.message
        })
}

export default errorHandler 