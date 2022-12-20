import { Request, Response, NextFunction } from 'express';
import { logEvents } from '../utilities/logEvents';

const logger = (request: Request, response: Response, next: NextFunction) => {
    if (process.env.NODE_ENVIRONMENT === 'production') {
        const message = `${request.method}\t${request.headers.origin}\t${request.url}\t`
        const filename = 'requestLog.txt'
        logEvents(message, filename)
    }
    next();
}

export default logger