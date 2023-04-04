import { Request, Response } from "express";
import {
  createContactService,
  deleteContactService,
  listContactService,
  updateContactService,
} from "../Services/contacts.services";

export const createContactController = async (
  request: Request,
  response: Response
) => {
  const newContact = await createContactService(request);
  return response.status(201).json(newContact);
};

export const updateContactController = async (
  request: Request,
  response: Response
) => {
  const newContact = await updateContactService(request);
  return response.status(200).json(newContact);
};

export const listContactController = async (
  request: Request,
  response: Response
) => {
  const categories = await listContactService(request);
  return response.status(200).json(categories);
};

export const deleteContactController = async (
  request: Request,
  response: Response
) => {
  const status = await deleteContactService(request);
  return response.status(Number(status)).send();
};

// export const listPropertiesOfCategorieController = async (
//   request: Request,
//   response: Response
// ) => {
//   const categorie = await listPropertiesOfCategorieService(request);
//   return response.status(200).json(categorie);
// };
