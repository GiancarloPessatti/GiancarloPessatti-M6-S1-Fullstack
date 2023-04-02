import "reflect-metadata";
import "express-async-errors";
import "dotenv/config";
import express from "express";
import userRouter from "./Routes/users.route";
import loginRouter from "./Routes/login.route";
import { errorHandler } from "./Errors/error";
import categorieRouter from "./Routes/categories.route";
import propertiesRouter from "./Routes/properties.route";
import schedulesRouter from "./Routes/schedules.route";

const app = express();
app.use(express.json());
app.use("", userRouter);
app.use("", loginRouter);
app.use("", categorieRouter);
app.use("", propertiesRouter);
app.use("", schedulesRouter);

app.use(errorHandler);

export default app;
