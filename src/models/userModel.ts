import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: [true, "email is required"],
            trim: true,
            unique: true,
        },
        password: {
            type: String,
            required: [true, "password is required"],
            trim: true,
        },
        phoneNumber: {
            type: String,
            required: [true, "please enter your phone number"],
        },
        secretToken: {
            type: String,
            default: "",
        },
        isVerified: {
            type: Boolean,
            default: false,
        },
        otp: {
            type: Number,
        },
        role: {
            type: String,
            default: "student",
        },
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", userSchema);
export default User;
