import AppDataSource from "../data-source";
import { AppError } from "../Errors/error";
import { Request } from "express";
import { IContactRequest } from "../interfaces/contacts";
import { Contact } from "../Entities/contact.entity";

export const createContactService = async (
  contactData: Request
): Promise<Contact[]> => {
  const contactRepository = AppDataSource.getRepository(Contact);
  const contactExist = await contactRepository.findOneBy({
    name: contactData.body.name,
  });

  // if (!contactData.user.type) {
  //   throw new AppError("Permission denied", 403);
  // }

  if (contactExist) {
    throw new AppError("contact alredy exist", 409);
  }

  const createdContact = contactRepository.create(contactData.body);

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
