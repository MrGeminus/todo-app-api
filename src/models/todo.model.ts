import mongoose from "mongoose";

export interface ITodo extends mongoose.Document {
    userId: mongoose.Types.ObjectId,
    description: string,
    completed: boolean
}

const todoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: 'User',
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        required: true
    },
}, { timestamps: true, versionKey: false })

const TodoModel = mongoose.model<ITodo>("Todo", todoSchema)

export default TodoModel