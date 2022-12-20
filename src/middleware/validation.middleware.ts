import { Request, Response, NextFunction } from 'express';
import { AnyZodObject } from "zod";

const validateResource = (schema: AnyZodObject) => (request: Request, response: Response, next: NextFunction) => {
    try {
        schema.parse({
            body: request.body,
            query: request.query,
            params: request.params,
        });
        next();
    }
    catch (error: any) {
        console.log(error)
        response.status(400)
        throw new Error(error.errors)
    }
}

export default validateResource