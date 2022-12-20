import { Router } from 'express';
import userRoutes from './user.routes'
import todoRoutes from './todo.routes'
import { notFoundHandler } from '../controllers/notfound.controllers'

const router = Router();

router.use("/api/v2", userRoutes);
router.use("/api/v2/", todoRoutes);
router.all("*", notFoundHandler);

// export all routes

export default router