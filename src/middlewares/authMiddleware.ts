import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const isLoginUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const authHeader = req.headers.authorization;
        if (authHeader == null) return res.status(400);

        const isVerified = await jwt.verify(
            authHeader,
            process.env.SECRET_JWT as string
        );
        console.log(isVerified);
    } catch (error) {
        if (error instanceof Error) {
            return res.status(500).json({ message: error.message });
        }
    }
};
