import { Router } from 'express';
import authorization from "../middleware/authorization.middleware"
import validateResource from "../middleware/validation.middleware"
import userSchemas from "../schema/user.schemas";
import userControllers from "../controllers/user.controllers"

const userRoutes = Router();

userRoutes.post('/login', validateResource(userSchemas.loginUserSchema), userControllers.loginUserHandler);
userRoutes.get('/:userId', authorization, validateResource(userSchemas.logoutUserSchema), userControllers.logoutUserHandler)
userRoutes.post('/registration', validateResource(userSchemas.createUserSchema), userControllers.createUserHandler);
userRoutes.patch('/:userId', authorization, validateResource(userSchemas.updateUserSchema), userControllers.updateUserHandler);
userRoutes.delete('/:userId', authorization, validateResource(userSchemas.deleteUserSchema), userControllers.deleteUserHandler);

// export user routes

export default userRoutes;