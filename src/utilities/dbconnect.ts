import mongoose from "mongoose";

export const dbconnect = async () => {
    mongoose.set('strictQuery', false)
    try {
        await mongoose.connect(`${process.env.DB_URI}`)
    }
    catch (error) {
        process.exit(1)
    }
}

export const dbdisconnect = async () => {
    try {
        await mongoose.disconnect()
        process.exit(2)
    }
    catch (error) {
        process.exit(1)
    }
};