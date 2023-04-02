import { Request, Response } from "express";
import loginUserService from "../Services/login.services";

export const loginUserController = async (
  request: Request,
  response: Response
) => {
  const logUser = await loginUserService(request.body);
  return response.status(200).json({ token: logUser });
};
