import { Router, Request, Response } from "express";
import UserController from "../controllers/authController";

const router = Router();

router.post("/register", UserController.register);
router.post("/login", UserController.login);

export default router;
