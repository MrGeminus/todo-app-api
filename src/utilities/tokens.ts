import jwt from "jsonwebtoken";

export const generateJWT = (payload: Object, secret: string, options?: jwt.SignOptions | undefined) => {
    return jwt.sign(payload, secret, options)
}

export const verifyJWT = (token: string, secret: string) => {
    try {
        const decoded = jwt.verify(token, secret)
        return {
            valid: true,
            expired: false,
            decoded
        }
    }
    catch (error: any) {
        return {
            valid: false,
            expired: error.message === "jwt expired",
            decoded: null
        }
    }
}