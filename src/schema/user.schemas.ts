import { object, string, TypeOf } from "zod";

const createUserSchema = object({
    body: object({
        username: string({
            required_error: "Username is a required field!",
            invalid_type_error: "Username must be a string!"
        })
            .min(1, { message: "Username must be at least one character long!" })
            .max(70, { message: "Username must be less than 70 characters!" })
            .trim(),
        email: string({
            required_error: "Email is a required field!",
            invalid_type_error: "Email must be a string!"
        })
            .email({ message: "Invalid email address!" })
            .min(5, { message: "Email must be at least five characters long!" })
            .max(70, { message: "Email must be less than 70 characters long!" })
            .trim(),
        password: string({
            required_error: "Password is a required field!",
            invalid_type_error: "Password must be a string!"
        })
            .min(8, { message: "Password must be at least eight characters long!" })
            .max(70, { message: "Password must be less than 70 characters long!" })
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,70}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!" })
            .trim(),
        passwordConfirmation: string({
            required_error: "Confirm password is a required field!",
            invalid_type_error: "Confirmed password must be a string!"
        })
            .max(70, { message: "Confirm password must be less than 70 characters!" })
            .trim()
    })
        .refine((resources) => resources.password === resources.passwordConfirmation, {
            message: "Passwords do not match",
            path: ["passwordConfirmation"],
        }),
})

export type CreateUserResources = Omit<TypeOf<typeof createUserSchema>, "body.passwordConfirmation">

const loginUserSchema = object({
    body: object({
        email: string({
            required_error: "Email is a required field!",
            invalid_type_error: "Email must be a string!"
        })
            .email({ message: "Invalid email address!" })
            .min(5, { message: "Email must be at least five characters long!" })
            .max(70, { message: "Email must be less than 70 characters long!" })
            .trim(),
        password: string({
            required_error: "Password is a required field!",
            invalid_type_error: "Password must be a string!"
        })
            .min(8, { message: "Password must be at least eight characters long!" })
            .max(70, { message: "Password must be less than 70 characters long!" })
            .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*]).{8,70}$/, { message: "Password must contain at least one uppercase letter, one lowercase letter, one number, and one special character!" })
            .trim(),
    })
})

export type loginUserResources = TypeOf<typeof loginUserSchema>

const logoutUserSchema = object({
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })
})

export type logoutUserResources = TypeOf<typeof logoutUserSchema>

const updateUserSchema = object({
    body: object({}),
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })
})

export type updateUserResources = TypeOf<typeof updateUserSchema>

const deleteUserSchema = object({
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })
})

export type deleteUserResources = TypeOf<typeof deleteUserSchema>

export default { createUserSchema, loginUserSchema, logoutUserSchema, updateUserSchema, deleteUserSchema }