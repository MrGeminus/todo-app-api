import { Request, Response } from 'express';

export const notFoundHandler = (request: Request, response: Response) => {
    response.status(404)
    throw new Error('404 Not Found')
}