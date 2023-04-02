import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import "dotenv/config";
import { AppError } from "../Errors/error";

const ensureAuthMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  let token = req.headers.authorization;

  if (!token) {
    throw new AppError("Token invalid", 401);
  }

  token = token.split(" ")[1];

  jwt.verify(token, String(process.env.SECRET_KEY), (error, decoded: any) => {
    if (error) {
      throw new AppError(error.message, 401);
    }

    req.user = {
      id: decoded.sub as number,
      type: decoded.type,
    };

    return next();
  });
};

export default ensureAuthMiddleware;
