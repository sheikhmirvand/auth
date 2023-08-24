import User from "../models/userModel";
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class UserController {
    async register(req: Request, res: Response) {
        const { name, email, password, phoneNumber } = req.body;

        try {
            // check for empty fields
            if (!name || !email || !password || !phoneNumber) {
                return res
                    .status(400)
                    .json({ message: "all field is required" });
            }
            // check for exists user
            const existsUser = await User.findOne({ email }, { phoneNumber });
            if (existsUser) {
                return res.status(400).json({
                    message: "please enter new email or new phone number",
                });
            }

            // hashed password
            const salt = await bcrypt.genSalt(12);
            const hashedPassword = await bcrypt.hash(password, salt);

            // genrate otp
            const otp = Math.floor(Math.random() * 1000000);

            // generate new user
            const user = await new User({
                name,
                email,
                password: hashedPassword,
                phoneNumber,
                otp,
            }).save();

            // generate token
            const token = jwt.sign(
                { id: user._id },
                process.env.SECRET_JWT as string,
                { expiresIn: "7d" }
            );

            res.json({ user, token });
        } catch (error) {
            if (error instanceof Error) {
                res.json({ message: error.message });
            }
        }
    }

    async login(req: Request, res: Response) {
        const { email, password, phoneNumber } = req.body;

        try {
            let user = await User.findOne({
                $or: [{ email }, { phoneNumber }],
            });
            if (!user)
                return res
                    .status(400)
                    .json({ message: "please register first" });

            if (
                user.role === "admin" &&
                user.otp !== null &&
                user.secretToken !== "a1234" &&
                user.isVerified !== true
            ) {
                user = await User.findByIdAndUpdate(user._id, {
                    otp: null,
                    secretToken: "a1234",
                    isVerified: true,
                });
            }

            res.json(user);
        } catch (error) {
            if (error instanceof Error) {
                res.status(500).json({ message: error.message });
            }
        }
    }
}

export default new UserController();
