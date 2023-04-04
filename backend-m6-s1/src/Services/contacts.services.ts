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
  const contactExist = await contactRepository.findOneBy({
    email: contactData.body.email,
  });

  const userRepository = AppDataSource.getRepository(User);
  const userExist = await userRepository.findOneBy({ id: contactData.user.id });

  if (!userExist) {
    throw new AppError("Permission denied", 403);
  }

  if (contactExist) {
    throw new AppError("contact alredy exist", 409);
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

  console.log(contact.user);
  console.log(userExist);

  if (contact.user.id != userExist?.id) {
    throw new AppError("Permission denied", 403);
  }

  await contactRepository.remove(contact);

  return 204;
};

// export const listPropertiesOfCategorieService = async (
//   request: Request
// ): Promise<Categorie> => {
//   const categorieRepository = AppDataSource.getRepository(Categorie);

//   const findCategorie = await categorieRepository.findOne({
//     where: { id: request.params.id },
//     relations: { properties: true },
//   });

//   if (!findCategorie) {
//     throw new AppError("categorie not found", 404);
//   }

//   return findCategorie;
// };
