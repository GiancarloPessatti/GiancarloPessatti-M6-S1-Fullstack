import {
  createUserService,
  deleteUserService,
  listUserService,
  retriveUserService,
  updateUserService,
} from "../Services/user.services";
import { Request, Response } from "express";

export const createUserController = async (
  request: Request,
  response: Response
) => {
  const newUser = await createUserService(request.body);
  return response.status(201).json(newUser);
};

export const listUserController = async (
  request: Request,
  response: Response
) => {
  const users = await listUserService(request);
  return response.status(200).json(users);
};

export const retriveUserController = async (
  request: Request,
  response: Response
) => {
  const user = await retriveUserService(request);
  return response.status(200).json(user);
};

export const updateUserController = async (
  request: Request,
  response: Response
) => {
  const updatedUser = await updateUserService(request);
  return response.status(200).json(updatedUser);
};

export const deleteUserController = async (
  request: Request,
  response: Response
) => {
  const status = await deleteUserService(request);
  return response.status(Number(status)).send();
};
