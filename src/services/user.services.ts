import UserModel, { IUser } from "../models/user.model"
import TodoModel, { ITodo } from "../models/todo.model"
import { formatErrors } from "../utilities/formatErrors"

const createUser = async (email: string, username: string, password: string): Promise<IUser | null> => {
    const userDuplicate: IUser | null = await UserModel.findOne({ email })
    if (userDuplicate) return null//formatErrors("This email is already in use!", 400, "email")
    const newUser = await UserModel.create({ email, username, password })
    if (!newUser) return null //formatErrors("Something went wrong!")
    return newUser
}

const loginUser = async (email: string, password: string): Promise<IUser | null> => {
    const user: IUser | null = await UserModel.findOne({ email })
    if (!user) return null //{ status: 400, field: "email", message: "There is no user with this email!", success: false }
    const isValid: boolean = await user.comparePasswords(password)
    if (!isValid) return null //{ status: 400, field: "password", message: "The entered password is wrong!", success: false }
    return user
}

const logoutUser = async (userId: string): Promise<string> => {
    const user: IUser | null = await UserModel.findOne({ userId })
    return userId
}

const updateUser = async (userId: string): Promise<IUser | null> => {
    const user: IUser | null = await UserModel.findOne({ userId })
    if (!user) return null
    return user
}

const deleteUser = async (userId: string): Promise<string | null> => {
    const user: IUser | null = await UserModel.findOne({ userId })
    if (!user) return null
    await TodoModel.deleteMany({ userId })
    await UserModel.deleteOne({ userId })
    return userId
}

export default { createUser, loginUser, logoutUser, updateUser, deleteUser }