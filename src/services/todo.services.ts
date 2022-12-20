import TodoModel, { ITodo } from "../models/todo.model"

const createTodo = async (todo: ITodo): Promise<ITodo> => {
    const newTodo: ITodo = await TodoModel.create({ todo })
    return newTodo
}

const getAllTodos = async (userId: string): Promise<ITodo[]> => {
    const todos: ITodo[] = await TodoModel.where("userId").equals(userId)
    return todos
}

const getFilteredTodosByStatus = async (userId: string, completed: boolean): Promise<ITodo[]> => {
    const todos: ITodo[] = await TodoModel.where("userId").equals(userId).where("completed").equals(completed)
    return todos
}

const updateTodosStatus = async (todoId: string, userId: string, completed: boolean): Promise<ITodo | null> => {
    const todo: ITodo | null = await TodoModel.findOne({ _id: todoId, userId })
    if (!todo) return null
    todo.completed = completed
    await todo.save()
    return todo
}

const deleteTodo = async (todoId: string, userId: string): Promise<string> => {
    await TodoModel.deleteOne({ _id: todoId, userId })
    return todoId
}

export default { createTodo, getAllTodos, getFilteredTodosByStatus, updateTodosStatus, deleteTodo }