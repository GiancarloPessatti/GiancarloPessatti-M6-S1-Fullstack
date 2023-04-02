import { Router } from "express";
import { loginUserController } from "../Controllers/login.controller";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import loginUserShape from "../Serials/loginUser.serial";

const loginRouter = Router();

loginRouter.post(
  `/login`,
  validateSchemaMiddleware(loginUserShape),
  loginUserController
);

export default loginRouter;
