import "dotenv/config";
import AppDataSource from "../data-source";
import { User } from "../Entities/user.entity";
import jwt from "jsonwebtoken";
import { compare } from "bcryptjs";
import { AppError } from "../Errors/error";
import { IUserLogin } from "../interfaces/users";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 400);
  }

  if (user.isActive === false) {
    throw new AppError("User or password invalid", 400);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign({ type: user.isAdm }, String(process.env.SECRET_KEY), {
    subject: String(user.id),
    expiresIn: "24h",
  });

  return token;
};

export default loginUserService;
