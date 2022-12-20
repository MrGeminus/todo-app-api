import { Request, Response, NextFunction } from "express";
import { verifyJWT } from "../utilities/tokens"

const authorization = (request: Request, response: Response, next: NextFunction) => {
    //const cookies = request.cookies
    /*
        if (!cookies?.jwt) {
            response.status(401)
            throw new Error('You are not authorized to access this route!')
        }
    
        const refreshToken: string = cookies.jwt
        verifyJWT(refreshToken, `${process.env.REFRESH_TOKEN_SECRET}`)
      */
    next();
}

export default authorization