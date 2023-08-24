import express from "express";
import { config } from "dotenv";
import mongoose from "mongoose";
import colors from "colors";
config();

// import db
import conndb from "./configs/db";

// import routes
import authRouter from "./routers/authRouter";

const app = express();
app.use(express.json());

// config routes
app.use("/api/v1/auth", authRouter);

conndb();

const port: string | number = (process.env.PORT as string) || 5050;
mongoose.connection.once("open", (): void => {
    app.listen(port, () =>
        console.log(colors.bgGreen(`listen on ${port} port`))
    );
});
