import { boolean, object, string, TypeOf } from "zod";

const createTodoSchema = object({
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })
})

export type createTodoResources = TypeOf<typeof createTodoSchema>

const getTodosSchema = object({
    query: object({
        completed: string({
            invalid_type_error: "Status must be a string!"
        }).optional()
    }),
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })

})

export type getTodosResources = TypeOf<typeof getTodosSchema>

const updateTodoSchema = object({
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })

})

export type updateTodoResources = TypeOf<typeof updateTodoSchema>

const deleteTodoSchema = object({
    params: object({
        userId: string({
            required_error: "UserId is a required!",
            invalid_type_error: "UserId must be a string!"
        })
    })

})

export type deleteTodoResources = TypeOf<typeof deleteTodoSchema>

export default { createTodoSchema, getTodosSchema, updateTodoSchema, deleteTodoSchema }