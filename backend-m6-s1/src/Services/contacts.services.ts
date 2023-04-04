import AppDataSource from "../data-source";
import { AppError } from "../Errors/error";
import { Request } from "express";
import { IContactRequest } from "../interfaces/contacts";
import { Contact } from "../Entities/contact.entity";
import { User } from "../Entities/user.entity";

export const createContactService = async (
  contactData: Request
): Promise<Contact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: contactData.user.id });

  if (!userExist) {
    throw new AppError("Permission denied", 403);
  }

  const createdContact = contactRepository.create({
    ...contactData.body,
    user: userExist,
  });

  await contactRepository.save(createdContact);

  return createdContact;
};

export const listContactService = async (
  request: Request
): Promise<IContactRequest[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contacts = await contactRepository.find();

  return contacts;
};

export const updateContactService = async (request: Request) => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contact = await contactRepository.findOne({
    where: { id: request.params.id },
    relations: ["user"],
  });
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: request.user.id });

  if (!contact) {
    throw new AppError("Permission denied", 404);
  }

  if (contact.user.id == userExist?.id) {
    const updatedUser = contactRepository.create({
      ...contact,
      ...request.body,
    });
    await contactRepository.save(updatedUser);
    return updatedUser;
  }
};

export const deleteContactService = async (
  request: Request
): Promise<number> => {
  const contactRepository = AppDataSource.getRepository(Contact);

  const contact = await contactRepository.findOne({
    where: { id: request.params.id },
    relations: ["user"],
  });
  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: request.user.id });

  if (!contact) {
    throw new AppError("Permission denied", 404);
  }

  if (contact.user.id != userExist?.id) {
    throw new AppError("Permission denied", 403);
  }

  await contactRepository.remove(contact);

  return 204;
};
