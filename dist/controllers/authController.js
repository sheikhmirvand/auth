"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const userModel_1 = __importDefault(require("../models/userModel"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class UserController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password, phoneNumber } = req.body;
            try {
                if (!name || !email || !password || !phoneNumber) {
                    return res
                        .status(400)
                        .json({ message: "all field is required" });
                }
                const existsUser = yield userModel_1.default.findOne({ email }, { phoneNumber });
                if (existsUser) {
                    return res.status(400).json({
                        message: "please enter new email or new phone number",
                    });
                }
                const salt = yield bcrypt_1.default.genSalt(12);
                const hashedPassword = yield bcrypt_1.default.hash(password, salt);
                const otp = Math.floor(Math.random() * 1000000);
                const user = yield new userModel_1.default({
                    name,
                    email,
                    password: hashedPassword,
                    phoneNumber,
                    otp,
                }).save();
                const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.SECRET_JWT, { expiresIn: "7d" });
                res.json({ user, token });
            }
            catch (error) {
                if (error instanceof Error) {
                    res.json({ message: error.message });
                }
            }
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password, phoneNumber } = req.body;
            try {
                let user = yield userModel_1.default.findOne({
                    $or: [{ email }, { phoneNumber }],
                });
                if (!user)
                    return res
                        .status(400)
                        .json({ message: "please register first" });
                if (user.role === "admin" &&
                    user.otp !== null &&
                    user.secretToken !== "a1234" &&
                    user.isVerified !== true) {
                    user = yield userModel_1.default.findByIdAndUpdate(user._id, {
                        otp: null,
                        secretToken: "a1234",
                        isVerified: true,
                    });
                }
                res.json(user);
            }
            catch (error) {
                if (error instanceof Error) {
                    res.status(500).json({ message: error.message });
                }
            }
        });
    }
}
exports.default = new UserController();
