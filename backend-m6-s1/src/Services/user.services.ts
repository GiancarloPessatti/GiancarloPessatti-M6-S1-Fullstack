import AppDataSource from "../data-source";
import { User } from "../Entities/user.entity";
import { AppError } from "../Errors/error";
import { IUserRequest, IUser, IUserResponse } from "../interfaces/users";
import createUserWOShape from "../Serials/userWOpassword.serial";
import { Request } from "express";

export const createUserService = async (
  userData: IUserRequest
): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ email: userData.email });

  if (userExist) {
    throw new AppError("email alredy exist", 409);
  }
  const createdUser = userRepository.create(userData);

  await userRepository.save(createdUser);

  const userWithoutPassord = await createUserWOShape.validate(createdUser, {
    stripUnknown: true,
  });

  return userWithoutPassord;
};

export const updateUserService = async (request: Request): Promise<IUser> => {
  const userRepository = AppDataSource.getRepository(User);

  const findUser = await userRepository.findOneBy({
    id: request.params.id,
  });

  if (!findUser) {
    throw new AppError("User not found", 404);
  }

  if (request.user.type || request.params.id === findUser.id) {
    const updatedUser = userRepository.create({
      ...findUser,
      ...request.body,
    });

    await userRepository.save(updatedUser);

    const updatedUserWithoutPassword = await createUserWOShape.validate(
      updatedUser,
      {
        stripUnknown: true,
      }
    );

    return updatedUserWithoutPassword;
  }

  throw new AppError("Permission denied", 403);
};

export const listUserService = async (request: Request): Promise<IUser[]> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find();

  if (request.user.type) {
    const usersWithoutPassordPromise = users.map(async (user) => {
      const userWoPsswd = await createUserWOShape.validate(user, {
        stripUnknown: true,
      });
      return userWoPsswd;
    });

    const usersWopassword = await Promise.all(usersWithoutPassordPromise);

    return usersWopassword;
  }

  throw new AppError("Permission denied", 403);
};

export const retriveUserService = async (
  request: Request
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  // if (!request.user.type) {
  //   throw new AppError("Permission denied", 403);
  // }

  const userExist = await userRepository.findOne({
    where: { id: request.user.id },
    relations: ["contacts"],
  });

  if (!userExist) {
    throw new AppError("Permission denied", 404);
  }

  return userExist;
};

export const deleteUserService = async (request: Request): Promise<number> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({ id: request.params.id });

  if (!user) {
    throw new AppError("Permission denied", 404);
  }

  if (user.id != request.user.id) {
    throw new AppError("Permission denied", 403);
  }

  await userRepository.remove(user);

  return 204;
};
