"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
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
}, {
    timestamps: true,
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
