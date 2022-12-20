import express, { Application } from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import cors from "cors";
import cookieParser from "cookie-parser";
import corsOptions from "./config/corsOptions";
import { dbconnect, dbdisconnect } from "./utilities/dbconnect";
import router from './routes/index.routes';
import logger from "./middleware/logger.middleware"
import errorHandler from "./middleware/error.middleware"

dotenv.config()

dbconnect()

// Create express app

const app: Application = express();

// Initialize middleware to be used on the app level

app.use(logger)
app.use(cors(corsOptions))
app.use(cookieParser())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Start listening for requests on the specified port
mongoose.connection.once('open', () => {
    app.listen(process.env.PORT, async () => {

        // Register available routes

        app.use(router);

        app.use(errorHandler);
    })
})

