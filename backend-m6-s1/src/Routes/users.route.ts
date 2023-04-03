import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  updateUserController,
} from "../Controllers/user.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import createUserShape from "../Serials/createUser.serial";
import patchUserShape from "../Serials/patchUser.serial";

const userRouter = Router();

userRouter.get(`/users`, ensureAuthMiddleware, listUserController);
userRouter.post(
  `/api/users`,
  validateSchemaMiddleware(createUserShape),
  createUserController
);
userRouter.patch(
  `/users/:id`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(patchUserShape),
  updateUserController
);
userRouter.delete(`/users/:id`, ensureAuthMiddleware, deleteUserController);

export default userRouter;
