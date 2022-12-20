import mongoose from "mongoose";
import bcrypt from "bcrypt";

export interface IUser extends mongoose.Document {
    username: string;
    email: string;
    password: string;
    comparePasswords(candidatePassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true
    },
}, { timestamps: true, versionKey: false })

userSchema.pre("save", async function (next): Promise<void> {
    if (!this.isModified("password")) return next();
    const salt = await bcrypt.genSalt(Number(process.env.SALT_ROUNDS));
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    return next();
})

userSchema.methods.comparePasswords = async function (passwordValue: string): Promise<boolean> {
    return bcrypt.compare(passwordValue, this.password).catch(() => false);
}

const UserModel = mongoose.model<IUser>("User", userSchema)

export default UserModel