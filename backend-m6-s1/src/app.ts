import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express from "express";
import userRouter from "./Routes/users.route";
import loginRouter from "./Routes/login.route";
import { errorHandler } from "./Errors/error";
import contactRouter from "./Routes/contact.route";
import cors from "cors";

const app = express();
app.use(express.json());
app.use(cors());
app.use("", userRouter);
app.use("", loginRouter);
app.use("", contactRouter);

app.use(errorHandler);

export default app;
