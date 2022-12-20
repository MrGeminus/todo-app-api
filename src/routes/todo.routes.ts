import { Router } from 'express';
import authorization from "../middleware/authorization.middleware"
import validateResource from "../middleware/validation.middleware"
import todoSchemas from '../schema/todo.schemas';
import todoControllers from "../controllers/todo.controllers"

const todoRoutes = Router();

todoRoutes.use(authorization)

todoRoutes.route('/:userId/todos')
    .post(validateResource(todoSchemas.createTodoSchema), todoControllers.createTodoHandler) // POST a new todo
    .get(validateResource(todoSchemas.getTodosSchema), todoControllers.getTodosHandler) // GET all todos
todoRoutes.route('/:userId/todos/:todoId')
    .patch(validateResource(todoSchemas.updateTodoSchema), todoControllers.updateTodosStatusHandler) // PATCH a todo
    .delete(validateResource(todoSchemas.deleteTodoSchema), todoControllers.deleteTodoHandler); // DELETE a todo

// Export todo routes

export default todoRoutes;