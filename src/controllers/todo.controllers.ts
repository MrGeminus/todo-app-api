import { Request, Response } from "express";
import todoServices from "../services/todo.services";

const createTodoHandler = async (request: Request, response: Response) => {
    const result = await todoServices.createTodo(request.body)

    return response.status(201).json({
        ...result
    });
}

const getTodosHandler = async (request: Request, response: Response) => {
    const completed = request.query.completed && request.query.completed === "true" ? true : request.query.completed && request.query.completed === "false" ? false : undefined
    let result
    if (!completed) result = await todoServices.getAllTodos(request.params.userId)
    else result = await todoServices.getFilteredTodosByStatus(request.params.userId, completed)
    return response.status(200).json({
        ...result
    });
}

const updateTodosStatusHandler = async (request: Request, response: Response) => {
    const result = await todoServices.updateTodosStatus(request.params.todoId, request.params.userId, request.body.completed)

    return response.status(200).json({
        ...result
    });
}

const deleteTodoHandler = async (request: Request, response: Response) => {
    const result = await todoServices.deleteTodo(request.params.todoId, request.params.userId)

    return response.status(200).json({
        result
    });
}

export default { createTodoHandler, getTodosHandler, updateTodosStatusHandler, deleteTodoHandler }