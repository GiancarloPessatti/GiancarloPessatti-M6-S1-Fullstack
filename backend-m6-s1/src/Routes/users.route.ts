import { Router } from "express";
import {
  createUserController,
  deleteUserController,
  listUserController,
  retriveUserController,
  updateUserController,
} from "../Controllers/user.controller";
import ensureAuthMiddleware from "../Middlewares/ensureAuth.middleware";
import validateSchemaMiddleware from "../Middlewares/validadeschema.middleware";
import createUserShape from "../Serials/createUser.serial";
import patchUserShape from "../Serials/patchUser.serial";

const userRouter = Router();

userRouter.get(`/api/users`, ensureAuthMiddleware, listUserController);
userRouter.get(`/api/profile`, ensureAuthMiddleware, retriveUserController);
userRouter.post(
  `/api/users`,
  validateSchemaMiddleware(createUserShape),
  createUserController
);
userRouter.patch(
  `/api/users/:id`,
  ensureAuthMiddleware,
  validateSchemaMiddleware(patchUserShape),
  updateUserController
);
userRouter.delete(`/api/users/:id`, ensureAuthMiddleware, deleteUserController);

export default userRouter;
