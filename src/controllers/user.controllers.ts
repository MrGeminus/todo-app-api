import { Request, Response } from 'express';
import asyncHandler from "express-async-handler";
import { IUser } from '../models/user.model';
import userServices from '../services/user.services';
import { CreateUserResources, loginUserResources, logoutUserResources, updateUserResources, deleteUserResources } from "../schema/user.schemas";
import { generateJWT } from "../utilities/tokens"

const createUserHandler = asyncHandler(async (request: Request<{}, {}, CreateUserResources["body"]>, response: Response): Promise<any> => {
    const result = await userServices.createUser(request.body.email, request.body.username, request.body.password)
    return response.status(201).json(
        result
    );
})

const loginUserHandler = asyncHandler(async (request: Request<{}, {}, loginUserResources["body"]>, response: Response): Promise<any> => {
    const result: IUser | null = await userServices.loginUser(request.body.email, request.body.password)
    if (!result) throw new Error('')
    const accessToken = generateJWT(
        result,
        `${process.env.ACCESS_TOKEN_SECRET}`,
        { expiresIn: process.env.ACCESS_TOKEN_EXPIRATION_DATE }
    )
    const refreshToken = generateJWT(
        result,
        `${process.env.REFRESH_TOKEN_SECRET}`,
        { expiresIn: process.env.REFRESH_TOKEN_EXPIRATION_DATE }
    )
    response
        .status(200)
        .cookie('jwt', refreshToken, {
            httpOnly: true,
            secure: true,
            sameSite: 'none',
            maxAge: 7 * 24 * 60 * 60 * 1000
        })
        .json({ accessToken });
})

const logoutUserHandler = asyncHandler(async (request: Request<logoutUserResources["params"]>, response: Response): Promise<any> => {
    const result = await userServices.logoutUser(request.params.userId)
    const cookies = request.cookies
    if (!cookies?.jwt) return response.sendStatus(204)
    return response
        .status(200)
        .clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        .json({ message: 'Cookie cleared' })
})

const updateUserHandler = asyncHandler(async (request: Request<updateUserResources["params"]>, response: Response): Promise<any> => {
    const result = await userServices.updateUser(request.params.userId)
    return response.status(200).json({
        result
    });
})

const deleteUserHandler = asyncHandler(async (request: Request<deleteUserResources["params"]>, response: Response): Promise<any> => {
    const cookies = request.cookies
    const result: string | null = await userServices.deleteUser(request.params.userId)
    return response
        .status(200)
        .clearCookie('jwt', { httpOnly: true, sameSite: 'none', secure: true })
        .json(result)
})

export default { createUserHandler, loginUserHandler, logoutUserHandler, updateUserHandler, deleteUserHandler }