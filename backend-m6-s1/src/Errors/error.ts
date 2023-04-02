import { Request, Response, NextFunction } from "express";
export class AppError extends Error {
  statusCode: number;

  constructor(message: string, statusCode: number = 400) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export const errorHandler = async (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).send({ message: err.message });
  }
  console.error(err.message);
  return res.status(500).send({ message: err.message });
};
