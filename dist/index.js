"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = require("dotenv");
const mongoose_1 = __importDefault(require("mongoose"));
const colors_1 = __importDefault(require("colors"));
(0, dotenv_1.config)();
const db_1 = __importDefault(require("./configs/db"));
const authRouter_1 = __importDefault(require("./routers/authRouter"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use("/api/v1/auth", authRouter_1.default);
(0, db_1.default)();
const port = process.env.PORT || 5050;
mongoose_1.default.connection.once("open", () => {
    app.listen(port, () => console.log(colors_1.default.bgGreen(`listen on ${port} port`)));
});
